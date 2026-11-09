const API_URL = 'http://localhost:3001'

async function verificaRaspuns(response) {
  if (!response.ok) {
    throw new Error(`Serverul a răspuns cu ${response.status}`)
  }

  return response.json()
}

export async function getDestinatii(pagina) {
  const url =
    pagina === undefined
      ? `${API_URL}/destinatii`
      : `${API_URL}/destinatii?_page=${pagina}&_per_page=20`
  const response = await fetch(url)

  return verificaRaspuns(response)
}

export async function postDestinatie(destinatie) {
  const response = await fetch(`${API_URL}/destinatii`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(destinatie),
  })

  return verificaRaspuns(response)
}

export async function patchVizitat(id, vizitat) {
  const response = await fetch(`${API_URL}/destinatii/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vizitat }),
  })

  return verificaRaspuns(response)
}
