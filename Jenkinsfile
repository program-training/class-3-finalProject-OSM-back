pipeline {
    agent any
    stages {
        stage("Stop and remove existing container") {
            steps {
                script {
                    // Stop and remove existing container if it exists
                    sh 'docker stop test || true'
                    sh 'docker rm test || true'
                    
                    // Sleep for a few seconds to allow Docker to complete cleanup
                    sh 'sleep 5s'
                }
            }
        }

        stage("Run PostgreSQL container") {
            steps {
                script {
                    // Run PostgreSQL container
                    sh 'docker run --rm --name test -e POSTGRES_PASSWORD=12345 -p 5432:5432 -d postgres'

                    // Sleep for a few seconds to allow PostgreSQL to start
                    sh 'sleep 10s'
                }
            }
        }

        stage("Execute psql command") {
            steps {
                script {
                    // Execute psql command with allocated TTY
                    sh 'docker exec test psql -U postgres'
                }
            }
        }

        stage("Check running containers") {
            steps {
                script {
                    // List running containers
                    sh 'docker ps'
                }
            }
        }

        stage("Check available images") {
            steps {
                script {
                    // List Docker images
                    sh 'docker images ls'
                }
            }
        }
    }

    post {
        always {
            // Clean up: Stop and remove the container after execution
            script {
                sh 'docker stop test || true'
                sh 'docker rm test || true'
            }
        }
    }
}
