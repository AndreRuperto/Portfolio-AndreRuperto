// scripts/copy-images.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '../src/assets');
const destDir = path.join(__dirname, '../public');

// Cria a pasta public/assets se não existir
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Lista de imagens para copiar
const images = [
  'site-bluemais.png',
  'site-advocaciaruperto.png'
];

images.forEach(image => {
  const src = path.join(srcDir, image);
  const dest = path.join(destDir, image);
  
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copiado: ${image}`);
  } else {
    console.log(`✗ Não encontrado: ${image}`);
  }
});

console.log('\n✓ Imagens copiadas para public/assets/\n');