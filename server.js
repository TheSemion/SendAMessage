const WebSocket = require('ws');
const express = require('express');
const app = express();
const port = 3000;

// Статичні файли будуть знаходитися в папці 'public'
app.use(express.static('public'));

// Створення WebSocket-сервера
const wss = new WebSocket.Server({ noServer: true });

// Коли клієнт підключається
wss.on('connection', (ws) => {
  console.log('Клієнт підключений');

  // Отримання повідомлення від клієнта
  ws.on('message', (message) => {
    console.log('Отримано повідомлення:', message);

    // Надсилаємо повідомлення всім підключеним клієнтам
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Відправка привітального повідомлення новому клієнту
  ws.send('Привіт від сервера!');
});

// Обробка запитів на з'єднання WebSocket
app.server = app.listen(port, () => {
  console.log(`Сервер працює на http://localhost:${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
