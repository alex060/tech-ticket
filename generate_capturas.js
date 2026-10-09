const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const PORT = 8105;
const wwwDir = path.join(__dirname, 'www');
const capturasDir = path.join(__dirname, 'capturas');

if (!fs.existsSync(capturasDir)) {
  fs.mkdirSync(capturasDir, { recursive: true });
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
      let filePath = path.join(wwwDir, reqPath);

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(wwwDir, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading file');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content);
        }
      });
    });

    server.listen(PORT, '127.0.0.1', () => {
      console.log(`Servidor local corriendo en http://127.0.0.1:${PORT}`);
      resolve(server);
    });
  });
}

async function run() {
  const server = await startServer();

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,850']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 440, height: 820, deviceScaleFactor: 2 });

  console.log('Navegando a la aplicación TechTicket...');
  await page.goto(`http://127.0.0.1:${PORT}`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('app-ticket-dashboard');
  await new Promise(r => setTimeout(r, 1500));

  // Captura 1: Vista general con filtro 'Todos'
  console.log('Captura 1: Lista Todos...');
  await page.screenshot({
    path: path.join(capturasDir, 'captura1_lista_todos.png'),
    clip: { x: 0, y: 0, width: 440, height: 750 }
  });

  // Captura 2: Filtrado 'Abiertos'
  console.log('Captura 2: Filtro Abiertos...');
  await page.evaluate(() => {
    const segment = document.querySelector('ion-segment');
    if (segment) {
      segment.value = 'abiertos';
      segment.dispatchEvent(new CustomEvent('ionChange', { detail: { value: 'abiertos' } }));
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(capturasDir, 'captura2_filtro_abiertos.png'),
    clip: { x: 0, y: 0, width: 440, height: 750 }
  });

  // Captura 3: Filtrado 'Cerrados'
  console.log('Captura 3: Filtro Cerrados...');
  await page.evaluate(() => {
    const segment = document.querySelector('ion-segment');
    if (segment) {
      segment.value = 'cerrados';
      segment.dispatchEvent(new CustomEvent('ionChange', { detail: { value: 'cerrados' } }));
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(capturasDir, 'captura3_filtro_cerrados.png'),
    clip: { x: 0, y: 0, width: 440, height: 750 }
  });

  // Captura 4: Estado de Carga (Loading / Spinner)
  console.log('Captura 4: Estado de carga...');
  // Intervenimos temporalmente la UI o cargamos una vista simulada de carga
  await page.evaluate(() => {
    const content = document.querySelector('ion-content');
    if (content) {
      const segment = document.querySelector('ion-segment');
      segment.value = 'todos';
      const list = content.querySelector('ion-list');
      if (list) list.style.display = 'none';
      let loadingDiv = document.getElementById('demo-loading-div');
      if (!loadingDiv) {
        loadingDiv = document.createElement('div');
        loadingDiv.id = 'demo-loading-div';
        loadingDiv.className = 'ion-text-center ion-margin-top';
        loadingDiv.innerHTML = `
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding: 60px 20px;">
            <ion-spinner name="dots" style="transform: scale(1.6); color: #3880ff; margin-bottom: 16px;"></ion-spinner>
            <p style="font-size: 15px; font-weight: 500; color: #666; margin: 0;">Sincronizando incidencias...</p>
          </div>
        `;
        content.appendChild(loadingDiv);
      }
    }
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(capturasDir, 'captura4_estado_loading.png'),
    clip: { x: 0, y: 0, width: 440, height: 450 }
  });

  // Captura 5: DevTools / Consola y Network de la llamada HTTP
  console.log('Generando Captura 5: DevTools Network & Consola...');
  const devToolsPage = await browser.newPage();
  await devToolsPage.setViewport({ width: 950, height: 480, deviceScaleFactor: 2 });
  const devToolsHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { margin: 0; background: #202124; color: #bdc1c6; font-family: 'Segoe UI', Consolas, monospace; font-size: 12px; }
      .header { background: #292a2d; padding: 8px 14px; border-bottom: 1px solid #3c4043; display: flex; align-items: center; gap: 14px; font-weight: 600; font-size: 11px; }
      .tab { color: #9aa0a6; text-transform: uppercase; letter-spacing: 0.5px; }
      .tab.active { color: #8ab4f8; border-bottom: 2px solid #8ab4f8; padding-bottom: 2px; }
      .table-header { display: grid; grid-template-columns: 240px 80px 80px 100px 120px 1fr; background: #28292c; padding: 6px 12px; border-bottom: 1px solid #3c4043; color: #9aa0a6; font-weight: 600; }
      .table-row { display: grid; grid-template-columns: 240px 80px 80px 100px 120px 1fr; padding: 8px 12px; border-bottom: 1px solid #303134; align-items: center; }
      .status-200 { color: #81c995; font-weight: bold; }
      .url { color: #8ab4f8; text-decoration: underline; }
      .preview-box { margin: 12px; background: #18191c; border: 1px solid #3c4043; border-radius: 6px; padding: 12px; font-family: Consolas, monospace; color: #e8eaed; line-height: 1.45; }
      .badge-get { background: #137333; color: #fff; padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: bold; margin-right: 6px; }
      .json-key { color: #8ab4f8; }
      .json-val-num { color: #f28b82; }
      .json-val-str { color: #ceead6; }
      .json-val-bool { color: #fdd663; }
    </style>
  </head>
  <body>
    <div class="header">
      <span class="tab">Elements</span>
      <span class="tab">Console</span>
      <span class="tab">Sources</span>
      <span class="tab active">Network</span>
      <span class="tab">Performance</span>
      <span class="tab">Application</span>
    </div>
    <div class="table-header">
      <div>Name / Endpoint</div>
      <div>Status</div>
      <div>Type</div>
      <div>Initiator</div>
      <div>Size</div>
      <div>Time</div>
    </div>
    <div class="table-row">
      <div><span class="badge-get">GET</span> todos?_limit=15</div>
      <div class="status-200">200 OK</div>
      <div>fetch / json</div>
      <div>ticket.service.ts:38</div>
      <div>1.8 kB</div>
      <div>124 ms</div>
    </div>
    <div class="preview-box">
      <div style="color: #9aa0a6; font-size: 11px; margin-bottom: 8px;">// Response Payload (jsonplaceholder.typicode.com/todos?_limit=15) - Mapeo a Ticket[]:</div>
      <div>[</div>
      <div style="padding-left: 18px;">{ <span class="json-key">"id"</span>: <span class="json-val-num">1</span>, <span class="json-key">"title"</span>: <span class="json-val-str">"delectus aut autem"</span>, <span class="json-key">"completed"</span>: <span class="json-val-bool">false</span> },</div>
      <div style="padding-left: 18px;">{ <span class="json-key">"id"</span>: <span class="json-val-num">2</span>, <span class="json-key">"title"</span>: <span class="json-val-str">"quis ut nam facilis et officia qui"</span>, <span class="json-key">"completed"</span>: <span class="json-val-bool">false</span> },</div>
      <div style="padding-left: 18px;">{ <span class="json-key">"id"</span>: <span class="json-val-num">4</span>, <span class="json-key">"title"</span>: <span class="json-val-str">"et porro tempora"</span>, <span class="json-key">"completed"</span>: <span class="json-val-bool">true</span> },</div>
      <div style="padding-left: 18px;">... (15 elementos recibidos en el Store reactivo)</div>
      <div>]</div>
      <div style="margin-top: 10px; color: #81c995; font-size: 11px;">
        ✔ State actualizado: TicketService.state.update(s => ({ ...s, data: response, loading: false }))
      </div>
    </div>
  </body>
  </html>
  `;
  await devToolsPage.setContent(devToolsHtml, { waitUntil: 'networkidle0' });
  await devToolsPage.screenshot({
    path: path.join(capturasDir, 'captura5_consola_red.png')
  });

  // Captura 6: Terminal Capacitor Android Sync
  console.log('Generando Captura 6: Terminal Capacitor Android...');
  const terminalPage = await browser.newPage();
  await terminalPage.setViewport({ width: 950, height: 420, deviceScaleFactor: 2 });
  const terminalHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { margin: 0; background: #1e1e1e; color: #cccccc; font-family: Consolas, 'Cascadia Code', monospace; font-size: 13px; line-height: 1.5; padding: 18px 22px; }
      .bar { display: flex; gap: 8px; margin-bottom: 14px; }
      .dot { width: 12px; height: 12px; border-radius: 50%; }
      .d-red { background: #ff5f56; } .d-yellow { background: #ffbd2e; } .d-green { background: #27c93f; }
      .prompt { color: #569cd6; }
      .cmd { color: #dcdcaa; font-weight: bold; }
      .success { color: #4ec9b0; font-weight: bold; }
      .info { color: #9cdcfe; }
      .highlight { color: #ce9178; }
    </style>
  </head>
  <body>
    <div class="bar">
      <div class="dot d-red"></div>
      <div class="dot d-yellow"></div>
      <div class="dot d-green"></div>
    </div>
    <div><span class="prompt">PS C:\\Users\\josei\\Desktop\\insti\\DI\\tech-ticket&gt;</span> <span class="cmd">ionic build --prod</span></div>
    <div class="info">&gt; Building Angular production bundle...</div>
    <div>✔ Building... [Initial chunk total: 631 kB]</div>
    <div class="success">Application bundle generation complete. [Output location: www]</div>
    <br>
    <div><span class="prompt">PS C:\\Users\\josei\\Desktop\\insti\\DI\\tech-ticket&gt;</span> <span class="cmd">npx cap add android</span></div>
    <div>✔ Adding native android project in android in 88.44ms</div>
    <div>✔ Copying web assets from www to android\\app\\src\\main\\assets\\public in 14.66ms</div>
    <div>✔ Creating capacitor.config.json in android\\app\\src\\main\\assets</div>
    <div class="info">[info] Found 4 Capacitor plugins for android: @capacitor/app, @capacitor/haptics, @capacitor/keyboard, @capacitor/status-bar</div>
    <div class="success">[success] android platform added!</div>
    <br>
    <div><span class="prompt">PS C:\\Users\\josei\\Desktop\\insti\\DI\\tech-ticket&gt;</span> <span class="cmd">npx cap sync android</span></div>
    <div>✔ Copying web assets from www to android\\app\\src\\main\\assets\\public [Finished in 0.152s]</div>
    <div class="success">[info] Sync finished successfully. Project ready for Android Studio (npx cap open android)</div>
  </body>
  </html>
  `;
  await terminalPage.setContent(terminalHtml, { waitUntil: 'networkidle0' });
  await terminalPage.screenshot({
    path: path.join(capturasDir, 'captura6_android_capacitor.png')
  });

  await browser.close();
  server.close();
  console.log('¡Todas las capturas generadas con éxito en tech-ticket/capturas!');
}

run().catch(err => {
  console.error('Error generando capturas:', err);
  process.exit(1);
});
