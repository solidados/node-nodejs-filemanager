# File Manager CLI
> File Manager CLI implemented by using pure Node.js APIs
> Node.js version 22.x.x (used ^22.9.0)

## Contents
+ [application start](#application-start)
+ [documentation](#documentation)
+ [navigation commands & syntax](#navigation-commands-and-syntax)
  + [up](#level-up)
  + [cd](#change-directory)
  + [ls](#list)
+ [basic file operations](#basic-file-operations)
  + [view](#view)
  + [touch (add file)](#touch)
  + [rename](#rename)
  + [copy](#copy)
  + [move](#move)
  + [remove (delete)](#remove)
+ [basic os operations](#basic-os-operation)
  + [EOL](#end-of-line)
  + [cpu](#cpu-info)
  + [architecture](#architecture)
  + [homedir](#homedir)
  + [username](#username)
+ [hash calculation](#hash-calculation)
+ [compress and decompress operations](#compress-and-decompress-operations)
  + [compress](#compress)
  + [decompress](#decompress)

---
### Application Start
This application is started using npm-script:
```shell
npm run start -- --username=your_username
```

---
### Documentation
- Application starts with a greeting:  
`Welcome to the File Manager, <Username>!`  

- To terminate application' work use:
  - press `Ctrl+C`, or
  - send command `.exit`  
The window will display the following message:  
`Thank you for using File Manager, <Username>, goodbye!`  

- After the greeting message as well as after each command line for input, a current working directory should be displayed in  following 
  way:  
`You are currently in <path_to_working_directory>`  

- The starting working directory is the _current user's home directory_ (e.g., Windows, it is typically `system_drive/Users/Username`, 
  MacOS `/Users/Username` ). 
  By default, the program prompts the user in the console to enter commands and waits for results.

- If an unknown command or invalid input occurs (such as missing mandatory arguments or incorrect data), a message will 
be displayed `Invalid input`, allowing the user to enter another command.

- In the event of an execution error (e.g., attempting an operation on a non-existent file or path), an `Operation failed` message will 
  appear, and the user can enter another command.

- User cannot navigate upper the _root directory_ (e.g., on Windows, the root of the 
  current local drive). If the user attempts this, the current working directory remains unchanged.

---
### Navigation Commands and Syntax
#### level up
- `up` or `..`  
Go up the current directory (when you are in the root folder this operation should not change working directory)

#### change directory
- `cd <path_to_directory>`  
Changes location from current directory to dedicated folder (`path_to_directory` can be _relative_ or _absolute_)

#### list
- `ls`  
Prints to console list of all files and folders in current directory.  

List must contain:
- files and folders names (incl. each file extension)
- files and folders must be sorted in ascending alphabetical order, but folders list comes first followed by files list
- type of `directory` content should be marked explicitly (e.g. as a corresponding column value)
![list_example.png](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/ls-example.JPG?raw=true)

---
### Basic file operations
#### view
- `cat <path_to_file>`  
Reads the specified file and prints its content to console (should be implemented by _Readable stream_)
#### touch
- `add <file_name>`  
Creates a new file in current working directory
#### rename
- `rn <path_to_file> <new_file_name>`  
Renames the file (content remains unchanged)
#### copy
- `cp <path_to_file> <path_to_directory>`  
Copies the file (should be implemented by _Readable_ and _Writable_ streams)
#### move
- `mv <path_to_file> <path_to_folder>`  
Moves file (same as `copy` but initial file is deleted, copying part should be implemented by _Readable_ and _Writable_ streams)
#### remove
- `rm <path_to_file>`  
Deletes specified file

---
### Basic OS operation
#### end-of-line
- `os --EOL`  
Gets EOL (default system End-Of-Line) and prints it to console
#### cpu info
- `os --cpus`  
Gets host machine CPUs information (overall amount of CPUS, model and clock rate (in GHz) for each one) and prints it to console
#### architecture
- `os --architecture`  
Gets CPU architecture for which Node.js binary has compiled and prints it to console
#### homedir
- `os --homedir`  
Gets home directory and prints it to console
#### username
- `os --username`  
Gets system user's name and prints it to console

---
### Hash calculation
- `hash <path_to_file>`  
Calculate hash for file and print it into console

---
### Compress and decompress operations
#### compress
- `compress <path_to_file> <path_to_destination>`  
Compresses the specified file (using _Brotli_ algorithm, should be implemented by using _Streams API_)
#### decompress
- `decompress <path_to_file> <path_to_destination>`  
Decompresses the specified file (using _Brotli_ algorithm, should be implemented by using _Streams API_)
> After decompressing previously compressed file, the result should not differ from originally compressed file
