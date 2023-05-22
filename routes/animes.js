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
    };
  });

  res.send(formattedAnimes);
});

/**
 * @swagger
 * /animes/{id}:
 *   get:
 *     summary: Retorna um anime pelo ID
 *     tags:
 *       - Animes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID do anime
 *     responses:
 *       200:
 *         description: Anime retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anime'
 *       404:
 *         description: Anime não encontrado
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
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
 *         quantidadeEpisodios:
 *           type: integer
 *           description: Quantidade de episódios do anime
 *         urlEpisodio:
 *           type: string
 *           description: URL base dos episódios do anime
 *         episodios:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Episodio'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Episodio:
 *       type: object
 *       properties:
 *         numero:
 *           type: integer
 *           description: Número do episódio
 *         link:
 *           type: string
 *           description: URL do episódio
 *       example:
 *         numero: 1
 *         link: https://lightspeedst.net/s3/mp4/death-note/sd/1.mp4
 */


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
    episodios: [],
  };

  for (let i = 1; i <= anime.quantidadeEpisodios; i++) {
    const episodio = {
      numero: i,
      link: `${anime.urlEpisodio}${i}.mp4`,
    };
    formattedAnime.episodios.push(episodio);
  }

  res.send(formattedAnime);
});

module.exports = router;
