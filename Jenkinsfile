pipeline {
    agent any
    stages {
        stage("Stop and remove existing container") {
            steps {
                script {
                    sh 'docker stop test || true'
                    sh 'docker rm test || true'
                    sh 'sleep 5s'
                }
            }
        }

        stage("Run PostgreSQL container") {
            steps {
                script {
                    sh 'docker run --rm --name test -e POSTGRES_PASSWORD=12345 -p 5432:5432 -d postgres'

                    sh 'sleep 10s'
                }
            }
        }

        stage("Execute psql command") {
            steps {
                script {
                    sh 'docker exec test psql -U postgres'
                }
            }
        }
    post {
        always {
            script {
                sh 'docker stop test || true'
                sh 'docker rm test || true'
            }
        }
    }
}
