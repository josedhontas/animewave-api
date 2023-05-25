const express = require('express');
const router = express.Router();

const fs = require('fs');

/**
 * @swagger
 * /animes:
 *   get:
 *     summary: Retorna a lista de animes
 *     tags:
 *       - Animes
 *     responses:
 *       200:
 *         description: Lista de animes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Anime'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Anime:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do anime
 *         titulo:
 *           type: string
 *           description: Título do anime
 *         descricao:
 *           type: string
 *           description: Descrição do anime
 *         urlImagem:
 *           type: string
 *           description: URL da imagem do anime
 */


router.get('/', (req, res) => {
  let animes = [];
  try {
    const data = fs.readFileSync('animes.json');
    animes = JSON.parse(data);
  } catch (error) {
    console.error(error);
  }

  const formattedAnimes = animes.map(anime => {
    return {
      id: anime.id,
      titulo: anime.titulo,
      descricao: anime.descricao,
      urlImagem: anime.urlImagem,
      ano: anime.ano,
    };
  });

  res.send(formattedAnimes);
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

  const anime = animes.find(u => u.id === id);

  if (!anime) {
    return res.status(404).send('Anime não encontrado');
  }

  const formattedAnime = {
    id: anime.id,
    titulo: anime.titulo,
    descricao: anime.descricao,
    urlImagem: anime.urlImagem,
    quantidadeEpisodios: anime.quantidadeEpisodios,
    urlEpisodio: anime.urlEpisodio,
    episodios: anime.episodios,
  };

  res.send(formattedAnime);
});

module.exports = router;
