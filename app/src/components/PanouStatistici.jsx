import { useEffect, useState } from 'react'
import { getStatistici } from '../api/statistici.js'

export default function PanouStatistici() {
  const [statistici, setStatistici] = useState({ destinatii: 0, zile: 0, medie: 0 })
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [prag, setPrag] = useState('3')
  const [tara, setTara] = useState('')

  useEffect(() => {
    let active = true

    async function incarca() {
      try {
        const date = await getStatistici(prag, tara)
        if (active) setStatistici(date)
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
  }, [prag, tara])

  if (incarcare) {
    return <p className="stare">Se încarcă statisticile...</p>
  }

  if (eroare) {
    return <p className="stare eroare">Statistici indisponibile: {eroare}</p>
  }

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
      <label>
        Țară{' '}
        <input
          type="text"
          value={tara}
          onChange={(event) => setTara(event.target.value)}
          placeholder="Toate"
        />
      </label>
      {statistici.destinatii === 0 && (
        <p className="gol">Nicio destinație cu cel puțin {prag} zile.</p>
      )}
      {statistici.destinatii > 0 && (
        <ul>
          <li>Destinații: {statistici.destinatii}</li>
          <li>Total zile: {statistici.zile}</li>
          <li>Media: {statistici.medie.toFixed(1)} zile</li>
        </ul>
      )}
    </section>
  )
}
