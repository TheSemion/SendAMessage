// Підключення до WebSocket-сервера
const socket = new WebSocket('ws://localhost:3000');

// Коли з'єднання встановлено
socket.onopen = () => {
  console.log('Підключення до сервера встановлено');
};

// Отримання повідомлень від сервера
socket.onmessage = (event) => {
  // Додаємо нове повідомлення до області чату
  const messagesDiv = document.getElementById('messages');
  const newMessage = document.createElement('div');
  newMessage.textContent = event.data;
  messagesDiv.appendChild(newMessage);
};

// Обробка натискання кнопки "Надіслати"
document.getElementById('sendBtn').addEventListener('click', () => {
  const message = document.getElementById('input').value;
  if (message) {
    socket.send(message); // Відправляємо повідомлення на сервер
    document.getElementById('input').value = ''; // Очищаємо поле вводу
  }
});