# ServerlessFramework デモサンプル

ServerlessFrameworkを利用して、簡単にBasicなAWS環境を構築します

## ServerlessFrameworkのインストール

インストールの方法は個人にお任せしますが、ここではnpmで入れる方法を書いておきます

```
$ npm install -g severless
```

## AWS Credentialsの設定

AWS環境を構築するアカウントのCredentialを設定します

```
$ aws configure
AWS Access Key ID [None]: IAMユーザーのアクセスキー
AWS Secret Access Key [None]: IAMユーザーのシークレットアクセスキー
Default region name [None]: ap-northeast-1
Default output format [None]:
```

## デプロイ実行

AWSへ各サービスをデプロイします
`-v` オプションをつけると詳細のログが表示されるようになります

```
$ sls deploy -v
```

## デプロイで構築されるリソース

 - Lambda(putDynamoDBtoKinesis)
 - DynamoDB(iot-serverless-dynamo)
 - Kinesis(iot-serverless-kinesis)

リソースの名前は *適宜変更してください*

## ServerlessFrameworkの設定ファイル(serverless.yml)

`serverless.yml` に各サービスの設定が書いてあります
コメントで詳細の説明をしているので確認してください

## Lambda

Lambdaのソースコードは、handlerとなるものが `index.js` です

その他外出ししたメソッド等は `./lib/` 以下にまとめてください

※初期状態は `index.js` に全てまとめています

## KinsisDataStreamsテストデータ送信する

```
aws kinesis put-record --stream-name iot-serverless-kinesis --data file://sample.json --partition-key "deviceID"
```

## AWSIoTにテストデータを送信する

```
aws iot-data publish --topic iot-serverless-topic --payload file://sample.json
```
