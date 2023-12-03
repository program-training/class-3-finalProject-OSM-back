pipeline {
    agent any 
    stages {
        stage("run postgerss image") {
            steps {
                script {
                    sh 'docker run --rm --name test -e POSTGRES_PASSWORD=12345 -p 5432:5432 -d postgres'
              
                    sh 'docker exec -it test psql -U postgres'

                    sh 'docker ps'

                    sh 'docker images ls'
    
                }
            }
        }
    }
}
