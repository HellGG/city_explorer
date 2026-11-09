# City Explorer

Aplicație React pentru planificarea destinațiilor, cu date păstrate de `json-server`.

## Pornire

Într-un terminal, din acest director:

```powershell
npm install
npx json-server db.json --port 3001
```

Într-un al doilea terminal:

```powershell
npm run dev
```

Deschide adresa Vite afișată în terminal. API-ul de test este disponibil la
`http://localhost:3001/destinatii`.

Aplicația încarcă destinațiile paginat (20 pe pagină), permite căutarea și
marcarea destinațiilor vizitate, iar formularul validează datele înainte să le
trimită serverului. `node genereaza.js` creează `db-mare.json` pentru exercițiul
de performanță; acesta poate fi pornit separat cu `npx json-server db-mare.json --port 3002`.
