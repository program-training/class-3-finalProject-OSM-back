pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS = credentials('Benny')
    }
    stages {
        stage('Build') {
            steps {
                script {
                        echo 'Building Front...'
                        sh 'docker build -t $DOCKER_CREDENTIALS_USR/store-front:latest .'
                }
            }
        }
        stage('dockerhub login') {
            steps {
                script{
                    sh 'echo "Logging in to Dockerhub..."'
                    sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'
                    sh 'echo "Login Completed"'
                }
            }
        }
        stage('dockerhub push') {
            steps {
                script {
                    sh 'echo "Pushing..."'
                    sh 'docker push $DOCKER_CREDENTIALS_USR/store-front:latest'
                }
            }
        }
    }
    post {
        success {
            script {
                echo 'Building passed. You may now merge.'
                setGitHubPullRequestStatus(
                    state: 'SUCCESS',
                    context: 'class3_store_front_build',
                    message: 'build passed',
                )
            }
        }
        failure {
            script {
                echo 'Pipeline failed. Blocking pull request merge.'
                setGitHubPullRequestStatus(
                    state: 'FAILURE',
                    context: 'class3_store_front_build',
                    message: 'build failed',
                )
            }
        }
        always {
            script {
                echo 'Cleaning workspace...'
                sh 'docker rmi $DOCKER_CREDENTIALS_USR/store-front:latest'
            }
        }
    }
}
