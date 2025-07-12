const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

// Configuração de CORS para rotas HTTP (caso precise futuramente)
app.use(cors({
  origin: ["https://gothicandwave.site", "https://www.gothicandwave.site"],
  credentials: true,
  methods: ["GET", "POST"]
}));

const server = http.createServer(app);
const io = new Server(server, {
  path: '/chat/socket.io',
  cors: {
    origin: ["https://gothicandwave.site", "https://www.gothicandwave.site"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.get('/', (req, res) => {
  res.send('Chat backend online!');
});

let onlineCount = 0;

io.on('connection', (socket) => {
  onlineCount++;
  io.emit('online_count', onlineCount);

  socket.on('join', (data) => {
    // Apenas para garantir que o usuário entrou
  });

  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    onlineCount--;
    io.emit('online_count', onlineCount);
  });
});

server.listen(3010, () => {
  console.log('Servidor rodando na porta 3010');
}); 