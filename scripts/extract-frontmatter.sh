#!/bin/bash

# extract_frontmatter.sh - Reusable bash function to extract values from frontmatter
# Purpose: Extract arbitrary values from YAML frontmatter in markdown files

# Function: extract_frontmatter
# Usage: extract_frontmatter <file_path> <key_name>
# Returns: The value of the specified key, or empty string if not found
# Example: extract_frontmatter "src/content/blog/post.md" "title"
extract_frontmatter() {
    local file_path="$1"
    local key_name="$2"
    
    # Check if file exists
    if [[ ! -f "$file_path" ]]; then
        echo "Error: File '$file_path' not found" >&2
        return 1
    fi
    
    # Check if key name is provided
    if [[ -z "$key_name" ]]; then
        echo "Error: Key name is required" >&2
        return 1
    fi
    
    # Extract the value using grep and sed
    # This handles both quoted and unquoted values
    # Matches patterns like: key: value, key: "value", key: 'value'
    local value=$(grep -m 1 "^${key_name}:" "$file_path" | sed "s/^${key_name}:[[:space:]]*//" | sed 's/^["'\'']//; s/["'\'']$//')
    
    echo "$value"
}

# Function: extract_frontmatter_safe
# Usage: extract_frontmatter_safe <file_path> <key_name> [default_value]
# Returns: The value of the specified key, or default_value if not found
# Example: extract_frontmatter_safe "src/content/blog/post.md" "title" "Untitled"
extract_frontmatter_safe() {
    local file_path="$1"
    local key_name="$2"
    local default_value="${3:-}"
    
    local value=$(extract_frontmatter "$file_path" "$key_name")
    
    if [[ -z "$value" ]]; then
        echo "$default_value"
    else
        echo "$value"
    fi
}

# Function: extract_frontmatter_required
# Usage: extract_frontmatter_required <file_path> <key_name>
# Returns: The value of the specified key, or exits with error if not found
# Example: extract_frontmatter_required "src/content/blog/post.md" "title"
extract_frontmatter_required() {
    local file_path="$1"
    local key_name="$2"
    
    local value=$(extract_frontmatter "$file_path" "$key_name")
    
    if [[ -z "$value" ]]; then
        echo "Error: Required frontmatter key '$key_name' not found in '$file_path'" >&2
        exit 1
    fi
    
    echo "$value"
}

# Function: list_frontmatter_keys
# Usage: list_frontmatter_keys <file_path>
# Returns: List of all frontmatter keys found in the file
# Example: list_frontmatter_keys "src/content/blog/post.md"
list_frontmatter_keys() {
    local file_path="$1"
    
    if [[ ! -f "$file_path" ]]; then
        echo "Error: File '$file_path' not found" >&2
        return 1
    fi
    
    # Extract all lines that look like frontmatter keys (before the first ---)
    awk '/^---$/{exit} /^[a-zA-Z_][a-zA-Z0-9_]*:/{gsub(/:/, ""); print}' "$file_path"
}

# Function: validate_frontmatter
# Usage: validate_frontmatter <file_path> <required_keys...>
# Returns: 0 if all required keys exist, 1 if any are missing
# Example: validate_frontmatter "src/content/blog/post.md" "title" "description" "pubDate"
validate_frontmatter() {
    local file_path="$1"
    shift
    local required_keys=("$@")
    local missing_keys=()
    
    for key in "${required_keys[@]}"; do
        local value=$(extract_frontmatter "$file_path" "$key")
        if [[ -z "$value" ]]; then
            missing_keys+=("$key")
        fi
    done
    
    if [[ ${#missing_keys[@]} -gt 0 ]]; then
        echo "Error: Missing required frontmatter keys in '$file_path': ${missing_keys[*]}" >&2
        return 1
    fi
    
    return 0
}

# Export functions if script is sourced
if [[ "${BASH_SOURCE[0]}" != "${0}" ]]; then
    export -f extract_frontmatter
    export -f extract_frontmatter_safe
    export -f extract_frontmatter_required
    export -f list_frontmatter_keys
    export -f validate_frontmatter
fi

# Example usage and testing
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    # This script can be run directly for testing
    if [[ $# -eq 0 ]]; then
        echo "Usage: $0 <file_path> [key_name]"
        echo ""
        echo "Examples:"
        echo "  $0 src/content/blog/post.md title"
        echo "  $0 src/content/blog/post.md"
        echo ""
        echo "Available functions:"
        echo "  extract_frontmatter <file> <key>"
        echo "  extract_frontmatter_safe <file> <key> [default]"
        echo "  extract_frontmatter_required <file> <key>"
        echo "  list_frontmatter_keys <file>"
        echo "  validate_frontmatter <file> <key1> <key2> ..."
        exit 1
    fi
    
    file_path="$1"
    key_name="$2"
    
    if [[ -n "$key_name" ]]; then
        echo "Extracting '$key_name' from '$file_path':"
        extract_frontmatter "$file_path" "$key_name"
    else
        echo "Listing all frontmatter keys in '$file_path':"
        list_frontmatter_keys "$file_path"
    fi
fi 