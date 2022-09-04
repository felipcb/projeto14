pipeline {
    agent any

    stages {
        stage('Clone do repositório de API') {
            steps {
                git branch: 'main', credentialsId: 'd8ffff6d-864e-4915-a68b-d59c0109b8ab', url: 'https://github.com/felipcb/projeto14.git'
            }
        }
        stage('Instalar as dependências') {
            steps {
                powershell 'npm install -y'
            }
        }
        stage('Instalar cypress') {
            steps {
                powershell 'npm install cypress --save-dev' 
            }
        } 

        stage('Teste') {
            steps {
                powershell 'npx cypress run'
            }
        }
      
    }
}