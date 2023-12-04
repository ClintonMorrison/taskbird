# TaskBird

An awesome task management and calendar app: https://taskbird.ca

The website / API part of this site uses Django. The frontend uses Angular.

## Running locally

```
# Server
sudo apt-get install mysql-server libmysqlclient-dev python3-dev python3-pip
cd app/
python3 -m venv venv
source venv/bin/activate
pip3 install -r ./requirements.txt
sh start_wsgi.sh

# DB Migrations
python manage.py migrate

# Frontend
cd app/taskbird-app
npm i
npm start

```

## Running in prod

```
cd ./taskbird-app
sh build_for_prod.sh

cd ../
sh start_wsgi.sh
```
