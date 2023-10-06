import subprocess

# Define the variable parts of the command
user_input = "say yes"
system_input = "reply in 1 word"

# Specify the working directory
working_directory = "/Users/scottpedley"

# Construct the command with variables
command = "llm -m l2c 'say yes' --system 'you only respond with 1 word'"

try:
    result = subprocess.run(command, shell=True, capture_output=True, text=True, check=True, cwd=working_directory)

    # Print the standard output
    print("Command output:")
    print(result.stdout)
except subprocess.CalledProcessError as e:
    # Handle any errors (non-zero exit code)
    print(f"Error: {e}")
