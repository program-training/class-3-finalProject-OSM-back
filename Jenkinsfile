pipeline {
    agent any
    stages {
        stage("Stop and remove existing containers") {
            steps {
                script {
                    sh 'docker-compose down -v --remove-orphans'
                    sh 'docker system prune -af'
                    sh 'sleep 5s'
                }
            }
        }

        stage("Run Docker Compose") {
            steps {
                script {
                    sh 'docker-compose up -d'
                    sh 'sleep 20s' // Adjust the delay based on your application startup time
                }
            }
        }

        stage("Clone application repository") {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/DevOps']],
                        userRemoteConfigs: [[url: 'https://github.com/program-training/class-3-finalProject-OSM-back.git']],
                        credentialsId: 'test'
                    ])
                }
            }
        }

        stage("Run Node.js application") {
            steps {
                script {
                    dir('./') {
                        sh 'npm install'
                        sh 'npm start'  
                        sh 'sleep 10s'
                    }
                }
            }
        }

        stage("Execute npm run test") {
            steps {
                script {
                    dir('./') {
                        sh 'npm run test'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker-compose down -v --remove-orphans'
                sh 'docker system prune -af'
            }
        }
    }
}

