pipeline {
    agent any 
    stages {
        stage ("verify tooling"){
            steps{
                sh '''
                docker info
                docker version 
                '''
            }
        }
        stage("Verify Docker Compose Version") {
            steps {
                sh 'docker-compose version'
            }
        }

    }
}
        
