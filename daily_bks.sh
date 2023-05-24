#!/bin/sh
user="root"
password="I+rAQza6R&M6ZnX2"
host="localhost"
db_name="ivana_centro"

# Other options
backup_path="/root/ivana/inmobilaria-ivana-sarmiento/backups"
date=$(date +"%d-%b-%Y")

# Set default file permissions
umask 177

# Dump database into SQL file
mysqldump --user=$user --password=$password --host=$host $db_name > $backup_path/$db_name-$date.sql

# Delete files older than 30 days
find $backup_path/* -mtime +30 -exec rm {} \;

# Me muevo a la carpeta y subo el backup de todo
cd /root/ivana/inmobilaria-ivana-sarmiento/backups

git pull
git add .
git commit -m "backup - $date"
git push