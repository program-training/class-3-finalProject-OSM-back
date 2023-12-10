pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        stage('Build and Test') {
            steps {
                script {
                    def dockerfileContent = '''
                        FROM node:18-alpine AS builder
                        WORKDIR /app
                        COPY package*.json ./
                        RUN npm install
                        RUN npm install -D typescript
                        COPY . .
                        RUN npm run build
                        CMD ["npm", "test"]
                    '''
                    // Write Dockerfile content to a file
                    writeFile file: 'Dockerfile.test', text: dockerfileContent
                     // Create the network if it doesn't exist
                    sh 'docker network ls | grep -q app-network || docker network create app-network'
                    // Build the Docker image for Express.js server
                    sh 'docker build -t oms-end-test3 -f Dockerfile.test .'
                    // Start MongoDB container
                    sh 'docker run -d --network app-network --name mongo-db mongo'
                    // Build and run the Express.js server container
                    sh "docker run --rm --name oms-test-class3 --network app-network -e MONGO_URI=mongodb://mongo-db:27017/test oms-end-test3 npm test"
                }
            }
        }
    }
    post {
        always {
            script {
                // Stop and remove the MongoDB container
                sh 'docker stop mongo-db'
                sh 'docker rm mongo-db'
            }
        }
    }
}
