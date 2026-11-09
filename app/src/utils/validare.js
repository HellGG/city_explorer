export function valideaza(valori) {
  const erori = {}
  const zile = Number(valori.zile)

  if (valori.oras.trim().length < 2) {
    erori.oras = 'Orașul are cel puțin două caractere.'
  }
  if (!valori.tara.trim()) {
    erori.tara = 'Țara este obligatorie.'
  }
  if (!Number.isInteger(zile) || zile < 1 || zile > 30) {
    erori.zile = 'Numărul de zile este între 1 și 30.'
  }

  return erori
}
