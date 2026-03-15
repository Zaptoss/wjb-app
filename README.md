# wjb-app

## Deployment

Admin panel: https://admin.brainybobs.xyz
- Email: `admin@example.com`
- Password: `5@gWey=6prX3`

User flow: https://user.brainybobs.xyz

## Local development

Setup dev environment:
```
docker compose -f infra/docker-compose.yaml up -d --build
```

Port bindings:
- Admin panel port: 8000
- User flow port: 8001
- Admin api port: 8010
- User api port: 8011
- DB port: 5432

Drop dev environment:
```
docker compose -f infra/docker-compose.yaml down -v
```

