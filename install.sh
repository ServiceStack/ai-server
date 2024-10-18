#!/bin/bash

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

    # Ask user to select AI provider
    AI_PROVIDER=$(gum choose --height 10 "OpenAI" "OpenRouter" "OpenRouter Free*" "Mistral AI" "Google Cloud" "Groq Cloud")

    # Set the corresponding environment variable name based on the selection
    case "$AI_PROVIDER" in
        "OpenAI")
            ENV_VAR="OPENAI_API_KEY"
            ;;
        "OpenRouter" | "OpenRouter Free*")
            ENV_VAR="OPENROUTER_API_KEY"
            ;;
        "Mistral AI")
            ENV_VAR="MISTRAL_API_KEY"
            ;;
        "Google Cloud")
            ENV_VAR="GOOGLE_API_KEY"
            ;;
        "Groq Cloud")
            ENV_VAR="GROQ_API_KEY"
            ;;
    esac

    # Check if the environment variable is already set
    if [ -n "${!ENV_VAR}" ]; then
        echo "Existing $ENV_VAR found:"
        echo "${!ENV_VAR}" | cut -c1-10
        USE_EXISTING=$(gum confirm "Use existing $ENV_VAR?" && echo "yes" || echo "no")
        if [ "$USE_EXISTING" = "yes" ]; then
            API_KEY="${!ENV_VAR}"
        else
            API_KEY=$(gum input --password --placeholder "Enter your $ENV_VAR")
        fi
    else
        API_KEY=$(gum input --password --placeholder "Enter your $ENV_VAR")
    fi

    # Save the result to .env file
    echo "$ENV_VAR=$API_KEY" > .env
    echo "API key saved to .env file."

    # Ask if the user wants to run "AI Server"
    if gum confirm "Do you want to run AI Server?"; then
        echo "Starting AI Server..."
        docker compose up -d

        # Wait for the server to start (adjust the sleep time if needed)
        sleep 5

        # Open browser (this command varies depending on the OS)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open "https://localhost:5005"
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open "https://localhost:5005"
        else
            echo "Please open http://localhost:5005 in your browser."
        fi
    else
        echo "AI Server not started. You can run it later with 'docker compose up -d'"
    fi
}

# Run the installation function
install_gum

# Run the AI provider setup function
setup_ai_provider
