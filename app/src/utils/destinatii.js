// Ex. 1b - Funcții de prelucrare

// Listă cu numele orașelor
export const getOrase = (list) => list.map((d) => d.oras)

// Destinațiile cu vizitat: false
export const getNevizitate = (list) => list.filter((d) => !d.vizitat)

// Suma zilelor
export const totalZile = (list) =>
  list.reduce((total, d) => total + d.zile, 0)

// Un rând de text pentru o singură destinație
export const formatDestinatie = ({ oras, tara, zile, vizitat }) =>
  `${vizitat ? '[x]' : '[ ]'} ${oras}, ${tara} (${zile} zile)`

// Obiect cu numărul de destinații din fiecare țară
export const numarPeTara = (list) =>
  list.reduce((acc, { tara }) =>
    ({ ...acc, [tara]: (acc[tara] ?? 0) + 1 }), {})

// Lista ordonată descrescător după zile (pe o copie, să nu modificăm originalul)
export const sortDupaZile = (list) =>
  [...list].sort((a, b) => b.zile - a.zile)

// Ex. 2 - Modificarea listei fără a o strica

// Lista în care destinația cu id-ul dat are vizitat inversat
export const marcheazaVizitat = (list, id) =>
  list.map((d) =>
    d.id === id
      ? { ...d, vizitat: !d.vizitat }
      : d,
  )

// Lista cu o destinație nouă la final
export const adaugaDestinatie = (list, d) => [...list, d]

// Lista fără destinația cu id-ul dat
export const stergeDestinatie = (list, id) => list.filter((d) => d.id !== id)
