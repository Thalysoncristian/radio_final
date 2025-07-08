<template>
  <div class="chatbox" :class="{ minimized }">
    <div class="chatbox-header" @click="toggleMinimize">
      <span class="chatbox-icon">💬</span>
      <span class="chatbox-title">Chat</span>
      <span class="chatbox-online">{{ onlineCount }} online</span>
      <button class="chatbox-close" @click.stop="close">×</button>
    </div>
    <div v-if="!username" class="chatbox-login">
      <input v-model="nameInput" placeholder="Seu nome..." @keyup.enter="enterChat" maxlength="16" />
      <button @click="enterChat">Entrar</button>
    </div>
    <div v-else class="chatbox-body">
      <div class="chatbox-messages" ref="messagesEnd">
        <div v-for="(msg, idx) in messages" :key="idx" :class="{'my-message': msg.username === username}">
          <b>{{ msg.username }}:</b> {{ msg.text }}
        </div>
      </div>
      <div class="chatbox-input">
        <input v-model="message" placeholder="Digite sua mensagem..." @keyup.enter="sendMessage" maxlength="200" />
        <button @click="sendMessage">Enviar</button>
      </div>
      <button class="chatbox-logout" @click="logout">Trocar nome</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { io } from 'socket.io-client'

const emit = defineEmits(['close'])
const minimized = ref(false)
const username = ref('')
const nameInput = ref('')
const message = ref('')
const messages = ref([])
const onlineCount = ref(0)
const messagesEnd = ref(null)
let socket = null

function toggleMinimize() {
  minimized.value = !minimized.value
}
function close() {
  emit('close')
}
function enterChat() {
  if (!nameInput.value.trim()) return
  username.value = nameInput.value.trim()
  connectSocket()
}
function logout() {
  username.value = ''
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
function sendMessage() {
  if (!message.value.trim()) return
  if (socket) {
    socket.emit('send_message', { username: username.value, text: message.value })
    message.value = ''
  }
}
function connectSocket() {
  socket = io('wss://srv895506.hstgr.cloud/chat', {
    path: '/chat/socket.io'
  })
  socket.on('receive_message', (msg) => {
    messages.value.push(msg)
    scrollToBottom()
  })
  socket.on('online_count', (count) => {
    onlineCount.value = count
  })
  socket.emit('join', { username: username.value })
}
function scrollToBottom() {
  nextTick(() => {
    if (messagesEnd.value) {
      messagesEnd.value.scrollTop = messagesEnd.value.scrollHeight
    }
  })
}
onUnmounted(() => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
})
</script>

<style scoped>
.chatbox {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 64px;
  width: 100vw;
  min-height: calc(100vh - 64px);
  background: rgba(10,10,10,0.85);
  z-index: 3000;
  display: flex;
  flex-direction: column;
  font-family: 'Unbounded', 'Inter', Arial, sans-serif;
  color: #fff;
  border: none;
  box-shadow: none;
  border-radius: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.chatbox-header {
  display: flex;
  align-items: center;
  background: transparent;
  border-bottom: 1.5px solid #ffe06644;
  border-radius: 0;
  padding: 32px 18px 18px 18px;
  cursor: pointer;
  user-select: none;
  font-weight: 700;
  font-size: 1.18em;
  letter-spacing: 0.08em;
  color: #ffe066;
  text-shadow: 0 2px 8px #000, 0 0 8px #ffe06644;
}
.chatbox-icon {
  font-size: 1.4em;
  margin-right: 10px;
  color: #ffe066;
}
.chatbox-title {
  flex: 1;
  font-weight: 700;
  font-size: 1.08em;
  color: #ffe066;
}
.chatbox-online {
  font-size: 0.98em;
  color: #ffe066;
  margin-right: 10px;
  font-weight: 600;
}
.chatbox-close {
  background: none;
  border: none;
  color: #ffe066;
  font-size: 1.3em;
  cursor: pointer;
  margin-left: 4px;
  font-weight: 700;
  transition: color 0.18s;
}
.chatbox-close:hover {
  color: #fffbe6;
}
.chatbox-login {
  padding: 32px 18px 18px 18px;
  display: flex;
  gap: 10px;
}
.chatbox-login input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 2px solid #ffe06699;
  outline: none;
  font-size: 1.08em;
  background: #222;
  color: #fff;
  font-family: inherit;
  font-weight: 600;
  transition: border 0.18s;
}
.chatbox-login input:focus {
  border: 2px solid #ffe066;
}
.chatbox-login button {
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: #ffe066;
  color: #181716;
  font-weight: 700;
  font-size: 1.08em;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.chatbox-login button:hover {
  background: #fffbe6;
  color: #181716;
}
.chatbox-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 0;
}
.chatbox-messages {
  flex: 1;
  overflow-y: auto;
  padding: 18px 18px 8px 18px;
  font-size: 1.01em;
  background: transparent;
  border-radius: 0;
  font-family: 'Inter', Arial, sans-serif;
  color: #fff;
  letter-spacing: 0.02em;
  font-weight: 500;
}
.my-message {
  color: #ffe066;
  font-weight: 700;
}
.chatbox-messages b {
  color: #ffe066;
  font-weight: 700;
  margin-right: 2px;
}
.chatbox-input {
  display: flex;
  gap: 10px;
  padding: 10px 18px 18px 18px;
  background: transparent;
  border-top: 1.5px solid #ffe06622;
}
.chatbox-input input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 2px solid #ffe06699;
  outline: none;
  font-size: 1.08em;
  background: #181716;
  color: #fff;
  font-family: inherit;
  font-weight: 600;
  transition: border 0.18s;
}
.chatbox-input input:focus {
  border: 2px solid #ffe066;
}
.chatbox-input button {
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: #ffe066;
  color: #181716;
  font-weight: 700;
  font-size: 1.08em;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.chatbox-input button:hover {
  background: #fffbe6;
  color: #181716;
}
.chatbox-logout {
  background: none;
  border: none;
  color: #ffe066;
  font-size: 0.98em;
  margin: 6px 0 10px 18px;
  cursor: pointer;
  align-self: flex-start;
  font-weight: 600;
  text-decoration: underline;
  transition: color 0.18s;
}
.chatbox-logout:hover {
  color: #fffbe6;
}
@media (max-width: 600px) {
  .chatbox {
    left: 0;
    right: 0;
    top: 0;
    bottom: 64px;
    width: 100vw;
    min-height: calc(100vh - 64px);
    border-radius: 0;
  }
  .chatbox-body {
    height: auto;
  }
}
</style> 