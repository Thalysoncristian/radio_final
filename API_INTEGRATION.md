# 📻 Rádio Online - Integração com API Voxtreaming

## 🚀 Configuração da API

### 1. Variáveis de Ambiente

Copie o arquivo `env.example` para `.env` e configure as variáveis:

```bash
cp env.example .env
```

**Variáveis principais:**
- `VITE_VOXTREAMING_API_URL`: URL da API do Voxtreaming
- `VITE_RADIO_STREAM_URL`: URL do stream de áudio
- `VITE_API_UPDATE_INTERVAL`: Intervalo de atualização (ms)

### 2. Configuração da API Voxtreaming

A API do Voxtreaming fornece os seguintes dados:

```json
{
  "status": "Ligado",
  "porta": "6920",
  "porta_dj": "35414", 
  "ip": "stm4.voxtreaming.com.br",
  "ouvintes_conectados": "1",
  "titulo": "Web Radio",
  "plano_ouvintes": "999999",
  "plano_ftp": "10 GB",
  "plano_bitrate": "128Kbps",
  "musica_atual": "Future Holograms - Valentine",
  "genero": "Rock",
  "shoutcast": "http://stm4.voxtreaming.com.br:6920",
  "capa_musica": "https://player.painelcast.com/img/img-capa-artista-padrao.png"
}
```

## 🔧 Funcionalidades Implementadas

### ✅ Serviço de API (`src/services/voxtreamingApi.js`)
- ✅ Integração completa com API do Voxtreaming
- ✅ Sistema de cache inteligente
- ✅ Tratamento de erros robusto
- ✅ Timeout configurável
- ✅ Dados normalizados e processados

### ✅ Composable Vue (`src/composables/useVoxtreamingApi.js`)
- ✅ Reatividade completa
- ✅ Atualização automática
- ✅ Estados de loading e erro
- ✅ Formatação de dados para exibição
- ✅ Lifecycle management

### ✅ Player Atualizado (`src/views/PlayerMobile.vue`)
- ✅ Integração com nova API
- ✅ Indicadores visuais de status
- ✅ Atualização automática de dados
- ✅ Histórico de músicas dinâmico
- ✅ Media Session API atualizada

## 🎵 Dados da API Utilizados

### Informações da Rádio
- **Status**: Online/Offline
- **Título**: Nome da rádio
- **Gênero**: Tipo de música
- **Bitrate**: Qualidade do stream

### Música Atual
- **Artista**: Nome do artista
- **Título**: Nome da música
- **Capa**: URL da imagem do álbum
- **Próxima**: Próxima música (quando disponível)

### Estatísticas
- **Ouvintes**: Número atual de ouvintes
- **Máximo**: Limite de ouvintes do plano
- **Servidor**: Informações do servidor

### URLs de Stream
- **Shoutcast**: URL principal do stream
- **RTMP**: URL RTMP (se disponível)
- **RTSP**: URL RTSP (se disponível)

## 🔄 Sistema de Atualização

### Atualização Automática
- **Intervalo**: 10 segundos (configurável)
- **Cache**: 5 segundos (configurável)
- **Timeout**: 10 segundos (configurável)

### Indicadores Visuais
- 🔄 **Loading**: Atualizando dados
- ⚠️ **Erro**: Problema na API
- 📻 **Offline**: Rádio desconectada

## 🛠️ Desenvolvimento

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 📱 Recursos do Player

### Desktop
- ✅ Player centralizado
- ✅ Sidebar com menu
- ✅ Histórico de músicas
- ✅ Controles de volume
- ✅ Indicadores de status

### Mobile
- ✅ Interface otimizada
- ✅ Controles touch
- ✅ Chat integrado
- ✅ Histórico de músicas
- ✅ Indicadores de status

## 🔧 Troubleshooting

### Problemas Comuns

1. **API não responde**
   - Verifique a URL da API
   - Confirme se o servidor está online
   - Verifique logs do console

2. **Stream não toca**
   - Verifique a URL do stream
   - Teste em outro player
   - Confirme se o formato é suportado

3. **Dados não atualizam**
   - Verifique o intervalo de atualização
   - Confirme se o cache está funcionando
   - Verifique logs de erro

### Logs Úteis
- `🔄 Buscando dados da API Voxtreaming...`
- `✅ Dados da API Voxtreaming carregados`
- `❌ Erro ao buscar dados da API Voxtreaming`

## 📊 Monitoramento

### Métricas Disponíveis
- Status da rádio (online/offline)
- Número de ouvintes
- Última atualização
- Erros de API
- Tempo de resposta

### Debug
Ative logs detalhados no console do navegador para monitorar:
- Requisições à API
- Cache hits/misses
- Erros de rede
- Atualizações de dados
