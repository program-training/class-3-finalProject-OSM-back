pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        stage('Build and Test') {
            steps {
                script {
                    def initSqlContent = '''CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isadmin BOOLEAN DEFAULT false,
    resetcode VARCHAR(255),
    registration_time TIMESTAMP
);'''
                    sh 'docker rm -f 96d6ff15e00158d57c1a2f25033692b7da0f2489ebe1907297ca6ab7763b4ae3'
                    sh 'docker system prune'
                    sh "echo '''$initSqlContent''' > scripts/init.sql"

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

                    sh 'sleep 50'

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
                sh 'docker stop mongo-db'
                sh 'docker rm mongo-db'

                sh 'docker stop my-postgres'
                sh 'docker rm my-postgres'

                sh 'docker-compose down -v'
            }
        }
    }
}
