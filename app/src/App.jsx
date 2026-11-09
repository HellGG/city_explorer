import { useEffect, useState } from 'react'
import { getDestinatii, patchVizitat, postDestinatie } from './api/destinatii.js'
import { getNevizitate, totalZile } from './utils/destinatii.js'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import Rezumat from './components/Rezumat.jsx'
import Cautare from './components/Cautare.jsx'
import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [eroareActiune, setEroareActiune] = useState(null)
  const [seTrimite, setSeTrimite] = useState(false)
  const [cautare, setCautare] = useState('')
  const [pagina, setPagina] = useState(1)
  const [totalPagini, setTotalPagini] = useState(1)

  useEffect(() => {
    let active = true

    async function incarca() {
      setIncarcare(true)
      setEroare(null)

      try {
        const raspuns = await getDestinatii(pagina)
        if (!active) return
        setDestinatii(raspuns.data)
        setTotalPagini(raspuns.pages)
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
  }, [pagina])

  async function handleToggle(id) {
    const destinatie = destinatii.find((element) => element.id === id)
    if (!destinatie) return

    setEroareActiune(null)
    try {
      const salvata = await patchVizitat(id, !destinatie.vizitat)
      setDestinatii((lista) =>
        lista.map((element) => (element.id === id ? salvata : element)),
      )
    } catch (error) {
      setEroareActiune(error.message)
    }
  }

  async function handleAdd(destinatie) {
    setSeTrimite(true)
    setEroareActiune(null)
    try {
      const salvata = await postDestinatie(destinatie)
      setDestinatii((curente) => [...curente, salvata])
      return true
    } catch (error) {
      setEroareActiune(error.message)
      return false
    } finally {
      setSeTrimite(false)
    }
  }

  const nevizitate = getNevizitate(destinatii)
  const textCautat = cautare.trim().toLowerCase()
  const afisate = destinatii.filter(
    (destinatie) =>
      destinatie.oras.toLowerCase().includes(textCautat) ||
      destinatie.tara.toLowerCase().includes(textCautat),
  )

  return (
    <main>
      <h1>City Explorer</h1>
      {incarcare && <p className="stare">Se încarcă destinațiile...</p>}
      {eroare && <p className="stare eroare">A apărut o eroare: {eroare}</p>}
      {!incarcare && !eroare && (
        <>
          <Rezumat
            total={destinatii.length}
            nevizitate={nevizitate.length}
            zile={totalZile(nevizitate)}
          />
          <FormularDestinatie onAdd={handleAdd} seTrimite={seTrimite} />
          {eroareActiune && (
            <p className="stare eroare" role="alert">
              Operația nu a reușit: {eroareActiune}
            </p>
          )}
          <Cautare valoare={cautare} onChange={setCautare} />
          {destinatii.length === 0 ? (
            <p className="gol">Nu există nicio destinație. Adaugă una folosind formularul.</p>
          ) : afisate.length === 0 ? (
            <p className="gol">Niciun rezultat pentru „{cautare.trim()}”.</p>
          ) : (
            <ListaDestinatii destinatii={afisate} onToggle={handleToggle} />
          )}
          <nav className="paginare" aria-label="Paginarea destinațiilor">
            <button
              type="button"
              onClick={() => setPagina((curenta) => Math.max(1, curenta - 1))}
              disabled={pagina <= 1}
            >
              Înapoi
            </button>
            <span>pagina {pagina} din {totalPagini}</span>
            <button
              type="button"
              onClick={() => setPagina((curenta) => Math.min(totalPagini, curenta + 1))}
              disabled={pagina >= totalPagini}
            >
              Înainte
            </button>
          </nav>
        </>
      )}
    </main>
  )
}
