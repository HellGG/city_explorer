# City Explorer

Aplicație React pentru planificarea destinațiilor, cu backend Express și MariaDB.

## Pornire

1. Pornește MariaDB:

```powershell
cd server
docker compose up -d
```

2. Instalează dependențele și pornește API-ul:

```powershell
npm install
npm run dev
```

3. În alt terminal, pornește interfața:

```powershell
cd ..
npm install
npm run dev
```

API-ul este disponibil la `http://localhost:3000/api/destinatii`, iar aplicația la adresa afișată de Vite.
