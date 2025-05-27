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
                // Bash uyumlu ortam değişkenleri alınıyor
                sh '/opt/homebrew/bin/minikube docker-env --shell bash > docker_env.sh'
            }
        }

        stage('Docker Build') {
            steps {
                // Ortam değişkenlerini yükle ve docker build yap
                sh '. ./docker_env.sh && docker build -t my-node-app .'
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                sh '/opt/homebrew/bin/kubectl apply -f k8s/'
            }
        }
    }
}

