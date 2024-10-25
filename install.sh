#!/bin/bash

check_prerequisites() {
    echo "Checking prerequisites..."

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

    echo "Prerequisites check passed. Docker and Docker Compose are installed."
}

install_gum() {
    echo "Installing gum..."
    
    # Check if gum is already installed
    if command -v gum &> /dev/null; then
        echo "gum is already installed."
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
            echo "Unsupported Linux distribution. Attempting to install using Go..."
            install_using_go
        fi
    else
        echo "Unsupported operating system. Attempting to install using Go..."
        install_using_go
    fi

    # Verify installation
    if command -v gum &> /dev/null; then
        echo "gum has been successfully installed."
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

        echo
        gum style --foreground="#CCCCCC" "$prompt"
        [ -n "$default" ] && gum style --foreground="#888888" "Default: $default"
        
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

    # Define supported providers and their environment variables
    declare -A PROVIDER_ENV_VARS=(
        ["OpenRouter"]="OPENROUTER_API_KEY"
        ["OpenAI"]="OPENAI_API_KEY"
        ["Mistral AI"]="MISTRAL_API_KEY"
        ["Google Cloud"]="GOOGLE_API_KEY"
        ["Anthropic Claude"]="ANTHROPIC_API_KEY"
        ["Groq Cloud"]="GROQ_API_KEY"
    )

    # Initialize array to store selected environment variables
    declare -A SELECTED_ENV_VARS

    # Check existing environment variables
    for provider in "${!PROVIDER_ENV_VARS[@]}"; do
        env_var="${PROVIDER_ENV_VARS[$provider]}"
        
        if [ -n "${!env_var}" ]; then
            gum style --foreground="#CCCCCC" "Found existing $provider API key:"
            gum style --foreground="#888888" "$(echo "${!env_var}" | cut -c1-10)..."
            
            if gum confirm "Use existing $provider API key?"; then
                SELECTED_ENV_VARS[$env_var]="${!env_var}"
                gum style --foreground="#00FF00" "✓ Using existing $provider configuration"
            fi
        fi
    done

    # Provider selection loop
    while true; do
        style_header "Provider Selection"
        ACTION=$(gum choose "Add provider" "Complete setup")
        
        [ "$ACTION" = "Complete setup" ] && break

        # Filter available providers
        AVAILABLE_PROVIDERS=()
        for provider in "${!PROVIDER_ENV_VARS[@]}"; do
            env_var="${PROVIDER_ENV_VARS[$provider]}"
            [ -z "${SELECTED_ENV_VARS[$env_var]}" ] && AVAILABLE_PROVIDERS+=("$provider")
        done

        # Check if providers are available
        [ ${#AVAILABLE_PROVIDERS[@]} -eq 0 ] && {
            gum style --foreground="#FFFF00" "No more providers available to add."
            break
        }

        # Get provider selection and API key
        SELECTED_PROVIDER=$(gum choose --height 10 "${AVAILABLE_PROVIDERS[@]}")
        ENV_VAR="${PROVIDER_ENV_VARS[$SELECTED_PROVIDER]}"
        API_KEY=$(get_input "Enter your $SELECTED_PROVIDER API key" "" "true" "Enter API key")
        
        SELECTED_ENV_VARS[$ENV_VAR]="$API_KEY"
        gum style --foreground="#00FF00" "✓ Added $SELECTED_PROVIDER configuration"
    done

    style_header "AI Server Auth Secret"

    echo "The Auth Secret is used to secure the AI Server API. It should be a strong password if used in production."
    echo "You can use the default value or set a custom value. Press Enter to use the default value of 'p@55wOrd'."
    # Get Auth Secret
    AUTH_SECRET=$(get_input "Set your Auth Secret" "p@55wOrd" "true" "Enter Auth Secret")

    
    # Save configuration
    for env_var in "${!SELECTED_ENV_VARS[@]}"; do
        write_env "$env_var" "${SELECTED_ENV_VARS[$env_var]}"
    done
    write_env "AUTH_SECRET" "$AUTH_SECRET"
    
    gum style --foreground="#00FF00" "✓ Environment variables saved to .env file"

    # Server setup
    style_header "AI Server Setup"
    if gum confirm "Do you want to run AI Server?"; then
        gum style --foreground="#CCCCCC" "Starting AI Server..."
        docker compose up -d
        sleep 5

        if gum confirm "Do you want to configure a local ComfyUI Agent?"; then
            gum style --foreground="#CCCCCC" "Setting up ComfyUI Agent..."
            
            git submodule init
            git submodule update
            
            if [ -f "./agent-comfy/install.sh" ]; then
                export AI_SERVER_AUTH_SECRET="$AUTH_SECRET"
                export AI_SERVER_URL="http://localhost:5006"
                
                chmod +x "./agent-comfy/install.sh"
                ./agent-comfy/install.sh
                
                unset AI_SERVER_AUTH_SECRET
                unset AI_SERVER_URL
            else
                gum style --foreground="#FF0000" "Error: Could not find agent-comfy/install.sh"
                exit 1
            fi
        fi

        # Open browser based on OS
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open "http://localhost:5006"
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open "http://localhost:5006"
        else
            gum style --foreground="#CCCCCC" "Please open http://localhost:5006 in your browser"
        fi
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