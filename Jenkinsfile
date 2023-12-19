pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        stage('Build and Test') {
            steps {
                script {
                    // echo '''"CREATE DATABASE db;
                    // CREATE TABLE IF NOT EXISTS users (
                    //     id SERIAL PRIMARY KEY,
                    //     email VARCHAR(255) NOT NULL,
                    //     password VARCHAR(255) NOT NULL,
                    //     isadmin BOOLEAN DEFAULT false,
                    //     resetcode VARCHAR(255),
                    //     registration_time TIMESTAMP
                    // );" > scripts/init.sql'''        
                    // sh 'chmod +x scripts/init.sql'
                    // sh 'ls -alF'
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
                    sh 'docker build -t oms-back-test -f Dockerfile.test .'
                    sh 'docker build -t oms-back .'
                    sh 'docker-compose -f ./docker-compose.yaml config'
                    sh 'docker-compose up -d'
                    sh 'sleep 120'
                }
            }
        }
         stage('logs') {
            steps {
                script {
                    sh 'docker logs -f my-postgres'                    
                    sh 'docker logs -f oms-back'  
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
