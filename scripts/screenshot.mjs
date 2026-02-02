import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");
const screenshotsDir = path.resolve(__dirname, "../src/assets/screenshots");

const sites = [
  { url: "https://bluemais.up.railway.app/", name: "site-bluemais.png" },
  { url: "https://advocaciaruperto.up.railway.app/", name: "site-advocaciaruperto.png" },
];

async function slowScroll(page) {
  // Faz múltiplas passagens para garantir que tudo carregou
  for (let pass = 0; pass < 2; pass++) {
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const step = 300;
    let currentPosition = 0;

    while (currentPosition < scrollHeight) {
      currentPosition += step;
      await page.evaluate((y) => window.scrollTo(0, y), currentPosition);
      await new Promise((r) => setTimeout(r, 1000));
      await page.waitForNetworkIdle({ idleTime: 500, timeout: 5000 }).catch(() => {});
    }

    // Espera extra no final para iframes (Google Maps) carregarem
    await new Promise((r) => setTimeout(r, 5000));
    await page.waitForNetworkIdle({ idleTime: 1000, timeout: 10000 }).catch(() => {});
    console.log(`  Pass ${pass + 1} complete (scrollHeight: ${scrollHeight})`);
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const site of sites) {
    console.log(`Capturando: ${site.url}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    // Navegar e esperar tudo carregar
    await page.goto(site.url, { waitUntil: "networkidle0", timeout: 60000 });

    // Espera inicial generosa para hero/animações
    await new Promise((r) => setTimeout(r, 5000));

    // Scroll lento com 2 passagens
    await slowScroll(page);

    // Espera final para renderizar tudo
    await new Promise((r) => setTimeout(r, 5000));

    // Volta ao topo
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 2000));

    // Salva em ambos os diretórios
    const publicOutput = path.join(publicDir, site.name);
    const screenshotsOutput = path.join(screenshotsDir, site.name);

    await page.screenshot({ path: publicOutput, fullPage: true });
    await page.screenshot({ path: screenshotsOutput, fullPage: true });
    console.log(`Salvo: ${publicOutput}`);
    console.log(`Salvo: ${screenshotsOutput}`);
    await page.close();
  }

  await browser.close();
  console.log("Pronto!");
})();
