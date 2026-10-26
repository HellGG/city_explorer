import { useState } from 'react'

export default function FormularDestinatie({ onAdd }) {
  const [oras, setOras] = useState('')
  const [tara, setTara] = useState('')
  const [zile, setZile] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const orasNou = oras.trim()
    const taraNoua = tara.trim()
    if (!orasNou || !taraNoua) {
      return
    }

    onAdd({
      id: crypto.randomUUID(),
      oras: orasNou,
      tara: taraNoua,
      zile: Number(zile),
      vizitat: false,
    })

    setOras('')
    setTara('')
    setZile('')
  }

  return (
    <form className="formular" onSubmit={handleSubmit}>
      <input
        type="text"
        value={oras}
        onChange={(event) => setOras(event.target.value)}
        placeholder="Oraș"
        aria-label="Oraș"
        required
      />
      <input
        type="text"
        value={tara}
        onChange={(event) => setTara(event.target.value)}
        placeholder="Țară"
        aria-label="Țară"
        required
      />
      <input
        type="number"
        value={zile}
        onChange={(event) => setZile(event.target.value)}
        placeholder="Zile"
        aria-label="Număr de zile"
        min="1"
        step="1"
        required
      />
      <button type="submit">Adaugă</button>
    </form>
  )
}
