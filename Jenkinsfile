pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build("server-image")
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    docker.image("server-image").withRun("--name server-container") { c ->
                        docker.inside("--workdir=/app") {
                            sh 'npm install'
                            sh 'npm test'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                docker.image("server-image").stop()
                docker.image("server-image").remove()
            }
        }
    }
}
