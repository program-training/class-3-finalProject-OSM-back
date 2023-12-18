pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        stage('Build and Test') {
            steps {
                script {
                    def initSqlContent = '''CREATE DATABASE db;            
                            CREATE TABLE IF NOT EXISTS users (
                            id SERIAL PRIMARY KEY,
                            email VARCHAR(255) NOT NULL,
                            password VARCHAR(255) NOT NULL,
                            isadmin BOOLEAN DEFAULT false,
                            resetcode VARCHAR(255),
                            registration_time TIMESTAMP
                        );'''
                    writeFile file: 'scripts/init.sql', text: initSqlContent
                   
                    sh 'ls -alF'
                    def dockerfileContent = '''
                        FROM node:18-alpine AS builder
                        WORKDIR /app
                        COPY package*.json ./
                        RUN npm install
                        RUN npm install -D typescript
                        COPY . .
                        CMD ["npm", "test"]
                    '''
                    writeFile file: 'Dockerfile.test', text: dockerfileContent
                    sh 'docker network ls | grep -q app-network || docker network create app-network'
                    sh 'docker build -t oms-end-test3 -f Dockerfile.test .'
                    sh 'docker build -t oms-end3 .'
                    // Start MongoDB container
                    // sh 'docker run -d --network app-network --name mongo-db mongo'
                    // sh 'docker run -d --network app-network --name my-postgres -e POSTGRES_PASSWORD=mypassword -v ./init.sql:/docker-entrypoint-initdb.d/init.sql postgres'
                    // sh 'sleep 15'
                    // Build and run the Express.js server container
                    // sh "docker run -d --rm --name oms-class3 --network app-network -e MONGO_CONNECTION_URI=mongodb://mongo-db:27017/test -e DATABASE_USERNAME=postgresql://postgres:mypassword@my-postgres:5432/postgres -e SECRET_TOKEN_KEY=secretKey -e PORT=8081 oms-end3"
                    // sh "docker run -d --rm --name oms--test-class3 --network app-network oms-end-test3"
                    sh 'docker-compose up -d'
                    sh 'docker logs my-postgres'
                    sh 'docker logs -f oms-class3'                    
                }
            }
        }
    }
    post {
        always {
            script {
                sh 'docker-compose down -v'
            }
        }
    }
}
