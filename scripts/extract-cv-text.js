const fs = require('fs')
const path = require('path')
const pdfPath = path.join(process.cwd(), 'public', 'Abderrahmane Er-Raqabi Cv anglais .pdf')

function dumpMatches(buffer, encodings = ['utf8', 'latin1', 'ascii']) {
  const keywords = ['Bois', 'Bois de Boulogne', 'Polytechnique', 'Polytechnique Montréal', 'College', 'Collège', 'Natural', 'Science', 'Sciences']
  for (const enc of encodings) {
    try {
      const text = buffer.toString(enc)
      const found = keywords.filter(k => text.includes(k))
      if (found.length) {
        console.log(`---Matches using ${enc}---`)
        for (const k of found) {
          const idx = text.indexOf(k)
          const snippet = text.slice(Math.max(0, idx - 60), idx + 120).replace(/\n/g, ' ')
          console.log(`${k}: ...${snippet}...`)
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

try {
  const dataBuffer = fs.readFileSync(pdfPath)
  dumpMatches(dataBuffer)
  console.log('If no matches shown, the PDF may be binary-only; please provide the CV text or allow me to open it in a preview.')
} catch (err) {
  console.error('Error reading PDF file:', err.message)
  process.exit(1)
}
