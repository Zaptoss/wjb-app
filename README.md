# wjb-app

## Deployment

Admin panel: https://admin.brainybobs.xyz
User flow: https://user.brainybobs.xyz

## Local development

Setup dev environment:
```
docker compose -f infra/docker-compose.yaml up -d --build
```

Drop dev environment:
```
docker compose -f infra/docker-compose.yaml down -v
```
