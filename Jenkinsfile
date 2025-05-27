pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = 1
        PATH = "/opt/homebrew/bin:/usr/bin:/bin:/usr/local/bin"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/ogunmehmetsalih/pipeline_app.git'
            }
        }

        stage('Set Minikube Docker Env') {
            steps {
                sh '/opt/homebrew/bin/minikube docker-env --shell bash > docker_env.sh'
            }
        }

        stage('Docker Build & Tag') {
            steps {
                script {
                    env.IMAGE_TAG = "my-node-app:${env.BUILD_NUMBER}"
                    sh '. ./docker_env.sh && docker build -t ' + env.IMAGE_TAG + ' .'
                }
            }
        }

        stage('Prepare Deployment File') {
            steps {
                script {
                    sh 'sed "s/BUILD_TAG/${BUILD_NUMBER}/g" k8s/web-deployment.yaml > k8s/web-deployment-gen.yaml'
                }
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                sh '/opt/homebrew/bin/kubectl apply -f k8s/redis-deployment.yaml'
                sh '/opt/homebrew/bin/kubectl apply -f k8s/web-deployment-gen.yaml'
                sh '/opt/homebrew/bin/kubectl apply -f k8s/service.yaml'
            }
        }
    }
}
