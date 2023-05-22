const express = require('express');
const router = express.Router();

const fs = require('fs');

router.get('/', (req, res) => {
  
    // Lê os usuários existentes do arquivo JSON
    let animes = [];
    try {
      const data = fs.readFileSync('animes.json');
      animes = JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  
  
    res.send(animes);
  });


  router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
  
    let animes = [];
    try {
      const data = fs.readFileSync('animes.json');
      animes = JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  
    // Busca o usuário pelo CPF na lista de usuários
    const anime = animes.find(u => u.id === id);
  
    if (!anime) {
      return res.status(404).send('Anime não encontrado');
    }
  
    res.send(anime);
  });

module.exports = router;