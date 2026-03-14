# Docs
docker build -t orders-docs:latest .

docker run -it --rm -p 8080:8080 -v ./:/app/ orders-docs build-docs

docker run -it --rm -v $(pwd)/api:/app/api orders-docs bundle api/openapi.yaml --output api/dist/openapi.yaml

docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate     -i /local/api/dist/openapi.yaml     -g csharp-functions     -o /local/out/csharp-functions

docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate     -i /local/api/dist/openapi.yaml     -g csharp-functions     -o /local/out/csharp-functions --additional-properties=buildTarget=library