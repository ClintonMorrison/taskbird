rm -rf dist
ng build --prod --build-optimizer --base-href=/v2/ && rm -rf ../dist && mv dist ../v2

