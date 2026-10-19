import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// ===== Laboratorul 2 =====
console.log('L2 Merge!')

import { orase } from './data/orase.js'
console.log(orase.length) // 4

import { getScumpe, costTotal, formatOras, costPeTara, scadePret } from './utils/orase.js'
const scumpe = getScumpe(orase)
console.log('scumpe:', scumpe.length)
console.log('cost total:', costTotal(scumpe), 'euro')
console.log(orase.map(formatOras).join('\n'))
console.log('pe țară:', costPeTara(orase))

const reduse = scadePret(orase, 1, 40)
console.log('lista nouă:', reduse[0].pret)
console.log('lista originală:', orase[0].pret)
console.log('element refolosit:', orase[1] === reduse[1])

// ----- Exercițiul 1 - Datele și funcțiile de prelucrare -----
import { destinatii } from './data/destinatii.js'
import {
  getOrase, getNevizitate, totalZile, formatDestinatie, numarPeTara, sortDupaZile,
  marcheazaVizitat, adaugaDestinatie, stergeDestinatie,
} from './utils/destinatii.js'

console.log('L2 Ex. 1 - orașe:', getOrase(destinatii))
console.log('L2 Ex. 1 - nevizitate:', getNevizitate(destinatii).length)
console.log('L2 Ex. 1 - zile de vizitat:', totalZile(getNevizitate(destinatii)))
console.log(destinatii.map(formatDestinatie).join('\n'))
console.log('L2 Ex. 1 - pe țară:', numarPeTara(destinatii))
console.log('L2 Ex. 1 - cea mai lungă vizită:', sortDupaZile(destinatii)[0].oras)

// ----- Exercițiul 2 - Modificarea listei fără a o strica -----
const dupaMarcare = marcheazaVizitat(destinatii, '1')
console.log('L2 Ex. 2 - original:', destinatii[0].vizitat, '| listă nouă:', dupaMarcare[0].vizitat)
console.log('L2 Ex. 2 - element refolosit:', destinatii[1] === dupaMarcare[1])

const noua = { id: '7', oras: 'Sevilla', tara: 'Spania', zile: 3, vizitat: false }
const dupaAdaugare = adaugaDestinatie(destinatii, noua)
console.log('L2 Ex. 2 - după adăugare: original', destinatii.length, ', listă nouă', dupaAdaugare.length)

const dupaStergere = stergeDestinatie(dupaAdaugare, '7')
console.log('L2 Ex. 2 - după ștergere:', dupaStergere.length)

// ----- Exercițiul 3 - Date de la un API public -----
import { fetchUsers, fetchUserById } from './api/orase.js'

async function loadOrase() {
  try {
    const users = await fetchUsers()
    console.log('L2 Ex. 3 - am primit', users.length, 'utilizatori')

    const oraseUsers = users.map((user) => user.address.city)
    console.log('L2 Ex. 3 - orașe:', oraseUsers)

    const numeLungi = oraseUsers.filter((o) => o.length > 10)
    console.log('L2 Ex. 3 - nume mai lungi de 10 caractere:', numeLungi.length)

    const user1 = await fetchUserById(1)
    console.log('L2 Ex. 3 - orașul utilizatorului 1:', user1.address.city)
  } catch (error) {
    console.error('L2 Ex. 3 - nu am putut încărca datele:', error.message)
  }
}

loadOrase()
