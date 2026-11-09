import { useState } from 'react'
import { valideaza } from '../utils/validare.js'

const valoriInitiale = { oras: '', tara: '', zile: '' }

export default function FormularDestinatie({ onAdd, seTrimite }) {
  const [valori, setValori] = useState(valoriInitiale)
  const [erori, setErori] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setValori((curente) => ({ ...curente, [name]: value }))
    setErori((curente) => {
      if (!curente[name]) return curente
      const urmatoare = { ...curente }
      delete urmatoare[name]
      return urmatoare
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const eroriNoi = valideaza(valori)
    setErori(eroriNoi)
    if (Object.keys(eroriNoi).length > 0) return

    const adaugata = await onAdd({
      oras: valori.oras.trim(),
      tara: valori.tara.trim(),
      zile: Number(valori.zile),
      vizitat: false,
    })

    if (adaugata) {
      setValori(valoriInitiale)
      setErori({})
    }
  }

  return (
    <form className="formular" onSubmit={handleSubmit} noValidate>
      <div className="camp">
        <input
          type="text"
          name="oras"
          value={valori.oras}
          onChange={handleChange}
          placeholder="Oraș"
          aria-label="Oraș"
          aria-invalid={Boolean(erori.oras)}
          aria-describedby={erori.oras ? 'eroare-oras' : undefined}
          className={erori.oras ? 'invalid' : ''}
        />
        {erori.oras && <p id="eroare-oras" className="eroare-camp">{erori.oras}</p>}
      </div>
      <div className="camp">
        <input
          type="text"
          name="tara"
          value={valori.tara}
          onChange={handleChange}
          placeholder="Țară"
          aria-label="Țară"
          aria-invalid={Boolean(erori.tara)}
          aria-describedby={erori.tara ? 'eroare-tara' : undefined}
          className={erori.tara ? 'invalid' : ''}
        />
        {erori.tara && <p id="eroare-tara" className="eroare-camp">{erori.tara}</p>}
      </div>
      <div className="camp">
        <input
          type="number"
          name="zile"
          value={valori.zile}
          onChange={handleChange}
          placeholder="Zile"
          aria-label="Număr de zile"
          min="1"
          max="30"
          step="1"
          aria-invalid={Boolean(erori.zile)}
          aria-describedby={erori.zile ? 'eroare-zile' : undefined}
          className={erori.zile ? 'invalid' : ''}
        />
        {erori.zile && <p id="eroare-zile" className="eroare-camp">{erori.zile}</p>}
      </div>
      <button type="submit" disabled={seTrimite}>
        {seTrimite ? 'Se trimite...' : 'Adaugă'}
      </button>
    </form>
  )
}
