pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    // Ensure Docker containers are stopped and removed if they exist
                    sh 'docker-compose down -v --remove-orphans'

                    // Create necessary files for database initialization
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

                    // Build and start required containers
                    sh 'docker-compose up -d --build'
                    
                    // Wait for containers to initialize (adjust the sleep time as needed)
                    sh 'sleep 30'

                    // Show logs for debugging
                    sh 'docker-compose logs my-postgres'
                    sh 'docker-compose logs oms-class3'
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Stop and remove Docker containers after the pipeline execution
                sh 'docker-compose down -v --remove-orphans'
            }
        }
    }
}
