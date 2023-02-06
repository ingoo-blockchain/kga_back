# AWS EB + Docker + Actions 를 활용한 CI/CD 구현 

ECR 배포까지 테스트 완료.

`Beanstalk Deploy` 부분에서 Authorization 오류...
Role 설정을 정확히 해도 잘안된다..

일단 지금 에러가 났다..
Dockerrun.aws.json 버전을 1을 쓰란다..

로드밸런싱 설정 안했나보네..

```sh
11:17:39 ERROR: Instance deployment: 'Dockerrun.aws.json' in your source bundle specifies an unsupported version. Elastic Beanstalk only supports version 1 for non compose app and version 3 for compose app. The deployment failed.
```

그럼.. Authorization 권한 설정은 잘되는거같다 ?.. 분명 똑같이했는데.. 
version1 은 쉽게 설정 가능해서 바꿔보자. 

**version1**
```js
{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "363239913720.dkr.ecr.ap-northeast-2.amazonaws.com/ecskga:cef6c01eef9237c1f86e0619264880703719fe5a",
    "Update": "true"
  },
  "Ports": [
    {
      "ContainerPort": "3000",
      "HostPort": "3000"
    }
  ]
}
```

**version2**
```json
{
    "AWSEBDockerrunVersion": 2,
    "volumes": [
      {
        "name": "backend",
        "host": {
          "sourcePath": "/app"
        }
      }
    ],
    "containerDefinitions": [
      {
        "name": "backend",
        "image": "363239913720.dkr.ecr.ap-northeast-2.amazonaws.com/ecrkga:latest",
        "environment": [
          {
            "name": "NODE_NEV",
            "value": "production"
          }
        ],
        "essential": true,
        "memory": 128,
        "portMappings": [
          {
            "containerPort": 3000,
            "hostPort": 80
          }
        ]
      }
    ]
  }
  
```


Docker image 를 가져오지 못하는 오류를 발생함
인스턴스 프로파일의 IAM 역활에 s3:GetObject 권한이 없을 확률 있다고 함.

AmazonS3ReadOnlyAccess 역활을 줘보도록함.

## Amazon ECR 리포지토리 의 이미지 사용

ECR 를 사용할려면 AWS에서 사용자 지정 Docker Image를 저장할수있습니다.

Amazon ECR에 Docker 이미지를 저장하면 Elastic Beanstalk는 환경의 인스턴스 프로파일을 사용하여 Amazon ECR 레지스트리에 자동으로 인증하므로, 인증 파일을  생성하고 이를 Amazon Simple Storage Service (Amazon S3) 에 업로드할 필요가 없슴

그러나 환경의 인스턴스 프로파일에 권한을 추가하여
Amazon ECR 리포지토리의 이미지에 엑세스할 권한이 있는 인스턴스를 제공해야함.

AmazonEC2ContainerRegistryReadOnly 관리형 정책을 인스턴스 프로파일에 연결하여 계정의 모든 Amazon ECR 리포지토리에 읽기 전용 엑세스 권한을 제공해줘야 할거같음.

아니면

```json
{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowEbAuth",
        "Effect": "Allow",
        "Action": [
          "ecr:GetAuthorizationToken"
        ],
        "Resource": [
          "*"
        ]
      },
      {
        "Sid": "AllowPull",
        "Effect": "Allow",
        "Resource": [
          "arn:aws:ecr:us-east-2:account-id:repository/repository-name"
        ],
        "Action": [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:GetRepositoryPolicy",
          "ecr:DescribeRepositories",
          "ecr:ListImages",
          "ecr:BatchGetImage"
        ]
      }
    ]
  }
```

이런 형태로 추가된 권한을 주거나..

ㅇ...왜..안됨..?

AmazonEC2ContainerRegistryFullAccess 이걸로 바꿔서..


