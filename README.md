# 🎵 MinimalWave Radio

Uma aplicação web moderna para streaming de rádio especializada em música gótica, darkwave e synth. Desenvolvida com Vue.js 3 e Vite.

![MinimalWave Radio](https://radiofinal.netlify.app/capa2.jpg)

## ✨ Características

- 🎧 **Streaming ao vivo** - Ouça música gótica e darkwave 24/7
- 📱 **Design responsivo** - Interface otimizada para desktop e mobile
- 🎨 **Interface moderna** - UI elegante com Tailwind CSS
- ⚡ **Performance otimizada** - Construída com Vite para carregamento rápido
- 🔍 **SEO otimizado** - Meta tags e schema markup para melhor indexação

## 🚀 Tecnologias Utilizadas

- **Frontend**: Vue.js 3, Vue Router, Pinia
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Deploy**: Netlify
- **Linguagem**: JavaScript (ES6+)

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd radio
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:5173
   ```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção localmente

## 🌐 Deploy

O projeto está configurado para deploy automático no Netlify. Cada push para a branch principal gera uma nova build automaticamente.

**URL de produção**: https://radiofinal.netlify.app/

## 📁 Estrutura do Projeto

```
radio/
├── src/
│   ├── components/     # Componentes Vue reutilizáveis
│   ├── views/         # Páginas da aplicação
│   ├── router/        # Configuração de rotas
│   ├── assets/        # Recursos estáticos
│   ├── App.vue        # Componente raiz
│   └── main.js        # Ponto de entrada
├── public/            # Arquivos públicos
├── dist/              # Build de produção
├── netlify.toml       # Configuração do Netlify
├── vite.config.js     # Configuração do Vite
├── tailwind.config.js # Configuração do Tailwind
└── package.json       # Dependências e scripts
```

## 🎨 Personalização

### Cores e Estilos
O projeto utiliza Tailwind CSS. Para personalizar cores e estilos, edite o arquivo `tailwind.config.js`.

### Configuração do Vite
Ajustes de build e desenvolvimento podem ser feitos no arquivo `vite.config.js`.

## 📱 Compatibilidade

- ✅ Chrome (versão 88+)
- ✅ Firefox (versão 85+)
- ✅ Safari (versão 14+)
- ✅ Edge (versão 88+)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🏢 Sobre a Rádio

A **MinimalWave Radio** é um projeto da [AzuraQuest](https://azura.quest/), hospedada em um VPS de alta performance da Hostinger. Utilizamos a infraestrutura robusta da Hostinger para garantir estabilidade e qualidade no streaming 24/7.

## 🔗 Integração com Metadados (AzuraQuest)

A rádio utiliza a **API pública da AzuraQuest** para puxar em tempo real os metadados das músicas que estão tocando, como título, artista e capa do álbum. Esta API é open source e está disponível no GitHub.

- **Link dos metadados:** [https://mlinsights.fun/api/nowplaying](https://mlinsights.fun/api/nowplaying)
- **Repositório da API:** [https://github.com/Thalysoncristian/azura-api](https://github.com/Thalysoncristian/azura-api)

## 📞 Contato

- **Website**: https://radiofinal.netlify.app/
- **Email**: thalysoncristian19@gmail.com

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório! 