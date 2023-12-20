pipeline {
    agent any
    triggers {
        githubPush()
    }
    environment {
        DOCKER_CREDENTIALS = credentials('Benny')
        TAG_NAME = ''
        TAG_EXISTS = 'false'
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    sh 'printenv'
                    echo "Checking out code........"
                    def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH ?: 'DevOps'
                    checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url:'https://github.com/program-training/class-3-finalProject-OSM-back.git']]])

                    // Check if TAG_NAME exists
                    TAG_NAME = sh(script: "git tag --contains ${env.GIT_COMMIT}", returnStdout: true).trim()

                    // Remove the leading "v" from the tag name
                    TAG_NAME = TAG_NAME.replaceAll(/[a-zA-Z]/, '')

                    // Create a boolean variable based on the existence of TAG_NAME
                    TAG_EXISTS = TAG_NAME != null && !TAG_NAME.isEmpty()

                    if (TAG_EXISTS.toBoolean()) {
                        echo "GitHub Release Tag Name: ${TAG_NAME}"
                        // Add any other steps you need for when TAG_NAME exists
                    } else {
                        echo "No GitHub Release Tag found."
                    }
                }
            }
        }
        stage('Build') {
            when {
                expression { TAG_EXISTS.toBoolean() }
            }
            steps {
                script {
                        echo 'Building Front...'
                        sh "docker build -t $DOCKER_CREDENTIALS_USR/oms-back:$TAG_NAME ."
                }
            }
        }
        stage('dockerhub login') {
            when {
                expression { TAG_EXISTS.toBoolean() }
            }
            steps {
                script{
                    sh 'echo "Logging in to Dockerhub..."'
                    sh "echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin"
                    sh 'echo "Login Completed"'
                }
            }
        }
        stage('dockerhub push') {
            when {
                expression { TAG_EXISTS.toBoolean() }
            }
            steps {
                script {
                    sh 'echo "Pushing..."'
                    sh "docker push $DOCKER_CREDENTIALS_USR/oms-back:$TAG_NAME"
                    sh 'echo "Push Completed"'
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
                    context: 'class3_oms_back_build',
                    message: 'build passed',
                )
            }
        }
        failure {
            script {
                echo 'Pipeline failed. Blocking pull request merge.'
                setGitHubPullRequestStatus(
                    state: 'FAILURE',
                    context: 'class3_oms_back_build',
                    message: 'build failed',
                )
            }
        }
        always {
            script {
                echo 'Cleaning workspace...'
                sh 'docker rmi $DOCKER_CREDENTIALS_USR/oms-back:$TAG_NAME'
            }
        }
    }
}
