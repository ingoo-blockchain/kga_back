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

aa