pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = 1
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/ogunmehmetsalih/pipeline_app.git'
            }
        }

        stage('Set Minikube Docker Env') {
            steps {
                // Minikube'un içindeki Docker ortamına geç
                sh 'eval $(minikube docker-env) && docker info'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'eval $(minikube docker-env) && docker build -t my-node-app .'
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}

