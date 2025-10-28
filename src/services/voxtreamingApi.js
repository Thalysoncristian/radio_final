/**
 * Serviço para integração com a API do Voxtreaming
 * Gerencia todas as chamadas para a API do painel Voxtreaming
 */

class VoxtreamingApiService {
  constructor() {
    // URL base da API do Voxtreaming (com fallback)
    this.baseUrl = import.meta.env.VITE_VOXTREAMING_API_URL || 'http://painel.voxtreaming.com.br/api-json/Vkcxd2NtVlZNVUpRVkRBOStS'
    
    // Cache para evitar muitas requisições
    this.cache = new Map()
    this.cacheTimeout = parseInt(import.meta.env.VITE_API_CACHE_TIMEOUT) || 5000 // 5 segundos
    this.requestTimeout = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000 // 10 segundos
  }

  /**
   * Busca dados da rádio na API do Voxtreaming
   * @returns {Promise<Object>} Dados da rádio
   */
  async fetchRadioData() {
    try {
      // Verifica cache primeiro
      const cached = this.getCachedData('radio')
      if (cached) {
        return cached
      }

      console.log('🔄 Buscando dados da API Voxtreaming...')
      
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Adiciona timeout para evitar travamentos
        signal: AbortSignal.timeout(this.requestTimeout)
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      // Valida se os dados estão no formato esperado
      if (!data || typeof data !== 'object') {
        throw new Error('Formato de dados inválido da API')
      }

      // Processa e normaliza os dados
      const processedData = this.processRadioData(data)
      
      // Salva no cache
      this.setCachedData('radio', processedData)
      
      console.log('✅ Dados da API Voxtreaming carregados:', processedData)
      return processedData

    } catch (error) {
      console.error('❌ Erro ao buscar dados da API Voxtreaming:', error)
      
      // Retorna dados padrão em caso de erro
      return this.getDefaultData()
    }
  }

  /**
   * Processa e normaliza os dados da API
   * @param {Object} rawData - Dados brutos da API
   * @returns {Object} Dados processados
   */
  processRadioData(rawData) {
    return {
      // Status da rádio
      status: rawData.status || 'Desconhecido',
      isOnline: rawData.status === 'Ligado',
      
      // Informações do servidor
      server: {
        ip: rawData.ip || '',
        port: rawData.porta || '',
        djPort: rawData.porta_dj || '',
        shoutcastUrl: rawData.shoutcast || this.buildShoutcastUrl(rawData),
        rtmpUrl: rawData.rtmp || '',
        rtspUrl: rawData.rtsp || ''
      },
      
      // Informações da rádio
      radio: {
        title: rawData.titulo || 'Web Radio',
        genre: rawData.genero || 'Rock',
        bitrate: rawData.plano_bitrate || '128Kbps',
        maxListeners: rawData.plano_ouvintes || '999999',
        storageLimit: rawData.plano_ftp || '10 GB'
      },
      
      // Música atual
      nowPlaying: {
        artist: this.extractArtist(rawData.musica_atual || ''),
        title: this.extractTitle(rawData.musica_atual || ''),
        fullTitle: rawData.musica_atual || '',
        nextSong: rawData.proxima_musica || '',
        coverUrl: rawData.capa_musica || ''
      },
      
      // Estatísticas
      stats: {
        listeners: parseInt(rawData.ouvintes_conectados || '0'),
        maxListeners: parseInt(rawData.plano_ouvintes || '999999')
      },
      
      // Timestamp para controle de cache
      timestamp: Date.now()
    }
  }

  /**
   * Constrói URL do Shoutcast baseada nos dados da API
   * @param {Object} rawData - Dados brutos da API
   * @returns {string} URL do Shoutcast
   */
  buildShoutcastUrl(rawData) {
    const ip = rawData.ip || 'stm4.voxtreaming.com.br'
    const port = rawData.porta || '6920'
    
    // Tenta diferentes formatos de URL
    const urls = [
      `https://player.voxtreaming.com.br/stream/${port}`, // Player web do Voxtreaming
      `http://${ip}:${port}/stream`, // Stream direto
      `http://${ip}:${port}`, // URL básica
      `https://${ip}:${port}` // HTTPS
    ]
    
    return urls[0] // Usa o player web como primeira opção
  }

  /**
   * Extrai o artista da string da música atual
   * @param {string} fullTitle - Título completo da música
   * @returns {string} Nome do artista
   */
  extractArtist(fullTitle) {
    if (!fullTitle) return ''
    
    // Formato comum: "Artista - Música"
    const parts = fullTitle.split(' - ')
    return parts[0]?.trim() || ''
  }

  /**
   * Extrai o título da música da string completa
   * @param {string} fullTitle - Título completo da música
   * @returns {string} Título da música
   */
  extractTitle(fullTitle) {
    if (!fullTitle) return ''
    
    // Formato comum: "Artista - Música"
    const parts = fullTitle.split(' - ')
    return parts[1]?.trim() || parts[0]?.trim() || ''
  }

  /**
   * Retorna dados padrão quando a API falha
   * @returns {Object} Dados padrão
   */
  getDefaultData() {
    return {
      status: 'Offline',
      isOnline: false,
      server: {
        ip: 'stm4.voxtreaming.com.br',
        port: '6920',
        djPort: '35414',
        shoutcastUrl: 'http://stm4.voxtreaming.com.br:6920',
        rtmpUrl: '',
        rtspUrl: ''
      },
      radio: {
        title: 'Web Radio',
        genre: 'Rock',
        bitrate: '128Kbps',
        maxListeners: '999999',
        storageLimit: '10 GB'
      },
      nowPlaying: {
        artist: 'PRÓTON-4',
        title: 'NA ÓRBITA DA TERRA',
        fullTitle: 'PRÓTON-4 - NA ÓRBITA DA TERRA',
        nextSong: '',
        coverUrl: 'https://player.painelcast.com/img/img-capa-artista-padrao.png'
      },
      stats: {
        listeners: 0,
        maxListeners: 999999
      },
      timestamp: Date.now()
    }
  }

  /**
   * Sistema de cache simples
   */
  getCachedData(key) {
    const cached = this.cache.get(key)
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data
    }
    return null
  }

  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  /**
   * Limpa o cache
   */
  clearCache() {
    this.cache.clear()
  }

  /**
   * Verifica se a rádio está online
   * @returns {Promise<boolean>} Status da rádio
   */
  async isRadioOnline() {
    try {
      const data = await this.fetchRadioData()
      return data.isOnline
    } catch (error) {
      console.error('Erro ao verificar status da rádio:', error)
      return false
    }
  }

  /**
   * Busca apenas informações da música atual
   * @returns {Promise<Object>} Dados da música atual
   */
  async getNowPlaying() {
    try {
      const data = await this.fetchRadioData()
      return data.nowPlaying
    } catch (error) {
      console.error('Erro ao buscar música atual:', error)
      return this.getDefaultData().nowPlaying
    }
  }

  /**
   * Busca estatísticas da rádio
   * @returns {Promise<Object>} Estatísticas
   */
  async getStats() {
    try {
      const data = await this.fetchRadioData()
      return data.stats
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
      return this.getDefaultData().stats
    }
  }
}

// Exporta uma instância singleton
export default new VoxtreamingApiService()
