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
    # Ensure gum is installed
    install_gum

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

    # First, check for existing environment variables
    for provider in "${!PROVIDER_ENV_VARS[@]}"; do
        env_var="${PROVIDER_ENV_VARS[$provider]}"
        
        if [ -n "${!env_var}" ]; then
            echo "Existing $env_var found for $provider:"
            echo "${!env_var}" | cut -c1-10
            USE_EXISTING=$(gum confirm "Use existing $env_var?" && echo "yes" || echo "no")
            if [ "$USE_EXISTING" = "yes" ]; then
                SELECTED_ENV_VARS[$env_var]="${!env_var}"
                echo "Added $provider configuration"
            fi
        fi
    done

    # Keep asking for additional providers until user chooses to complete setup
    while true; do
        echo "Do you want to add any more providers or complete setup?"
        ACTION=$(gum choose "Add provider" "Complete setup")
        
        if [ "$ACTION" = "Complete setup" ]; then
            break
        fi

        # Filter out already selected providers
        AVAILABLE_PROVIDERS=()
        for provider in "${!PROVIDER_ENV_VARS[@]}"; do
            env_var="${PROVIDER_ENV_VARS[$provider]}"
            if [ -z "${SELECTED_ENV_VARS[$env_var]}" ]; then
                AVAILABLE_PROVIDERS+=("$provider")
            fi
        done

        # If no more providers available
        if [ ${#AVAILABLE_PROVIDERS[@]} -eq 0 ]; then
            echo "No more providers available to add."
            break
        fi

        # Select provider to add
        SELECTED_PROVIDER=$(gum choose --height 10 "${AVAILABLE_PROVIDERS[@]}")
        ENV_VAR="${PROVIDER_ENV_VARS[$SELECTED_PROVIDER]}"

        # Get API key
        API_KEY=$(gum input --password --placeholder "Enter your $ENV_VAR")
        SELECTED_ENV_VARS[$ENV_VAR]="$API_KEY"
        echo "Added $SELECTED_PROVIDER configuration"
    done

    # Ask for AUTH_SECRET
    AUTH_SECRET=$(gum input --password --placeholder "What Auth Secret would you like to use? (default p@55wOrd)")
    if [ -z "$AUTH_SECRET" ]; then
        AUTH_SECRET="p@55wOrd"
    fi

    # Save all environment variables to .env file
    : > .env  # Clear the file
    for env_var in "${!SELECTED_ENV_VARS[@]}"; do
        echo "$env_var=${SELECTED_ENV_VARS[$env_var]}" >> .env
    done
    echo "AUTH_SECRET=$AUTH_SECRET" >> .env
    echo "Environment variables saved to .env file."

    # Ask if the user wants to run "AI Server"
    if gum confirm "Do you want to run AI Server?"; then
        echo "Starting AI Server..."
        docker compose up -d

        # Wait for the server to start
        sleep 5

        # Ask about ComfyUI Agent setup only if AI Server was started
        if gum confirm "Do you want to configure a local ComfyUI Agent with your AI Server for testing?"; then
            echo "Setting up ComfyUI Agent..."
            
            # Initialize and update submodules
            git submodule init
            git submodule update
            
            # Check if the agent-comfy directory exists and install script is executable
            if [ -f "./agent-comfy/install.sh" ]; then
                chmod +x "./agent-comfy/install.sh"
                ./agent-comfy/install.sh
            else
                echo "Error: Could not find agent-comfy/install.sh"
                exit 1
            fi
        fi

        # Open browser based on OS
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open "http://localhost:5006"
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open "http://localhost:5006"
        else
            echo "Please open http://localhost:5006 in your browser."
        fi
    else
        echo "AI Server not started. You can run it later with 'docker compose up -d'"
    fi
}

# Run the prerequisites check function
check_prerequisites

# Run the installation function
install_gum

# Run the AI provider setup function
setup_ai_provider