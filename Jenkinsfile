pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    sh 'docker-compose down -v --remove-orphans'

                    writeFile file: 'scripts/init.sql', text: '''
                        CREATE DATABASE IF NOT EXISTS db;
                        USE db;
                        CREATE TABLE IF NOT EXISTS users (
                            id SERIAL PRIMARY KEY,
                            email VARCHAR(255) NOT NULL,
                            password VARCHAR(255) NOT NULL,
                            isadmin BOOLEAN DEFAULT false,
                            resetcode VARCHAR(255),
                            registration_time TIMESTAMP
                        );
                    '''
                    
                    writeFile file: 'Dockerfile.test', text: '''
                        FROM node:18-alpine AS builder
                        WORKDIR /app
                        COPY package*.json ./
                        RUN npm install
                        RUN npm install -D typescript
                        COPY . .
                        CMD ["npm", "test"]
                    '''
                    sh 'docker network ls | grep -q app-network || docker network create app-network'
                    
                    sh 'docker build -t oms-back-test -f Dockerfile.test .'
                    sh 'docker build -t oms-back .'
                    
                    sh 'docker-compose up -d --build'
                    
                    sh 'sleep 20'

                    sh 'docker-compose logs -f my-postgres'
                    sh 'docker-compose logs -f oms-back'
                    sh 'docker-compose logs -f oms-back-test'
                }
            }
        }
    }
    
    post {
        always {
            script {
                sh 'docker-compose down -v --remove-orphans'
            }
        }
    }
}
