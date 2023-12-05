pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Test') {
            steps {
                sh 'docker-compose up --exit-code-from test'
            }
        }
    }

    post {
        always {
            sh 'docker-compose down'
        }
    }
}
