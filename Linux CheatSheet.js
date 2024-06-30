let submenu = require("submenu");
let textbox = require("textbox");

function showCommands(category) {
    let commands = {
        "File Operations": [
            "ls - List directory contents",
            "cd - Change directory",
            "pwd - Print working directory",
            "cp - Copy files/directories",
            "mv - Move/rename files/directories",
            "rm - Remove files/directories",
            "mkdir - Make directory",
            "rmdir - Remove directory",
            "touch - Create empty file/update timestamp",
            "find - Search for files",
            "tree - Display directory structure",
            "ln - Create links between files",
            "chmod - Change file permissions",
            "chown - Change file owner and group",
            "du - Estimate file space usage",
            "file - Determine file type",
            "dd - Convert and copy a file",
            "rsync - Fast, versatile file copying tool"
        ],
        "Text Processing": [
            "cat - Concatenate and display file content",
            "grep - Search text using patterns",
            "sed - Stream editor for filtering/transforming text",
            "awk - Pattern scanning and text processing",
            "cut - Remove sections from lines of files",
            "paste - Merge lines of files",
            "sort - Sort lines of text",
            "uniq - Report or omit repeated lines",
            "wc - Print newline, word, and byte counts",
            "tr - Translate or delete characters",
            "diff - Compare files line by line",
            "patch - Apply a diff file to an original",
            "head - Output the first part of files",
            "tail - Output the last part of files",
            "less - View file content interactively",
            "nano - Text editor",
            "vim - Vi IMproved, a programmer's text editor",
            "fold - Wrap each input line to fit in specified width"
        ],
        "System Information": [
            "uname - Print system information",
            "top - Display system processes",
            "htop - Interactive process viewer",
            "ps - Report process status",
            "pgrep - Look up processes based on name and other attributes",
            "pkill - Signal processes based on name and other attributes",
            "df - Report file system disk space usage",
            "free - Display amount of free and used memory",
            "whoami - Print effective user ID",
            "id - Print real and effective user and group IDs",
            "uptime - Show how long system has been running",
            "lsblk - List block devices",
            "lscpu - Display information about the CPU architecture",
            "lsusb - List USB devices",
            "lspci - List all PCI devices",
            "dmesg - Print or control the kernel ring buffer",
            "journalctl - Query the systemd journal",
            "systemctl - Control the systemd system and service manager"
        ],
        "Package Management": [
            "apt-get - Package handling utility (Debian/Ubuntu)",
            "apt - Package handling utility (Debian/Ubuntu)",
            "dpkg - Package manager for Debian",
            "yum - Package manager for RHEL/CentOS",
            "dnf - Package manager for Fedora",
            "rpm - RPM Package Manager",
            "pacman - Package manager for Arch Linux",
            "zypper - Package manager for openSUSE",
            "snap - Universal Linux package manager",
            "flatpak - Universal application distribution framework",
            "pip - Package installer for Python",
            "gem - Front-end to RubyGems, the Ruby package manager",
            "npm - Package manager for JavaScript",
            "cargo - Package manager for Rust",
            "brew - Package manager for macOS (and Linux)"
        ],
        "Network Operations": [
            "ping - Send ICMP ECHO_REQUEST to network hosts",
            "traceroute - Print the route packets trace to network host",
            "netstat - Network statistics",
            "ss - Another utility to investigate sockets",
            "nmap - Network exploration tool and security scanner",
            "curl - Transfer data from or to a server",
            "wget - Non-interactive network downloader",
            "ssh - OpenSSH SSH client (remote login program)",
            "scp - Secure copy (remote file copy program)",
            "rsync - A fast, versatile, remote (and local) file-copying tool",
            "iptables - Administration tool for IPv4 packet filtering and NAT",
            "ufw - Uncomplicated Firewall",
            "dig - DNS lookup utility",
            "host - DNS lookup utility",
            "whois - Client for the whois directory service",
            "ifconfig - Configure network interface",
            "ip - Show / manipulate routing, network devices, interfaces and tunnels",
            "nmcli - Command-line tool for controlling NetworkManager"
        ],
        "Process Management": [
            "ps - Report a snapshot of the current processes",
            "top - Display Linux processes",
            "htop - Interactive process viewer",
            "kill - Send a signal to a process",
            "killall - Kill processes by name",
            "nice - Run a program with modified scheduling priority",
            "renice - Alter priority of running processes",
            "nohup - Run a command immune to hangups",
            "screen - Screen manager with VT100/ANSI terminal emulation",
            "tmux - Terminal multiplexer",
            "bg - Send jobs to background",
            "fg - Bring jobs to foreground",
            "jobs - List active jobs",
            "cron - Daemon to execute scheduled commands",
            "at - Execute commands at a later time"
        ],
        "User Management": [
            "useradd - Create a new user or update default new user information",
            "userdel - Delete a user account and related files",
            "usermod - Modify a user account",
            "groupadd - Create a new group",
            "groupdel - Delete a group",
            "groupmod - Modify a group definition",
            "passwd - Change user password",
            "chage - Change user password expiry information",
            "su - Switch user",
            "sudo - Execute a command as another user",
            "w - Show who is logged on and what they are doing",
            "last - Show listing of last logged in users",
            "who - Show who is logged on",
            "id - Print real and effective user and group IDs",
            "groups - Print the groups a user is in"
        ]
    };

    submenu.setHeader(category + " Commands:");
    for (let i = 0; i < commands[category].length; i++) {
        submenu.addItem(commands[category][i], i);
    }
    let commandResult = submenu.show();
    
    if (commandResult !== undefined) {
        textbox.setConfig("end", "text");
        textbox.clearText();
        textbox.addText("Command Details:\n\n" + commands[category][commandResult] + "\n\nPress Back to return.");
        textbox.show();
        while (textbox.isOpen()) {
            delay(100);
        }
        showCommands(category); // Return to command list after viewing details
    }
}

function showCategories() {
    submenu.addItem("File Operations", 0);
    submenu.addItem("Text Processing", 1);
    submenu.addItem("System Information", 2);
    submenu.addItem("Package Management", 3);
    submenu.addItem("Network Operations", 4);
    submenu.addItem("Process Management", 5);
    submenu.addItem("User Management", 6);
    submenu.setHeader("Select a command category:");
    let categoryResult = submenu.show();

    if (categoryResult !== undefined) {
        let categories = ["File Operations", "Text Processing", "System Information", "Package Management", "Network Operations", "Process Management", "User Management"];
        showCommands(categories[categoryResult]);
        showCategories(); // Return to category selection after viewing commands
    }
}

function startCheatSheet() {
    submenu.addItem("Ubuntu", 0);
    submenu.addItem("Fedora", 1);
    submenu.addItem("Arch Linux", 2);
    submenu.setHeader("Select your Linux distribution:");
    let distroResult = submenu.show();

    if (distroResult !== undefined) {
        showCategories();
    }
}

startCheatSheet();