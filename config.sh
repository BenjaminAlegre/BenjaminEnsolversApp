#!/bin/bash

function config_front(){
	if [ $EUID -eq 0 ]; then
		npm -v &>/dev/null
		if [ "$?" -eq 127 ]; then
			echo -e "\n\t[!] You don't have installed npm or nodejs, this tools are necesary so we'll install it.\n"
			apt-get update

		 	# Install npm from repository
			apt install npm -y

			# Install nodejs from repository
			# Download and import the Nodesource GPG key
			apt-get install -y ca-certificates curl gnupg
			mkdir -p /etc/apt/keyrings
			curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
			# Create deb repository
			NODE_MAJOR=20
			echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
			# Finally, install nodejs
			apt-get install nodejs -y
			config_front
		else
			echo -e "\n\t[+] Installing frontend dependencies...\n"
			cd frontend && npm install
			npm start & disown
			echo -e "\n\t[i] The frontend is running on port 3000.\n"
		fi
	else
		echo -e "\n\n\t[!] This script need be runed like sudo.\n\n"
		exit 1
	fi
}

function config_back(){
	java -version
	if [ "$?" -eq 127 ]; then
		echo -e "\n\t[!] You don't have Java installed, this tool is necessary so we'll install it." 
		apt-get install default-jdk
		config_back
	else
		echo -e "\n\t[i] Maven was installed in /opt.\n"
		export PATH=$PATH:/opt/apache-maven-3.6.3/bin 
		
		mvn -v
		if [ "$?" -eq 127 ]; then
			echo -e "\n\t[!] Maven installation failed.\n"
			exit 1
		fi
		cd backend && mvn install
		cd src/main/java/backend/backend
		mvn spring-boot:run & disown
		echo -e "\n\t[i] The backend is running on port 8080.\n"
	fi
}


function main(){
	echo -e "\n\n\t[i] We will configurate the frontend...\n"
	config_front
	echo -e "\n\n\t[i] Now... we will configurate the backend...\n"
	config_back
}

main
