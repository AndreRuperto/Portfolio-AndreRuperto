// O Puppeteer baixa o Chrome no `npm install`. Por padrão ele vai para ~/.cache/puppeteer, que o build do
// Railway (Railpack) não leva para a imagem final: em produção o screenshot falhava com "Could not find Chrome".
// Guardando dentro de backend/, o Chrome vai junto com o app.
const { join } = require('path');

module.exports = {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
