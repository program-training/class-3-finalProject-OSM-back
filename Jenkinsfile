pipeline {
    agent any

    environment {
        // Define environment variables for database configuration
        DATABASE_NAME = 'your_database_name'
        DATABASE_USER = 'your_database_user'
        DATABASE_PASSWORD = 'your_database_password'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Your build steps, e.g., npm install, etc.
                    sh 'npm install'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Use docker-compose to start containers
                    sh 'docker-compose up -d'
                }
            }
        }

        
        stage('Test') {
            steps {
                script {
                    // Your test steps, e.g., npm test, etc.
                    def testExitCode = sh(script: 'npm test', returnStatus: true)
                    
                    if (testExitCode == 0) {
                        echo 'Tests passed successfully'
                    } else {
                        error 'Tests failed'
                    }
                }
            }
        }
        
        stage('Integration Test') {
            steps {
                script {
                    // Perform integration testing, e.g., using a testing framework
                    sh 'npm run integration-test'
                }
            }
        }
        
        stage('Deploy to Production') {
            // This stage will only run if the 'Test' stage succeeds
            when {
                expression {
                    currentBuild.resultIsBetterOrEqualTo('SUCCESS')
                }
            }
            steps {
                script {
                    // Your deployment steps for production
                    sh 'kubectl apply -f production-deployment.yaml'
                }
            }
        }
    }

    post {
        always {
            // Cleanup steps, e.g., docker-compose down
            script {
                sh 'docker-compose down'
            }
        }
    }
}
