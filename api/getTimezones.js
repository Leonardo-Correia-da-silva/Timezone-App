// api/getTimezones.js


const axios = require('axios');
const cors = require('cors')();

const getTimezones = async (req, res) => {
  try {
    // Permitir todas as origens (*), você pode ajustar conforme necessário
    cors(req, res);

    const response = await axios.get(
      'http://api.timezonedb.com/v2.1/list-time-zone?key=6LMMMZLM95D4&format=json'
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao obter dados de fusos horários:', error);
    res.status(500).send('Erro ao obter dados de fusos horários');
  }
};

export default getTimezones;



