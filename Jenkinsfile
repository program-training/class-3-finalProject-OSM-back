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
        
                    // Run integration tests in the 'backend' container
                    sh 'docker exec backend npm run test'
                }
            }
        }
    }
}
