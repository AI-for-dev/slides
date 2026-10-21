// Sert dist/ sous /slides/, comme GitHub Pages, pour essayer en local ce que le
// serveur de dev ne montre pas : les liens entre decks et le bouton de langue.
// `npm run dev:*` ne sert qu'un deck, toutes ses adresses y ramènent.
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'

const PREFIX = '/slides/'
const ROOT = join(process.cwd(), 'dist')
const PORT = Number(process.env.PORT ?? 4173)
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
}

createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  if (url === '/' || !url.startsWith(PREFIX)) {
    res.writeHead(302, { Location: PREFIX }).end()
    return
  }
  let file = normalize(join(ROOT, url.slice(PREFIX.length)))
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end()
    return
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  // Comme GitHub Pages : une adresse inconnue reçoit le 404.html de la racine.
  const status = existsSync(file) ? 200 : 404
  if (status === 404) file = join(ROOT, '404.html')
  res.writeHead(status, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(res)
}).listen(PORT, () => console.log(`Site complet sur http://localhost:${PORT}${PREFIX}`))
