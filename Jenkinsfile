pipeline {
    agent any

    stages {
        stage('Build Backend Image') {
            steps {
                script {
                    docker.build('your-backend-image-name')
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    docker.withTool('docker-compose') {
                        sh 'docker-compose -f docker-compose.yaml up --build'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                docker.withTool('docker-compose') {
                    sh 'docker-compose -f docker-compose.yml down'
                }
            }
        }
    }
}
