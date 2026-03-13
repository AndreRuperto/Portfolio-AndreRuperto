import { Resend } from "resend";
import * as cheerio from "cheerio";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.TRENDING_EMAIL || "andreruperto@gmail.com";
const FROM_EMAIL = process.env.TRENDING_FROM_EMAIL || "GitHub Trending <contato@andreruperto.dev>";

const period = process.argv[2] || "daily"; // "daily" or "weekly"
const since = period === "weekly" ? "weekly" : "daily";

async function fetchTrending(language = "") {
  const langPath = language ? `/${encodeURIComponent(language)}` : "";
  const url = `https://github.com/trending${langPath}?since=${since}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch trending: ${res.status}`);
  return res.text();
}

function parseTrending(html) {
  const $ = cheerio.load(html);
  const repos = [];

  $("article.Box-row").each((i, el) => {
    const $el = $(el);
    const repoLink = $el.find("h2 a").attr("href")?.trim();
    if (!repoLink) return;

    const fullName = repoLink.replace(/^\//, "").replace(/\s+/g, "");
    const description = $el.find("p").first().text().trim() || "";
    const language =
      $el.find('[itemprop="programmingLanguage"]').text().trim() || "";

    const starsText = $el
      .find('a[href$="/stargazers"]')
      .first()
      .text()
      .trim()
      .replace(/,/g, "");
    const totalStars = parseInt(starsText, 10) || 0;

    const forksText = $el
      .find('a[href$="/forks"]')
      .first()
      .text()
      .trim()
      .replace(/,/g, "");
    const totalForks = parseInt(forksText, 10) || 0;

    const starsToday =
      $el
        .find("span.d-inline-block.float-sm-right")
        .text()
        .trim()
        .match(/([\d,]+)\s+stars/)?.[1]
        ?.replace(/,/g, "") || "0";

    repos.push({
      fullName,
      url: `https://github.com${repoLink.trim()}`,
      description,
      language,
      totalStars,
      totalForks,
      starsGained: parseInt(starsToday, 10) || 0,
    });
  });

  return repos;
}

function formatNumber(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function buildEmailHtml(repos, periodLabel) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Sao_Paulo",
  });

  const repoRows = repos
    .slice(0, 25)
    .map(
      (repo, i) => `
    <tr style="border-bottom: 1px solid #e1e4e8;">
      <td style="padding: 16px 12px; vertical-align: top; color: #586069; font-size: 14px; width: 30px;">
        ${i + 1}.
      </td>
      <td style="padding: 16px 12px;">
        <a href="${repo.url}" style="color: #0366d6; font-weight: 600; font-size: 16px; text-decoration: none;">
          ${repo.fullName}
        </a>
        ${repo.description ? `<p style="color: #586069; margin: 6px 0 8px; font-size: 14px; line-height: 1.5;">${escapeHtml(repo.description)}</p>` : ""}
        <div style="display: flex; gap: 16px; font-size: 12px; color: #586069;">
          ${repo.language ? `<span>📦 ${escapeHtml(repo.language)}</span>` : ""}
          <span>⭐ ${formatNumber(repo.totalStars)}</span>
          <span>🍴 ${formatNumber(repo.totalForks)}</span>
          ${repo.starsGained > 0 ? `<span style="color: #e36209; font-weight: 600;">🔥 +${formatNumber(repo.starsGained)} ${since === "weekly" ? "this week" : "today"}</span>` : ""}
        </div>
      </td>
    </tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f6f8fa; margin: 0; padding: 0;">
  <div style="max-width: 680px; margin: 0 auto; padding: 32px 16px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px 12px 0 0; padding: 32px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 24px;">🚀 GitHub Trending — ${periodLabel}</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">${dateStr}</p>
    </div>
    <div style="background: #fff; border-radius: 0 0 12px 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <table style="width: 100%; border-collapse: collapse;">
        ${repoRows}
      </table>
      <div style="padding: 20px; text-align: center; border-top: 1px solid #e1e4e8;">
        <a href="https://github.com/trending?since=${since}" style="color: #0366d6; font-size: 14px; text-decoration: none;">
          Ver todos no GitHub →
        </a>
      </div>
    </div>
    <p style="text-align: center; color: #959da5; font-size: 12px; margin-top: 24px;">
      Enviado automaticamente via GitHub Actions • André Ruperto Portfolio
    </p>
  </div>
</body>
</html>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is required");
    process.exit(1);
  }

  const periodLabel = period === "weekly" ? "Top da Semana" : "Destaques do Dia";
  console.log(`Fetching GitHub trending (${since})...`);

  const html = await fetchTrending();
  const repos = parseTrending(html);

  if (repos.length === 0) {
    console.error("No trending repos found — page structure may have changed");
    process.exit(1);
  }

  console.log(`Found ${repos.length} trending repos`);

  const resend = new Resend(RESEND_API_KEY);
  const subject =
    period === "weekly"
      ? `🏆 GitHub Trending — Top da Semana`
      : `🚀 GitHub Trending — ${new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "America/Sao_Paulo" })}`;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    subject,
    html: buildEmailHtml(repos, periodLabel),
  });

  if (error) {
    console.error("Failed to send email:", error);
    process.exit(1);
  }

  console.log(`Email sent successfully! ID: ${data.id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
