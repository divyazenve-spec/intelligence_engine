const { spawn } = require('child_process');
const http = require('http');
const crypto = require('crypto');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9462',
  '--window-size=1400,900',
  '--disable-extensions',
  'http://localhost:3001/#executive-dashboard'
]);

function createCDPSession(wsUrl) {
  return new Promise((resolve) => {
    const url = new URL(wsUrl);
    const key = crypto.randomBytes(16).toString('base64');
    const req = http.request({
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      headers: {
        'Connection': 'Upgrade',
        'Upgrade': 'websocket',
        'Sec-WebSocket-Key': key,
        'Sec-WebSocket-Version': 13
      }
    });

    req.on('upgrade', (res, socket) => {
      let nextId = 1;
      const pending = new Map();
      let buf = Buffer.alloc(0);

      socket.on('data', chunk => {
        buf = Buffer.concat([buf, chunk]);
        while (buf.length >= 2) {
          const secondByte = buf[1];
          const payloadLen = secondByte & 0x7f;
          let offset = 2;
          if (payloadLen === 126) offset += 2;
          else if (payloadLen === 127) offset += 8;
          let actualLen = payloadLen;
          if (payloadLen === 126) actualLen = buf.readUInt16BE(2);
          else if (payloadLen === 127) actualLen = Number(buf.readBigUInt64BE(2));
          if (buf.length < offset + actualLen) break;
          const payload = buf.subarray(offset, offset + actualLen);
          buf = buf.subarray(offset + actualLen);
          const msg = JSON.parse(payload.toString('utf8'));
          if (msg.id && pending.has(msg.id)) {
            const cb = pending.get(msg.id);
            pending.delete(msg.id);
            cb(msg);
          }
        }
      });

      function send(method, params = {}) {
        return new Promise((res) => {
          const id = nextId++;
          pending.set(id, res);
          const payload = JSON.stringify({ id, method, params });
          const len = Buffer.byteLength(payload);
          const header = Buffer.alloc(len > 125 ? 4 : 2);
          header[0] = 0x81;
          if (len <= 125) {
            header[1] = 0x80 | len;
          } else {
            header[1] = 0x80 | 126;
            header.writeUInt16BE(len, 2);
          }
          const mask = crypto.randomBytes(4);
          const masked = Buffer.alloc(len);
          const pBuf = Buffer.from(payload);
          for (let i = 0; i < len; i++) masked[i] = pBuf[i] ^ mask[i % 4];
          socket.write(Buffer.concat([header, mask, masked]));
        });
      }

      resolve({ send, close: () => socket.destroy() });
    });
    req.end();
  });
}

setTimeout(async () => {
  try {
    const listRes = await new Promise(r => {
      http.get('http://127.0.0.1:9462/json', res => {
        let d = ''; res.on('data', c => d += c); res.on('end', () => r(JSON.parse(d)));
      });
    });
    const page = listRes.find(t => t.type === 'page');
    const cdp = await createCDPSession(page.webSocketDebuggerUrl);
    await new Promise(r => setTimeout(r, 2000));

    const routesToTest = [
      // Executive (4)
      { name: 'Executive Dashboard', hash: '#executive-dashboard', rootSel: '#zexec-root', bodySel: '.zexec-body', titleSel: '.zexec-title' },
      { name: 'CEO Control Center', hash: '#ceo-control-center', rootSel: '#zexec-root', bodySel: '.zexec-body', titleSel: '.zexec-title' },
      { name: 'Business Overview', hash: '#business-overview', rootSel: '#zexec-root', bodySel: '.zexec-body', titleSel: '.zexec-title' },
      { name: 'KPI Dashboard', hash: '#kpi-dashboard', rootSel: '#zexec-root', bodySel: '.zexec-body', titleSel: '.zexec-title' },
      // AI Assistant (11)
      { name: 'Ask Zenve AI', hash: '#ask-zenve-ai', rootSel: '#zai-root', bodySel: '.zai-body', titleSel: '.zai-title' },
      { name: 'Business Insights', hash: '#business-insights', rootSel: '#zai-root', bodySel: '.zai-body', titleSel: '.zai-title' },
      { name: 'Revenue Intelligence', hash: '#revenue-intelligence', rootSel: '#zai-root', bodySel: '.zai-body', titleSel: '.zai-title' },
      { name: 'Sales Forecast (AI)', hash: '#ai-sales-forecast', rootSel: '#zai-root', bodySel: '.zai-body', titleSel: '.zai-title' },
      { name: 'Demand Forecast', hash: '#demand-forecast', rootSel: '#zai-root', bodySel: '.zai-body', titleSel: '.zai-title' },
      { name: 'Inventory Prediction', hash: '#inventory-prediction', rootSel: '#zai-root', bodySel: '.zai-body', titleSel: '.zai-title' },
      { name: 'Customer Prediction', hash: '#customer-prediction', rootSel: '#zai-root', bodySel: '.zai-body', titleSel: '.zai-title' },
      { name: 'Churn Prediction', hash: '#churn-prediction', rootSel: '#zai-root', bodySel: '.zai-body', titleSel: '.zai-title' },
      { name: 'Profit Prediction', hash: '#profit-prediction', rootSel: '#zai-root', bodySel: '.zai-body', titleSel: '.zai-title' },
      { name: 'Anomaly Detection', hash: '#anomaly-detection', rootSel: '#zai-root', bodySel: '.zai-body', titleSel: '.zai-title' },
      { name: 'AI Recommendations', hash: '#ai-recommendations', rootSel: '#zai-root', bodySel: '.zai-body', titleSel: '.zai-title' }
    ];

    console.log('--- STARTING VERIFICATION FOR 15 SUBDOMAINS ---');
    let allPassed = true;

    for (const r of routesToTest) {
      await cdp.send('Runtime.evaluate', {
        expression: `window.location.hash = '${r.hash}'`
      });
      await new Promise(res => setTimeout(res, 600));

      const evalRes = await cdp.send('Runtime.evaluate', {
        expression: `(() => {
          const root = document.querySelector('${r.rootSel}');
          if (!root) return { error: 'root not found' };
          const rStyle = window.getComputedStyle(root);
          const rRect = root.getBoundingClientRect();
          const body = root.querySelector('${r.bodySel}');
          const bRect = body ? body.getBoundingClientRect() : null;
          const bStyle = body ? window.getComputedStyle(body) : null;
          const title = root.querySelector('${r.titleSel}');
          const tStyle = title ? window.getComputedStyle(title) : null;

          return {
            rootDisplay: rStyle.display,
            rootX: Math.round(rRect.x),
            rootW: Math.round(rRect.width),
            rootH: Math.round(rRect.height),
            bodyX: bRect ? Math.round(bRect.x) : null,
            bodyW: bRect ? Math.round(bRect.width) : null,
            bodyMarginLeft: bStyle ? bStyle.marginLeft : null,
            bodyPaddingLeft: bStyle ? bStyle.paddingLeft : null,
            titleColor: tStyle ? tStyle.color : null,
            titleText: title ? title.textContent : null,
            overflowY: rStyle.overflowY,
            canScroll: root.scrollHeight >= root.clientHeight
          };
        })()`,
        returnByValue: true
      });

      const data = evalRes.result?.result?.value;
      if (!data || data.error) {
        console.error(`❌ [FAIL] ${r.name} (${r.hash}):`, data);
        allPassed = false;
        continue;
      }

      const passX = data.rootX === 224 && data.bodyX === 224;
      const passMargin = data.bodyMarginLeft === '0px';
      const passDisplay = data.rootDisplay === 'block';
      const passColor = data.titleColor === 'rgb(15, 23, 42)';

      if (passX && passMargin && passDisplay && passColor) {
        console.log(`✅ [PASS] ${r.name.padEnd(24)} | rootX: ${data.rootX} | bodyX: ${data.bodyX} | margin-left: ${data.bodyMarginLeft} | color: ${data.titleColor} | title: "${data.titleText}"`);
      } else {
        console.error(`❌ [FAIL] ${r.name.padEnd(24)} | Details:`, data);
        allPassed = false;
      }
    }

    console.log('--------------------------------------------------');
    console.log(allPassed ? '🎉 ALL 15 SUBDOMAINS PASSED WITH PERFECT METRICS!' : '⚠️ SOME TESTS FAILED');

    cdp.close();
    chrome.kill();
  } catch (e) {
    console.error('Test execution error:', e);
    chrome.kill();
  }
}, 1500);
