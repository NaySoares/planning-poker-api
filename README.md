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

Popular o banco com dados de teste
OBS: Execute apenas se nunca subiu o projeto antes, pois o script deleta os registros existentes.
```bash
npx prisma db seed
```

Subir o projeto
```bash
npm run dev
```