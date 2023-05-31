pipeline {
  agent any
 
  // tools {nodejs "Node16"}

  stages {
    stage('login server'){
      steps{
        sshagent(credentials: ['ssh-naka-dev']) {
          // sh 'ssh -o StrictHostKeyChecking=no naka@naka.im'
          // sh 'mkdir -p ~/.ssh'
          // sh "ssh-keyscan naka.im >> ~/.ssh/known_hosts"
          sh "ssh naka@naka.im 'node -v && yarn -v && cd /home/naka/frontend-nextjs && ./deploy.sh && cd /home/naka/frontend-uat && ./deploy.sh'"
        }
      }
    }
    // stage('Prepare') {
    //   steps {
    //     echo 'Preparing...'
    //     sh "npm install -g yarn"
    //     sh "npm install -g typescript@4.8.4"
    //   }
    // }
    // stage('Install') {
    //   steps {
    //     echo 'Installing...'
    //     sh 'yarn install'
    //   }
    // }
    // stage('Build') {
    //   steps {
    //     echo 'Building...'
    //     sh 'yarn build'
    //   }
    // }
  }
}
