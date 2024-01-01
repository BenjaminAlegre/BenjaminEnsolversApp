#!/bin/bash

function install_node() {
  node -v
  if [ "$?" -eq 127 ]; then
    echo -e "\n\t[i] Installing Node.js and npm.\n"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    source ~/.bashrc   # o source ~/.zshrc para zsh
    source ~/.nvm/nvm.sh  # Recargar las variables de entorno de NVM
    nvm install 20.10
    nvm use 20.10
  fi

  npm -v
  if [ "$?" -eq 127 ]; then
    echo -e"\n\t[i] Installing npm.\n"
    sudo apt-get update
    sudo apt-get install -y npm
  fi
}

function install_java_and_maven() {
  # Verificar versión de Java
  if [ -x "$(command -v java)" ]; then
      version=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
      if [ "$version" == "17" ]; then
          echo "Java 17 is already installed."
      else
          echo "Installing Java 17..."
          sudo apt-get update
          sudo apt-get install -y openjdk-17-jdk
      fi
  else
      echo "Java is not installed. Installing Java 17..."
      sudo apt-get update
      sudo apt-get install -y openjdk-17-jdk
  fi

  export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

  # Verificar y actualizar Maven
  if [ -x "$(command -v mvn)" ]; then
      version=$(mvn -version | awk -F ' ' '/Maven/ {print $3}')
      if [ "$version" == "3.9.1" ]; then
          echo "Maven 3.9.1 is already installed."
      else
          echo "Updating Maven ..."
          sudo apt-get update
          sudo apt-get install -y maven
      fi
  else
      echo "Maven is not installed. Installing Maven ..."
      sudo apt-get update
      sudo apt-get install -y maven
  fi
}

function back_project() {
  # Configuración e instalación del backend
  install_java_and_maven

  ./db.sh

  # Ejecutar el backend con Spring Boot y Maven
  (cd backend && mvn spring-boot:run)
  echo "Backend process complete."
}

function front_project() {
  # Instalar Node.js y npm
  install_node

  # Esperar a que el backend se inicie antes de continuar con el frontend
  while ! nc -z localhost 8080; do
    sleep 1
  done

  # Configurar y arrancar el frontend (React con Node.js y npm)
  (cd frontend && npm install && npm start)
  echo -e "\n\t[i] Frontend is running.\n"
  
  echo "Frontend process complete. You can access it in http://localhost:3000."
}

# Ejecutar la configuración e instalación del proyecto completo
back_project &
front_project

echo "Proceso completo."

