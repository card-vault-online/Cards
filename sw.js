// Service worker Custom Cards: нужен, чтобы сайт можно было установить как приложение.
// Ничего не кэширует, кроме запасной страницы «нет интернета»: данные, карты и вход всегда берутся из сети.
const OFFLINE_HTML = '<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Custom Cards</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#09090b;color:#e4e4e7;font-family:system-ui,sans-serif;text-align:center;padding:24px}button{margin-top:16px;padding:10px 20px;border-radius:12px;border:0;background:#818cf8;color:#fff;font-size:16px}</style></head><body><div><h2>Нет подключения к интернету</h2><p>Проверьте сеть и попробуйте снова.</p><button onclick="location.reload()">Обновить</button></div></body></html>';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return; // всё остальное браузер грузит как обычно
  e.respondWith(
    fetch(e.request).catch(() => new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } }))
  );
});
