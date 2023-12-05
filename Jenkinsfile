pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build("your-image-name")
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    docker.image("your-image-name").withRun("--name your-container-name") { c ->
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
                docker.image("your-image-name").stop()
                docker.image("your-image-name").remove()
            }
        }
    }
}
