pipeline {
    agent any
    stages {
        stage("Run PostgreSQL container") {
            steps {
                script {
                    sh 'docker run --rm --name test -e POSTGRES_PASSWORD=12345 -p 5432:5432 -d postgres'
                }
            }
        }

        stage("Execute psql command") {
            steps {
                script {
                    sh 'docker exec -it test psql -U postgres'
                }
            }
        }

        stage("Check running containers") {
            steps {
                script {
                    sh 'docker ps'
                }
            }
        }

        stage("Check available images") {
            steps {
                script {
                    sh 'docker images ls'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker stop test'
                sh 'docker rm test'
            }
        }
    }
}

