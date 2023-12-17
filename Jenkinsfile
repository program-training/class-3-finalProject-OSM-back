pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    sh 'docker-compose down -v --remove-orphans'

                    writeFile file: 'scripts/init.sql', text: '''
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

                    sh 'docker-compose up -d --build'
                    
                    sh 'sleep 30'

                    sh 'docker-compose logs my-postgres'
                    sh 'docker-compose logs oms-class3'
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
