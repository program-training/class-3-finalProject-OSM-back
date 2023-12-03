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
                    // Build the Node.js backend image
                    sh 'docker build -t my-node-app .'
        
                    // Start Docker Compose services
                    sh 'docker-compose up -d'
        
                    // Run integration tests
                    sh 'docker exec my-node-app npm run test-integration'
                }
            }
        }
    }
}

    
