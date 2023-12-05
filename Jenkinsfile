pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yaml up -d --build'

                    try {
                        // Use the service name defined in docker-compose.yaml for the server
                        sh 'docker exec server npm install'
                        sh 'docker exec server npm test'
                    } finally {
                        sh 'docker-compose -f docker-compose.yaml down'
                    }
                }
            }
        }
    }
}
