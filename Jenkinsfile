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
          sh "ssh naka@naka.im 'pm2 list && cd /home/naka/frontend-nextjs && git checkout -f develop && git pull origin develop -f && yarn install && BUILD_DIR=temp yarn build:dev && rm -rf .next && mv temp .next && pm2 restart frontend-v2 && cd /home/naka/frontend-uat && git checkout -f develop && git pull origin develop -f && yarn install && BUILD_DIR=temp yarn build:dev && rm -rf .next && mv temp .next && pm2 restart frontend-v2'"
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
