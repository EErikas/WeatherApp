# Ansible Configuration
This is a simple ansible configuration for setting up machines by installing Dokcer, Docker Compose and cloning the repository.

These playbooks are applicable to Ubuntu based Linux machines

## Setting Up Hosts
Hosts can be set in the `hosts` file. Example file could look like this:
```
[dev-machines]
dev-machine-1 ansible_host=192.168.1.97 ansible_user=admin ansible_connection=ssh
dev-machine-2 ansible_host=192.168.1.98 ansible_user=admin ansible_connection=ssh
```
## Setting Up Passwordless Sudo Access
It is a good idea to setup passwordless sudo for ease of access to the machines, this can be done by the following steps:
1. On your host machine, generate a SSH key pair with the following command:
    ```bash
    ssh-keygen -o -a 100 -t ed25519 -f /path/to/key-name
    ```
2. Copy the SSH key to the machine(s) you want to perform Ansible actions:
    ```bash
    ssh-copy-id -i /path/to/key-name <user-name>@<address>
    ```
3. Run the following command from this directory (You will be prompted for the root password):
    ```bash
    ansible-playbook setup_passwordless_sudo.yml -K
    ```
4. Update `ansible.cfg` to look like this:
    ```
    [defaults]
    INVENTORY = hosts
    private_key_file = /path/to/key-name

    [ssh_connections]
    pipelining = true
    ```
From now on, your hosts won't ask for root password.

## Installing Environment on the Host Machines 
Navigate to this folder and enter the following command:
```bash
ansible-playbook setup_environment.yml
```