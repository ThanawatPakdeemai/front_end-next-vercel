pipeline {
  agent any
 
  tools {nodejs "node18"}

  stages {
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