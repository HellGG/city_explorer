import { pool } from './db.js'

const ORASE = [
  'Alba', 'Arad', 'Bacau', 'Baia', 'Bistrita', 'Botosani', 'Brad', 'Buzau',
  'Calafat', 'Caracal', 'Codlea', 'Comanesti', 'Deva', 'Dorohoi', 'Fagaras',
]
const tari = ['România', 'Moldova', 'Ungaria', 'Italia', 'Spania']
const inceput = Date.now()

for (let i = 0; i < 200000; i += 1000) {
  const valori = []
  const marcaje = []

  for (let j = i; j < i + 1000; j++) {
    valori.push(
      `${ORASE[j % ORASE.length]} ${j}`,
      tari[j % tari.length],
      (j % 30) + 1,
      j % 3 === 0,
    )
    marcaje.push('(?, ?, ?, ?)')
  }

  await pool.query(
    `INSERT INTO destinatii (oras, tara, zile, vizitat) VALUES ${marcaje.join(',')}`,
    valori,
  )
  console.log(`${Math.min(i + 1000, 200000)} / 200000`)
}

console.log(`Gata in ${((Date.now() - inceput) / 1000).toFixed(1)} s`)
await pool.end()
