pipeline {
  agent any
  environment {
    CREDS_ID = 'aws-creds'
    AWS_REGION = 'ap-south-1'
    S3_BUCKET = 'my-react-frontend-pavitra-1400760096'  // your bucket
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install & Build') {
      steps {
        bat 'npm ci'
        bat 'npm run build'
      }
    }
    stage('Deploy to S3') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${CREDS_ID}", usernameVariable: 'AWS_KEY', passwordVariable: 'AWS_SECRET')]) {
          bat """
            REM temporarily configure aws cli for this build
            aws configure set aws_access_key_id %AWS_KEY%
            aws configure set aws_secret_access_key %AWS_SECRET%
            aws configure set region ${AWS_REGION}

            REM sync build folder to S3, make each object public
            aws s3 sync build\\ s3://${S3_BUCKET}\\ --delete --acl public-read
          """
        }
      }
    }
  }
  post {
    success {
      echo "Deployment complete: http://${S3_BUCKET}.s3-website-${AWS_REGION}.amazonaws.com"
    }
    failure {
      echo "Build or deploy failed — check console logs"
    }
  }
}
