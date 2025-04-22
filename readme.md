chmod +x pg-init/init-db.sh


docker-compose up --build

docker run -d -p 24119:5432 --name pg-container postgres-multi-db
