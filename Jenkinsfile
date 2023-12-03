pipeline {
    agent any 
    stages {
        stage ("verify tooling"){
            steps{
                sh '''
                docker info
                docker version 
                docker-compose version 
                curl --versionjq --version
                '''
            }
        }
        stage("Install Docker Compose") {
            steps {
                script {
                    sh 'curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                    sh 'chmod +x /usr/local/bin/docker-compose'
                }
            }
        }
    }
}
        
