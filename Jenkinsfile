#!/usr/bin/env groovy

pipeline {
  agent {
    docker { image 'node:16' }
  }

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