pipeline {
  agent any
 
  tools {nodejs "Node18"}

  stages {
    stage('Prepare') {
      sh "npm install -g yarn"
      sh "yarn install"
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