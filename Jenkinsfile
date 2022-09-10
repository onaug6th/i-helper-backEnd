def DEPLOY_ENVIRONMENT = "dev"
// #容器名称
def CONTAINER_NAME="ihelper"
// #镜像名称
def IMAGE_NAME="ihelper_image"
// #日志输出路径
def LOG_PATH="/root/sites/dnshop/logs:/app/logfile"
// #访问端口
def PORT="8012"
pipeline {
    agent {
        docker { image 'node:15.14.0-buster-slim' }
    }
    stages {
        stage('Build') {
            steps {
                sh "yarn"
                sh "yarn build"

                script{
                    try{
                        sh "docker stop ${CONTAINER_NAME}"
                        sh "docker rm ${CONTAINER_NAME} "
                        sh "docker rmi ${IMAGE_NAME}"
                    }catch(ex){
                        echo ex.getMessage()
                    }
                }

                sh "docker build . -t  ${IMAGE_NAME}"
                sh "docker run -e TZ=\"Asia/Shanghai\" --name ${CONTAINER_NAME} -d -p ${PORT}:3000 --restart=always ${IMAGE_NAME}"
            }
        }
    }
}