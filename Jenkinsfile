pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    // Build and start the containers using docker-compose
                    sh 'docker-compose -f docker-compose.yaml up -d --build'

                    // Execute tests inside the test container
                    try {
                        sh 'docker exec server-container npm install'
                        sh 'docker exec server-container npm test'
                    } finally {
                        // Stop and remove containers after tests
                        sh 'docker-compose -f docker-compose.yaml down'
                    }
                }
            }
        }
    }
}
