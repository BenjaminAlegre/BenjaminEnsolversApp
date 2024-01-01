#!/bin/bash

# Verificar si MySQL Server está instalado
if [ -x "$(command -v mysql)" ]; then
    echo "MySQL Server ya está instalado."
else
    echo "Instalando MySQL Server..."
    sudo apt-get update
    sudo apt-get install -y mysql-server
fi

# Iniciar el servicio de MySQL
sudo service mysql start

# Verificar si la base de datos notes_db existe
if mysql -u root -e "use notes_db" 2>/dev/null; then
    echo "La base de datos notes_db ya existe."
else
    echo "Creando la base de datos notes_db..."
    mysql -u root -e "CREATE DATABASE notes_db"
fi

# Verificar si el usuario root puede acceder sin contraseña
if mysql -u root -e "SELECT 1" 2>/dev/null; then
    echo "El usuario root puede acceder a MySQL sin contraseña."
else
    echo "Configurando el usuario root para acceder sin contraseña..."
    sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''; FLUSH PRIVILEGES;"
fi

# Cargar datos en la base de datos
if [ -f "BackUp_DB.sql" ]; then
    echo "Cargando datos en MySQL..."
    mysql -u root notes_db < BackUp_DB.sql
else
    echo "El archivo BackUp_DB.sql no existe. Asegúrate de tener el archivo con los datos para cargar."
fi

echo "Proceso completado."

