pipeline {
    agent { 
        docker { 
            image 'node:18-buster' 
        }
    }
    options {
        checkoutToSubdirectory('argo-monitoring')
        newContainerPerStage()
    }
    environment {
        PROJECT_DIR='argo-monitoring'
        GH_USER = 'newgrnetci'
        GH_EMAIL = '<argo@grnet.gr>'
   }
    stages {
    
        stage ('Deploy Docs') {
            when {
                anyOf {
                    branch 'master'
                    branch 'devel'
                }
            }
            steps {
                echo 'Publish argo-monitoring docs...'
                sh '''
                    cd $WORKSPACE/$PROJECT_DIR
                    cd website
                    npm install
                '''
                sshagent (credentials: ['jenkins-master']) {
                    sh '''
                        cd $WORKSPACE/$PROJECT_DIR/website
                        mkdir ~/.ssh && ssh-keyscan -H github.com > ~/.ssh/known_hosts
                        git config --global user.email ${GH_EMAIL}
                        git config --global user.name ${GH_USER}
                        GIT_USER=${GH_USER} USE_SSH=true npm run deploy
                    '''
                }
            }
        } 
    }
    post{
        always {
            cleanWs()
        }
        success {
            script{
                if ( env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'devel' ) {
                    slackSend( message: ":rocket: New version of argo-monitoring docs deployed! Job: $JOB_NAME !\n <https://argoeu.github.io/argo-monitoring|See them here...>")
                }
            }
        }
        failure {
            script{
                if ( env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'devel' ) {
                    slackSend( message: ":rain_cloud: Deployment of argo-monitoring docs failed! Job: $JOB_NAME")
                }
            }
        }
    }
}
