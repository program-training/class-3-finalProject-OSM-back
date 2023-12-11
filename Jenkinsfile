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
                        CMD ["npm", "test"]
                    '''
                    // Write Dockerfile content to a file
                    writeFile file: 'Dockerfile.test', text: dockerfileContent
                     // Create the network if it doesn't exist
                    sh 'docker network ls | grep -q app-network || docker network create app-network'
                    // Build the Docker image for Express.js server
                    sh 'docker build -t oms-end-test3 -f Dockerfile.test .'
                    sh 'docker build -t oms-end3 .'
                    // Start MongoDB container
                    sh 'docker run -d --network app-network --name mongo-db mongo'
                    sh 'docker run -d --network app-network --name postgress -e POSTGRES_PASSWORD=mysecretpassword postgres'
                    // Build and run the Express.js server container
                    sh "docker run -d --rm --name oms-class3 --network app-network -e MONGO_CONNECTION_URI=mongodb://mongo-db:27017/test -e DATABASE_USERNAME=postgres://users_cwmw_user:kfozee3pFHkIqdsb3xN3DgchdmiLyr7I@dpg-cldimnmg1b2c73f7ul1g-a.oregon-postgres.render.com/users_cwmw -e SECRET_TOKEN_KEY=secretKey -e PORT=8081 oms-end3"
                    sh "docker run --rm --name oms--test-class3 -p 8081:8081 --network app-network oms-end-test3"
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
