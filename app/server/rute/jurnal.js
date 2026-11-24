import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

router.get('/raport', async (req, res) => {
  let sql = `SELECT metoda, cale, COUNT(*) AS cereri,
                    ROUND(AVG(durata_ms), 1) AS durata_medie
             FROM jurnal`
  const valori = []

  if (req.query.metoda) {
    sql += ' WHERE metoda = ?'
    valori.push(req.query.metoda)
  }

  sql += ` GROUP BY metoda, cale
           ORDER BY cereri DESC
           LIMIT 10`

  const [randuri] = await pool.query(sql, valori)

  res.json(randuri.map((rand) => ({
    metoda: rand.metoda,
    cale: rand.cale,
    cereri: Number(rand.cereri),
    durata_medie: Number(rand.durata_medie),
  })))
})

export default router
