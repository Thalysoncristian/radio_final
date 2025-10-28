/**
 * Composable para integração com a API do Voxtreaming
 * Fornece reatividade e funcionalidades para o player de rádio
 */

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import voxtreamingApi from '../services/voxtreamingApi.js'

export function useVoxtreamingApi() {
  // Estados reativos
  const radioData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const lastUpdate = ref(null)
  
  // Intervalo de atualização automática
  let updateInterval = null
  const updateIntervalMs = parseInt(import.meta.env.VITE_API_UPDATE_INTERVAL) || 10000 // 10 segundos

  // Computed properties
  const isOnline = computed(() => radioData.value?.isOnline || false)
  const nowPlaying = computed(() => radioData.value?.nowPlaying || {})
  const stats = computed(() => radioData.value?.stats || {})
  const serverInfo = computed(() => radioData.value?.server || {})
  const radioInfo = computed(() => radioData.value?.radio || {})

  // Formatação dos dados para exibição
  const formattedArtist = computed(() => {
    const artist = nowPlaying.value.artist || ''
    return artist.toUpperCase()
  })

  const formattedTitle = computed(() => {
    const title = nowPlaying.value.title || ''
    return title.replace(/\s*[\r\n]+\s*/g, ' ').toUpperCase()
  })

  const formattedListeners = computed(() => {
    return stats.value.listeners || 0
  })

  const formattedCoverUrl = computed(() => {
    const coverUrl = nowPlaying.value.coverUrl || ''
    
    // Se não há URL de capa ou é a padrão, usa uma imagem padrão
    if (!coverUrl || coverUrl.includes('img-capa-artista-padrao.png')) {
      return '/capa.jpg'
    }
    
    // Se é uma URL válida, usa ela
    if (coverUrl.startsWith('http')) {
      return coverUrl
    }
    
    // Fallback
    return '/capa.jpg'
  })

  /**
   * Busca dados da rádio
   */
  async function fetchRadioData() {
    try {
      isLoading.value = true
      error.value = null
      
      const data = await voxtreamingApi.fetchRadioData()
      radioData.value = data
      lastUpdate.value = new Date()
      
      console.log('📻 Dados da rádio atualizados:', data)
      
    } catch (err) {
      error.value = err.message
      console.error('❌ Erro ao buscar dados da rádio:', err)
      
      // Em caso de erro, mantém os dados anteriores ou usa padrão
      if (!radioData.value) {
        radioData.value = voxtreamingApi.getDefaultData()
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Inicia atualização automática
   */
  function startAutoUpdate() {
    if (updateInterval) {
      clearInterval(updateInterval)
    }
    
    updateInterval = setInterval(() => {
      fetchRadioData()
    }, updateIntervalMs)
    
    console.log('🔄 Atualização automática iniciada (intervalo:', updateIntervalMs + 'ms)')
  }

  /**
   * Para atualização automática
   */
  function stopAutoUpdate() {
    if (updateInterval) {
      clearInterval(updateInterval)
      updateInterval = null
      console.log('⏹️ Atualização automática parada')
    }
  }

  /**
   * Força uma atualização imediata
   */
  async function refresh() {
    voxtreamingApi.clearCache()
    await fetchRadioData()
  }

  /**
   * Verifica se a rádio está online
   */
  async function checkStatus() {
    try {
      const online = await voxtreamingApi.isRadioOnline()
      return online
    } catch (err) {
      console.error('Erro ao verificar status:', err)
      return false
    }
  }

  /**
   * Obtém URL do stream de áudio
   */
  function getStreamUrl() {
    const shoutcastUrl = serverInfo.value.shoutcastUrl
    // Usa o player web do Voxtreaming que funciona
    return shoutcastUrl || 'https://player.voxtreaming.com.br/stream/6920'
  }

  /**
   * Obtém informações para o histórico de músicas
   */
  function getHistoryEntry() {
    if (!nowPlaying.value.artist || !nowPlaying.value.title) {
      return null
    }

    return {
      hora: new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      artista: formattedArtist.value,
      musica: formattedTitle.value
    }
  }

  // Lifecycle hooks
  onMounted(() => {
    fetchRadioData()
    startAutoUpdate()
  })

  onBeforeUnmount(() => {
    stopAutoUpdate()
  })

  return {
    // Estados
    radioData,
    isLoading,
    error,
    lastUpdate,
    
    // Computed
    isOnline,
    nowPlaying,
    stats,
    serverInfo,
    radioInfo,
    formattedArtist,
    formattedTitle,
    formattedListeners,
    formattedCoverUrl,
    
    // Métodos
    fetchRadioData,
    startAutoUpdate,
    stopAutoUpdate,
    refresh,
    checkStatus,
    getStreamUrl,
    getHistoryEntry
  }
}
