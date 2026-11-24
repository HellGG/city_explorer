import { pool } from './db.js'

export function jurnal(req, res, next) {
  const inceput = process.hrtime.bigint()
  const cale = req.originalUrl

  res.on('finish', async () => {
    const durata = Number(process.hrtime.bigint() - inceput) / 1e6
    try {
      await pool.query(
        'INSERT INTO jurnal (metoda, cale, status, durata_ms) VALUES (?, ?, ?, ?)',
        [req.method, cale, res.statusCode, Math.round(durata)],
      )
    } catch (error) {
      console.error('Nu s-a putut salva cererea în jurnal:', error.message)
    }
  })

  next()
}
