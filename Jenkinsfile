pipeline {
    agent any

    environment {
        DATABASE_NAME = 'your_database_name'
        DATABASE_USER = 'your_database_user'
        DATABASE_PASSWORD = 'your_database_password'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm start &'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('Integration Test') {
            steps {
                script {
                    sh 'npm run test'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker-compose down'
            }
        }
    }
}
