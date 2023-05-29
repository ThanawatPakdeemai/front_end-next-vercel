pipeline {
  agent any
 
  tools {nodejs "Node16"}

  stages {
    stage('Prepare') {
      steps {
        echo 'Preparing...'
        sh "npm install -g yarn"
      }
    }
    stage('Install') {
      steps {
        echo 'Installing...'
        sh 'yarn install'
      }
    }
    stage('Build') {
      steps {
        echo 'Building...'
        sh 'yarn build'
      }
    }
  }
}