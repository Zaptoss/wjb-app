# docker/redoc/Dockerfile
FROM node:20-alpine

# встановлюємо Redocly CLI
RUN npm install -g @redocly/cli

WORKDIR /app

# копіюємо весь OpenAPI spec
COPY ./api ./api

# опціонально копіюємо конфіг redocly.yaml
COPY ./redocly.yaml ./

# порт для preview
EXPOSE 8080

# команда за замовчуванням
ENTRYPOINT ["redocly"]