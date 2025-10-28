# 🔧 Troubleshooting - Áudio Não Toca

## ✅ **SOLUÇÃO IMPLEMENTADA**

Baseado no seu teste com o iframe que funcionou, implementei uma solução híbrida:

### 🎵 **Sistema de Fallback Automático**

1. **Primeira tentativa**: Elemento `<audio>` com URL do stream
2. **Fallback automático**: Iframe do player web do Voxtreaming
3. **Indicador visual**: Mostra qual player está sendo usado

### 🔧 **URLs Corretas Implementadas**

- **Stream direto**: `https://player.voxtreaming.com.br/stream/6920`
- **Player iframe**: `https://player.voxtreaming.com.br/player-web/6920`

## 🎯 **Como Funciona Agora**

### 1. **Tentativa com Audio Element**
```javascript
// Primeiro tenta com elemento audio
<audio src="https://player.voxtreaming.com.br/stream/6920">
```

### 2. **Fallback para Iframe**
```javascript
// Se audio falhar, usa iframe automaticamente
<iframe src="https://player.voxtreaming.com.br/player-web/6920">
```

### 3. **Indicadores Visuais**
- 🎵 **"Usando Player Web"** = Iframe ativo
- 🔄 **"Atualizando dados..."** = Carregando API
- ⚠️ **"Erro na API"** = Problema na API

## 🚀 **Teste Agora**

1. **Execute**: `npm run dev`
2. **Clique no botão play**
3. **Verifique os logs** no console
4. **Observe o indicador** de qual player está sendo usado

## 📋 **Logs Esperados**

### ✅ **Sucesso com Audio**
```
🎵 Tentando tocar/pausar áudio...
📻 URL do stream: https://player.voxtreaming.com.br/stream/6920
🔄 Carregando stream...
✅ Stream pronto para reprodução
🎵 Reprodução iniciada com sucesso!
```

### 🔄 **Fallback para Iframe**
```
❌ Erro no áudio: [erro]
🔄 Audio falhou, tentando iframe...
✅ Iframe player carregado
🎵 Usando Player Web
```

## 🎵 **Problemas Comuns e Soluções**

### 1. **Problema: Navegador bloqueia reprodução automática**

**Sintomas:**
- Botão play não funciona
- Erro no console: "NotAllowedError"
- Áudio não inicia

**Solução:**
```javascript
// Clique em qualquer lugar da página primeiro
// Ou adicione um evento de clique global
document.addEventListener('click', () => {
  // Primeira interação do usuário
}, { once: true })
```

### 2. **Problema: URL do stream incorreta**

**Sintomas:**
- Erro no console: "NotSupportedError"
- Stream não carrega

**Verificação:**
1. Abra o console do navegador (F12)
2. Clique no botão "🧪 Testar Stream"
3. Verifique os logs

**URLs de teste:**
- `http://stm4.voxtreaming.com.br:6920`
- `http://painel.voxtreaming.com.br/api-json/Vkcxd2NtVlZNVUpRVkRBOStS`

### 3. **Problema: CORS (Cross-Origin)**

**Sintomas:**
- Erro no console: "CORS policy"
- Stream não carrega

**Solução:**
- Use um proxy ou servidor intermediário
- Configure CORS no servidor de streaming

### 4. **Problema: Formato não suportado**

**Sintomas:**
- Erro: "NotSupportedError"
- Stream não reproduz

**Verificação:**
- Teste a URL em outro player (VLC, Winamp)
- Verifique se é um stream Shoutcast válido

## 🔍 Diagnóstico Passo a Passo

### Passo 1: Verificar Console
```bash
# Abra o console (F12) e procure por:
🔄 Carregando stream...
✅ Stream pronto para reprodução
🎵 Reprodução iniciada com sucesso!
```

### Passo 2: Testar URL Manualmente
```bash
# Cole esta URL no navegador:
http://stm4.voxtreaming.com.br:6920

# Deve abrir um player de áudio ou download
```

### Passo 3: Verificar API
```bash
# Teste a API diretamente:
http://painel.voxtreaming.com.br/api-json/Vkcxd2NtVlZNVUpRVkRBOStS

# Deve retornar JSON com dados da rádio
```

### Passo 4: Testar em Outro Navegador
- Chrome
- Firefox  
- Safari
- Edge

## 🛠️ Soluções Avançadas

### 1. **Adicionar User-Agent**
```javascript
// No serviço da API
headers: {
  'User-Agent': 'Mozilla/5.0 (compatible; RadioPlayer/1.0)',
  'Accept': 'audio/*'
}
```

### 2. **Usar Proxy**
```javascript
// Criar proxy no Netlify Functions
const proxyUrl = '/api/proxy?url=' + encodeURIComponent(streamUrl)
```

### 3. **Fallback para HTTPS**
```javascript
// Tentar HTTPS se HTTP falhar
const httpsUrl = streamUrl.replace('http://', 'https://')
```

## 📱 Problemas Específicos Mobile

### iOS Safari
- Requer interação do usuário
- Pode bloquear streams HTTP
- Use HTTPS quando possível

### Android Chrome
- Pode ter restrições de autoplay
- Verifique permissões de áudio

## 🔧 Configurações Recomendadas

### Variáveis de Ambiente (.env)
```bash
# URLs de fallback
VITE_RADIO_STREAM_URL=http://stm4.voxtreaming.com.br:6920
VITE_RADIO_STREAM_URL_HTTPS=https://stm4.voxtreaming.com.br:6920

# Configurações de áudio
VITE_AUDIO_TIMEOUT=10000
VITE_AUDIO_RETRY_ATTEMPTS=3
```

### Configuração do Elemento Audio
```html
<audio 
  ref="audioRef" 
  :src="radioUrl" 
  preload="none"
  crossorigin="anonymous"
  controls="false">
</audio>
```

## 🚨 Logs de Erro Comuns

### "NotAllowedError"
- **Causa**: Navegador bloqueia autoplay
- **Solução**: Interação do usuário necessária

### "NotSupportedError"  
- **Causa**: Formato não suportado
- **Solução**: Verificar URL do stream

### "NetworkError"
- **Causa**: Problema de rede/CORS
- **Solução**: Usar proxy ou HTTPS

### "AbortError"
- **Causa**: Requisição cancelada
- **Solução**: Verificar timeout

## 📞 Suporte

Se o problema persistir:

1. **Cole os logs do console** aqui
2. **Teste a URL** em outro player
3. **Verifique a API** do Voxtreaming
4. **Teste em outro navegador**

### URLs para Teste
- **Stream**: `http://stm4.voxtreaming.com.br:6920`
- **API**: `http://painel.voxtreaming.com.br/api-json/Vkcxd2NtVlZNVUpRVkRBOStS`
