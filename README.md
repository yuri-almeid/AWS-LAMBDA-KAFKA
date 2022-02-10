# AWS LAMBDA KAFKA

> This project is a AWS cloudFormation Stack that produces kafka messages with a SASL KafkaJs client.

## 💻 Before we start

Before we start make sure to install `Serverless Framework`.

```
npm install -g serveless
```

## Installation

To install just do:
```
npm install
```
In my case I am using a Confluent Cloud cluster, so I use SASL to connect, for that I just set my environment variables in my .bashrc like that:
```
# Confluent
export BOOTSTRAP_SERVERS='<MY_BROKER_SERVER>'
export SECURITY_PROTOCOL='<MY_SECURITY_PROTOCOL>'
export SASL_MECHANISMS='<MY_MECHANISM>'
export SASL_USERNAME='<MY_SASL_USERNAME>'
export SASL_PASSWORD='<MY_SASL_PASSWORD>'
export SESSION_TIMEOUT='<MY_SESSION_TIMEOUT>'
```
Once it was done, you can run  deploy it on your aws account, to do that just do:
```
sls deploy
```

## ☕ Usage

Okay, now your producer is online, now you can run your consumer and send a POST request like:
```
{
	"cod": "test",
	"Hello": "World"
}
```
And you'll receive a responsa like that:
```
{
  "messageStatus": "sent Sucessfully",
  "clientId": "AWS-LAMBDA-KAFKA",
  "topic": "OPEN_TOPIC",
  "key": "test",
  "value": {
    "cod": "test",
    "Hello": "World"
  }
}
```


