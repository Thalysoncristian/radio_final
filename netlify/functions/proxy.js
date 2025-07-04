const fetch = require('node-fetch');

exports.handler = async function(event) {
  // Exemplo: /api/proxy?url=/api/nowplaying
  const { url } = event.queryStringParameters;
  if (!url) {
    return { statusCode: 400, body: 'Missing url parameter' };
  }

  // Altere para o endereço do seu servidor de streaming
  const target = `http://srv895506.hstgr.cloud${url}`;

  try {
    const response = await fetch(target, {
      headers: {
        // Se precisar de autenticação, adicione aqui
        'Authorization': 'Bearer bd0af7ebc28a76ee:080c11920e7551b3665d74bc4789394e'
      }
    });
    const contentType = response.headers.get('content-type');
    const body = await response.buffer();

    return {
      statusCode: response.status,
      headers: { 'content-type': contentType },
      body: body.toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}; 