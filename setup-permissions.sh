#!/bin/bash

# Create uinput group if it doesn't exist
sudo groupadd -f uinput

# Add current user to necessary groups
sudo usermod -a -G input $USER
sudo usermod -a -G uinput $USER

# Create udev rule for uinput
echo 'KERNEL=="uinput", GROUP="uinput", MODE:="0660"' | sudo tee /etc/udev/rules.d/99-input.rules

# Reload udev rules
sudo udevadm control --reload-rules
sudo udevadm trigger

# Create Xauthority file for Docker
XAUTH=/tmp/.docker.xauth
touch $XAUTH
xauth nlist $DISPLAY | sed -e 's/^..../ffff/' | xauth -f $XAUTH nmerge -

# Set proper permissions
sudo chmod 660 /dev/uinput
sudo chown root:uinput /dev/uinput

echo "Setup complete! Please log out and log back in for group changes to take effect."
