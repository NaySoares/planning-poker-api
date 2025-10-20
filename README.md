### Subindo o projeto
execute os comando na ordem:
---------------

Subir o banco.
```bash
docker compose up -d
```

```bash
npx prisma generate
```

Sincronizar com as modificações mais recentes no banco.
```bash
npx prisma migrate dev
```

Subir o projeto
```bash
npm run dev
```