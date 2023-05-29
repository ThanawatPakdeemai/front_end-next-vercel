pipeline {
  agent any
 
  // tools {nodejs "Node16"}

  stages {
    stage('login server'){
      steps{
        sshagent(credentials: ['ssh-naka-dev']) {
          // sh 'ssh -o StrictHostKeyChecking=no naka@naka.im'
          sh '''
            [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
            ssh-keyscan -t rsa,dsa naka.im >> ~/.ssh/known_hosts
            ssh naka@naka.im
          '''
          sh 'pm2 list'
        }
        echo "success lgoin"
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