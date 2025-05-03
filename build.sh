#!/bin/bash
source version.sh

echo "Building version: $VERSION"

#docker stop taskbird
# docker rm taskbird

TAG="$DOCKER_REGISTRY_PROJECTS/taskbird:$VERSION"

docker build --platform linux/amd64 -t "$TAG" . &&
  docker push "$TAG"

# echo "Running container..." &&
#   sh run_container.sh
