import { useEffect, useState } from 'react'

export default function PanouStatistici() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [prag, setPrag] = useState('3')

  useEffect(() => {
    let active = true

    async function incarca() {
      try {
        const response = await fetch('http://localhost:3001/destinatii')
        if (!response.ok) {
          throw new Error(`Serverul a răspuns cu ${response.status}`)
        }

        const date = await response.json()
        if (active) setDestinatii(date)
      } catch (error) {
        if (active) setEroare(error.message)
      } finally {
        if (active) setIncarcare(false)
      }
    }

    incarca()
    return () => {
      active = false
    }
  }, [])

  if (incarcare) {
    return <p className="stare">Se încarcă statisticile...</p>
  }

  if (eroare) {
    return <p className="stare eroare">Statistici indisponibile: {eroare}</p>
  }

  const filtrate = destinatii.filter((destinatie) => destinatie.zile >= Number(prag))
  const totalZile = filtrate.reduce((suma, destinatie) => suma + destinatie.zile, 0)
  const medie = filtrate.length === 0 ? 0 : totalZile / filtrate.length

  return (
    <section className="panou">
      <h2>Statistici</h2>
      <label>
        Cel puțin{' '}
        <input
          type="number"
          value={prag}
          onChange={(event) => setPrag(event.target.value)}
        />{' '}
        zile
      </label>
      {filtrate.length === 0 && (
        <p className="gol">Nicio destinație cu cel puțin {prag} zile.</p>
      )}
      {filtrate.length > 0 && (
        <ul>
          <li>Destinații: {filtrate.length}</li>
          <li>Total zile: {totalZile}</li>
          <li>Media: {medie.toFixed(1)} zile</li>
        </ul>
      )}
    </section>
  )
}
