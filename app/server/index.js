import express from 'express'
import cors from 'cors'
import { pool } from './db.js'
import { jurnal } from './jurnal.js'
import statistici from './rute/statistici.js'
import raportJurnal from './rute/jurnal.js'

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(cors())
app.use(express.json())
app.use(jurnal)

app.all('/api/ecou/:id', (req, res) => {
  res.json({ params: req.params, query: req.query, body: req.body })
})

app.get('/api/destinatii', async (req, res) => {
  const [randuri] = await pool.query(
    'SELECT id, oras, tara, zile, vizitat FROM destinatii ORDER BY id',
  )
  const destinatii = randuri.map((d) => ({
    ...d,
    id: String(d.id),
    vizitat: Boolean(d.vizitat),
  }))

  if (req.query._page === undefined) {
    return res.json(destinatii)
  }

  const pagina = Math.max(1, Number(req.query._page) || 1)
  const perPagina = Math.max(1, Number(req.query._per_page) || 20)
  const start = (pagina - 1) * perPagina
  res.json({
    data: destinatii.slice(start, start + perPagina),
    pages: Math.max(1, Math.ceil(destinatii.length / perPagina)),
  })
})

app.get('/api/destinatii/caut', async (req, res) => {
  if (!req.query.oras) {
    return res.status(400).json({ eroare: 'Parametrul oras este obligatoriu.' })
  }
  const [randuri] = await pool.query(
    'SELECT id, oras, tara, zile, vizitat FROM destinatii WHERE oras = ?',
    [req.query.oras],
  )
  res.json(randuri.map((d) => ({
    ...d,
    id: String(d.id),
    vizitat: Boolean(d.vizitat),
  })))
})

app.post('/api/destinatii', async (req, res) => {
  const { oras, tara, zile } = req.body
  const valid =
    typeof oras === 'string' && oras.trim() !== '' &&
    typeof tara === 'string' && tara.trim() !== '' &&
    Number.isInteger(zile) && zile >= 1 && zile <= 30

  if (!valid) {
    return res.status(400).json({ eroare: 'Date invalide.' })
  }

  const [rezultat] = await pool.query(
    'INSERT INTO destinatii (oras, tara, zile, vizitat) VALUES (?, ?, ?, FALSE)',
    [oras.trim(), tara.trim(), zile],
  )

  res.status(201).json({
    id: String(rezultat.insertId),
    oras: oras.trim(),
    tara: tara.trim(),
    zile,
    vizitat: false,
  })
})

app.patch('/api/destinatii/:id', async (req, res) => {
  const id = Number(req.params.id)
  const vizitat = req.body.vizitat

  if (!Number.isInteger(id) || typeof vizitat !== 'boolean') {
    return res.status(400).json({ eroare: 'Date invalide.' })
  }

  const [rezultat] = await pool.query(
    'UPDATE destinatii SET vizitat = ? WHERE id = ?',
    [vizitat, id],
  )

  if (rezultat.affectedRows === 0) {
    return res.status(404).json({ eroare: 'Destinația nu există.' })
  }

  const [randuri] = await pool.query(
    'SELECT id, oras, tara, zile, vizitat FROM destinatii WHERE id = ?',
    [id],
  )
  const d = randuri[0]
  res.json({
    ...d,
    id: String(d.id),
    vizitat: Boolean(d.vizitat),
  })
})

app.use('/api/statistici', statistici)
app.use('/api/jurnal', raportJurnal)

app.listen(port, () => {
  console.log(`API-ul City Explorer rulează la http://localhost:${port}`)
})
