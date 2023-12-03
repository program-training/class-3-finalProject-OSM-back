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

        stage("Clone application repository") {
            steps {
                script {
                    git 'https://github.com/program-training/class-3-finalProject-OSM-back.git'
                }
            }
        }

        stage("Run Node.js application") {
            steps {
                script {
                    // Assuming your Node.js application is in the cloned repository
                    dir('./') {
                        sh 'npm install'
                        sh 'npm start &'  // Adjust the startup command based on your application
                        sh 'sleep 10s'
                    }
                }
            }
        }

        stage("Execute npm run test") {
            steps {
                script {
                    // Assuming your Node.js tests are in the cloned repository
                    dir('your/repository') {
                        sh 'npm run test'
                    }
                }
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
