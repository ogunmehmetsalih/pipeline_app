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
                // Minikube Docker environment değişkenlerini bir dosyaya yaz
                sh '/opt/homebrew/bin/minikube docker-env > docker_env.sh'
            }
        }

        stage('Docker Build') {
            steps {
                sh '. ./docker_env.sh && /opt/homebrew/bin/docker build -t my-node-app .'
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                sh '/opt/homebrew/bin/kubectl apply -f k8s/'
            }
        }
    }
}

