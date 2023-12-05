pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yaml up -d --build'

                    try {
                        sh 'docker exec server-container npm install'
                        sh 'docker exec server-container npm test'
                    } finally {
                        sh 'docker-compose -f docker-compose.yaml down'
                    }
                }
            }
        }
    }
}
