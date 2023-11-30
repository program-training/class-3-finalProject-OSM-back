pipeline {
    agent any

    stages {
        stage('Build Backend Image') {
            steps {
                script {
                    // Ensure the image name matches the one in docker-compose.yaml
                    docker.build('your-backend-image-name')
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yaml up --build'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker-compose -f docker-compose.yaml down'
            }
        }
    }
}
