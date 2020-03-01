rm -rf dist
ng build --prod --build-optimizer --base-href=/v2/ && rm -rf ../v2 && mv dist ../v2

