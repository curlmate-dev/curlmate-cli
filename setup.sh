#!/bin/bash

# Check if the user is using Zsh
if [[ "$SHELL" == *"zsh"* ]]; then
    ZSHRC="$HOME/.zshrc"
    
    # Backup the original .zshrc before modifying
    if [ -f "$ZSHRC" ]; then
        cp "$ZSHRC" "$ZSHRC.bak"
        echo "Backup of .zshrc created at $ZSHRC.bak"
    fi

    # Add the function to beautify JSON to the .zshrc file
    echo "
# curlmate settings for JSON beautification
function curl_with_json_pretty() {
    curl \"\$@\" | jq .
}

# Alias for curl to beautify JSON output
alias curl='curl_with_json_pretty'
" >> "$ZSHRC"
    
    echo "curlmate settings have been added to .zshrc."

    # Prompt the user to source the .zshrc file
    echo "Run 'source ~/.zshrc' to apply the changes."

else
    echo "This setup script is only applicable for Zsh users."
fi
