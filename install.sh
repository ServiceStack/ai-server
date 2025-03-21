#!/bin/bash

# Initialize verbose flag
VERBOSE=false

# Process command line arguments
while getopts "v" opt; do
    case $opt in
        v) VERBOSE=true ;;
        *) echo "Usage: $0 [-v]" >&2
           exit 1 ;;
    esac
done

# Helper function for verbose logging
log() {
    if [ "$VERBOSE" = true ]; then
        echo "$1"
    fi
}

check_prerequisites() {
    log "Checking prerequisites..."

    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        echo "Docker is not installed. Please install Docker before running this script."
        echo "Visit https://docs.docker.com/get-docker/ for installation instructions."
        exit 1
    fi

    # Check if Docker Compose is installed
    if ! command -v docker compose &> /dev/null; then
        echo "Docker Compose is not installed or not in PATH."
        echo "Recent Docker Desktop versions include Compose. If you're using Docker Desktop, please make sure it's up to date."
        echo "Otherwise, visit https://docs.docker.com/compose/install/ for installation instructions."
        exit 1
    fi

    log "Prerequisites check passed. Docker and Docker Compose are installed."
}

install_gum() {
    log "Installing gum..."
    
    # Check if gum is already installed
    if command -v gum &> /dev/null; then
        log "gum is already installed."
        return
    fi

    # Detect the operating system
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install gum
        else
            echo "Homebrew is not installed. Please install Homebrew first: https://brew.sh/"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v apt-get &> /dev/null; then
            # Debian/Ubuntu
            sudo mkdir -p /etc/apt/keyrings
            curl -fsSL https://repo.charm.sh/apt/gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/charm.gpg
            echo "deb [signed-by=/etc/apt/keyrings/charm.gpg] https://repo.charm.sh/apt/ * *" | sudo tee /etc/apt/sources.list.d/charm.list
            sudo apt update && sudo apt install -y gum
        elif command -v yum &> /dev/null; then
            # Fedora/RHEL
            echo '[charm]
name=Charm
baseurl=https://repo.charm.sh/yum/
enabled=1
gpgcheck=1
gpgkey=https://repo.charm.sh/yum/gpg.key' | sudo tee /etc/yum.repos.d/charm.repo
            sudo rpm --import https://repo.charm.sh/yum/gpg.key
            sudo yum install -y gum
        elif command -v zypper &> /dev/null; then
            # OpenSUSE
            echo '[charm]
name=Charm
baseurl=https://repo.charm.sh/yum/
enabled=1
gpgcheck=1
gpgkey=https://repo.charm.sh/yum/gpg.key' | sudo tee /etc/zypp/repos.d/charm.repo
            sudo rpm --import https://repo.charm.sh/yum/gpg.key
            sudo zypper refresh
            sudo zypper install -y gum
        elif command -v pacman &> /dev/null; then
            # Arch Linux
            sudo pacman -S gum
        else
            log "Unsupported Linux distribution. Attempting to install using Go..."
            install_using_go
        fi
    else
        log "Unsupported operating system. Attempting to install using Go..."
        install_using_go
    fi

    # Verify installation
    if command -v gum &> /dev/null; then
        log "gum has been successfully installed."
    else
        echo "Failed to install gum. Please try manual installation."
        exit 1
    fi
}

install_using_go() {
    if command -v go &> /dev/null; then
        go install github.com/charmbracelet/gum@latest
        # Add $HOME/go/bin to PATH if it's not already there
        if [[ ":$PATH:" != *":$HOME/go/bin:"* ]]; then
            echo 'export PATH="$HOME/go/bin:$PATH"' >> ~/.bashrc
            source ~/.bashrc
        fi
    else
        echo "Go is not installed. Please install Go first: https://golang.org/doc/install"
        exit 1
    fi
}

# Define supported providers and their environment variables
PROVIDERS=(
    "OpenRouter"
    "OpenAI"
    "Mistral AI"
    "Google Cloud"
    "Anthropic Claude"
    "Groq Cloud"
    "Replicate"
)

PROVIDER_ENV_VARS=(
    "OPENROUTER_API_KEY"
    "OPENAI_API_KEY"
    "MISTRAL_API_KEY"
    "GOOGLE_API_KEY"
    "ANTHROPIC_API_KEY"
    "GROQ_API_KEY"
    "REPLICATE_API_KEY"
)

# Helper function to get environment variable name for a provider
get_env_var_name() {
    local provider="$1"
    local i
    for i in "${!PROVIDERS[@]}"; do
        if [ "${PROVIDERS[$i]}" = "$provider" ]; then
            echo "${PROVIDER_ENV_VARS[$i]}"
            return
        fi
    done
}

# Helper function to check if provider is in array
is_provider_available() {
    local provider="$1"
    local selected_vars="$2"
    local env_var
    
    env_var=$(get_env_var_name "$provider")
    if [[ -z "$env_var" ]]; then
        return 1
    fi
    
    # Check if the env var is already selected
    if [[ "$selected_vars" == *"$env_var"* ]]; then
        return 1
    fi
    
    return 0
}

setup_ai_provider() {
    # Initialize/reset .env file
    : > .env

    # Reusable style function for headers
    style_header() {
        gum style \
            --foreground="#00FFFF" \
            --border-foreground="#00FFFF" \
            --border double \
            --align center \
            --width 50 \
            "$1"
    }

    # Reusable input prompt function
    get_input() {
        local prompt="$1"
        local default="$2"
        local is_password="$3"
        local placeholder="$4"
    
        # Print prompts to stderr so they don't get captured in variable assignment
        echo >&2
        gum style --foreground="#CCCCCC" "$prompt" >&2
        [ -n "$default" ] && gum style --foreground="#888888" "Default: $default" >&2
    
        local input_args=(
            --value "${default:-}"
            --placeholder "$placeholder"
            --prompt "> "
            --prompt.foreground="#00FFFF"
        )
        [ "$is_password" = "true" ] && input_args+=(--password)
    
        gum input "${input_args[@]}"
    }

    # Reusable function to write to .env
    write_env() {
        echo "$1=$2" >> .env
    }

    # Provider setup
    style_header "AI Provider Configuration"

    # Initialize string to store selected environment variables
    SELECTED_ENV_VARS=""

    # Check existing environment variables
    for i in "${!PROVIDERS[@]}"; do
        provider="${PROVIDERS[$i]}"
        env_var="${PROVIDER_ENV_VARS[$i]}"
        
        if [ -n "${!env_var}" ]; then
            gum style --foreground="#CCCCCC" "Found existing $provider API key:"
            gum style --foreground="#888888" "$(echo "${!env_var}" | cut -c1-10)..."
            
            if gum confirm "Use existing $provider API key?"; then
                SELECTED_ENV_VARS="$SELECTED_ENV_VARS $env_var=${!env_var}"
                gum style --foreground="#00FF00" "✓ Using existing $provider configuration"
            elif test $? -eq 130; then
                exit 0
            fi
        fi
    done


    # Provider selection loop
    while true; do
        style_header "Provider Selection"
        ACTION=$(gum choose "Add provider" "Complete setup")
        
        [ "$ACTION" = "" ] && exit 0
        
        echo "$ACTION"
        
        [ "$ACTION" = "Complete setup" ] && break

        # Filter available providers
        AVAILABLE_PROVIDERS=()
        for provider in "${PROVIDERS[@]}"; do
            if is_provider_available "$provider" "$SELECTED_ENV_VARS"; then
                AVAILABLE_PROVIDERS+=("$provider")
            fi
        done

        # Check if providers are available
        [ ${#AVAILABLE_PROVIDERS[@]} -eq 0 ] && {
            gum style --foreground="#FFFF00" "No more providers available to add."
            break
        }

        # Get provider selection and API key
        SELECTED_PROVIDER=$(gum choose --height 10 "${AVAILABLE_PROVIDERS[@]}")
        # Handle cancel/ctl-c
        [ "$SELECTED_PROVIDER" = "" ] && exit 0
        ENV_VAR=$(get_env_var_name "$SELECTED_PROVIDER")
        API_KEY=$(get_input "Enter your $SELECTED_PROVIDER API key" "" "true" "Enter API key")
        
        # Handle empty API key by asking if they want to exit
        if [ -z "$API_KEY" ]; then
            if gum confirm "API key is empty. Do you want to exit?"; then
                exit 0
            elif test $? -eq 130; then
                exit 0
            else
                continue
            fi
        fi
        
        SELECTED_ENV_VARS="$SELECTED_ENV_VARS $ENV_VAR=$API_KEY"
        gum style --foreground="#00FF00" "✓ Added $SELECTED_PROVIDER configuration"
    done

    style_header "AI Server Auth Secret"

    echo "The Auth Secret is used to secure the AI Server API. It should be a strong password if used in production."
    echo "You can use the default value or set a custom value. Press Enter to use the default value of 'p@55wOrd'."
    # Get Auth Secret
    AUTH_SECRET=$(get_input "Set your Auth Secret" "p@55wOrd" "true" "Enter Auth Secret")
    
    # Handle empty Auth Secret by asking if they want to exit
    if [ -z "$AUTH_SECRET" ]; then
        if gum confirm "Auth Secret is empty. Do you want to exit?"; then
            exit 0
        elif test $? -eq 130; then
            exit 0
        else
            AUTH_SECRET="p@55wOrd"
        fi
    fi

    # Save configuration
    echo "$SELECTED_ENV_VARS" | tr ' ' '\n' | while read -r env_setting; do
        if [ -n "$env_setting" ]; then
            write_env "${env_setting%%=*}" "${env_setting#*=}"
        fi
    done
    
    write_env "AUTH_SECRET" "$AUTH_SECRET"
    
    style_header "AI Server URL"
    echo "The AI Server URL is used with the ComfyUI Agent to connect to the AI Server, and assets are served from this URL."
    echo "You can use the default value or set a custom value. Press Enter to use the default value of 'http://localhost:5006'."
    # Get AI Server URL
    AI_SERVER_URL=$(get_input "Set your AI Server URL" "http://localhost:5006" "false" "Enter AI Server URL")
    
    # Save AI Server URL
    write_env "ASSETS_BASE_URL" "$AI_SERVER_URL"
    
    gum style --foreground="#00FF00" "✓ Environment variables saved to .env file"

    # Server setup
    style_header "AI Server Setup"
    if gum confirm "Do you want to run AI Server?"; then
        gum style --foreground="#CCCCCC" "Starting AI Server..."
        # Create Docker network if it doesn't exist, used for local ComfyUI Agent
        docker network create ai-services 2>/dev/null
        docker compose pull
        docker compose up -d
        docker compose run app-fix-permissions
        sleep 3

        if gum confirm "Do you want to configure a local ComfyUI Agent?"; then
            gum style --foreground="#CCCCCC" "Setting up ComfyUI Agent..."
            
            git submodule init
            git submodule update
            
            if [ -f "./agent-comfy/install.sh" ]; then
                export AI_SERVER_AUTH_SECRET="$AUTH_SECRET"
                export AI_SERVER_URL="$AI_SERVER_URL"
                export AGENT_URL="http://agent-comfy:7860"
                
                chmod +x "./agent-comfy/install.sh"
                cd agent-comfy
                ./install.sh
                cd ..
                
                unset AI_SERVER_AUTH_SECRET
                unset AI_SERVER_URL
                unset AGENT_URL
            else
                gum style --foreground="#FF0000" "Error: Could not find agent-comfy/install.sh"
                exit 1
            fi
        elif test $? -eq 130; then
            exit 0
        fi

        # Open browser based on OS
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open "http://localhost:5006"
        elif command -v wslview &> /dev/null; then
            wslview "http://localhost:5006"
        elif command -v explorer.exe &> /dev/null; then
            explorer.exe "http://localhost:5006"
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open "http://localhost:5006"
        else
            gum style --foreground="#CCCCCC" "Please open http://localhost:5006 in your browser"
        fi
    elif test $? -eq 130; then
        exit 0
    else
        gum style --foreground="#CCCCCC" "AI Server not started. Run later with 'docker compose up -d'"
    fi
}

# Run the prerequisites check function
check_prerequisites

# Run the installation function
install_gum

# Run the AI provider setup function
setup_ai_provider