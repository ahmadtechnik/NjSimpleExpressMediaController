#!/bin/bash

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install XQuartz if not already installed
if ! command -v xquartz &> /dev/null; then
    echo "Installing XQuartz..."
    brew install --cask xquartz
fi

# Create necessary directories and set permissions
echo "Setting up X11 environment..."
mkdir -p ~/.config/pulse
touch ~/.config/pulse/cookie

# Set up XQuartz for network connections
defaults write org.xquartz.X11 nolisten_tcp 0

echo "Setup complete! Please:"
echo "1. Log out and log back in"
echo "2. Open XQuartz (Applications > Utilities > XQuartz)"
echo "3. In XQuartz preferences, go to the Security tab and enable 'Allow connections from network clients'"
echo "4. Restart XQuartz"
echo "5. Run: docker compose up -d"
