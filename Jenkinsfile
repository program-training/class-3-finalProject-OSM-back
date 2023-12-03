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
    stage("Integration Testing") {
        steps {
            script {
                sh 'docker build -t my-node-app ./backend'

                sh 'docker-compose up -d'

                sh 'docker exec my-node-app npm run test-integration'
            }
        }
    }
}
        
