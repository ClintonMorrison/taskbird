#!/bin/bash
source version.sh

echo "Building version: $VERSION"

docker stop taskbird
docker rm taskbird

docker build -t "clintonmorrison/projects:taskbird-$VERSION" . &&
  docker push "clintonmorrison/projects:taskbird-$VERSION" &&
  echo "Running container..." &&
  sh run_container.sh