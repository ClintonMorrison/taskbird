FROM ubuntu:20.04

RUN \
  apt-get update && \
  apt-get install -y software-properties-common && \
  apt-get install -y python3-pip && \
  apt-get install -y libmysqlclient-dev && \
  apt-get install -y libssl-dev && \
  apt-get install -y nginx

COPY ./nginx.conf /etc/nginx
COPY ./app/ /opt/app

WORKDIR /opt/app

RUN pip3 install -r ./requirements.txt

CMD ["sh", "./start.sh"]
