pipeline {
    agent any 
    stages {
        stage("Integration Testing") {
            steps {
                script {
                    // Build the Node.js backend image
                    sh 'docker build -t backend .'
        
                    // Start Docker Compose services
                    sh 'docker-compose up -d'

                    sh 'docker ps'

                    sh 'docker images ls'
        
                    // Run integration tests in the 'backend' container
                    sh 'docker exec workspace_backend_1 npm run test'
                }
            }
        }
    }
}
