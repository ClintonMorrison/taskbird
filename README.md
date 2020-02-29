# TaskBird
An awesome task management and calendar app: https://taskbird.ca

The website / API part of this site uses Django. The frontend uses Angular.

## Running locally
```
# Server
sh start_wsgi.sh

# Frontend
cd ./taskbird-app
sh dev_server.sh

```

## Running in prod
```
cd ./taskbird-app
sh build_for_prod.sh

cd ../
sh start_wsgi.sh
```