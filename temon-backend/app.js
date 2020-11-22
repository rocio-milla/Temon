import Genres from './src/consts/Genres.mjs';
import * as Artists from './src/consts/artists/index.mjs';
import youtubeSearcher from 'yt-search';
import youtubeDownloader from 'ytdl-core';
import express from 'express';
import bodyParser from 'body-parser';
import retry from 'async-retry';

const port = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`El servidor está inicializado en el puerto ${port}`);
});

app.get('/', (req, res) => {
  res.send('TEMON API running');
})

app.get('/musica/escuchar', async (req, res) => {
  try {
    retry(async () => {
      console.log("body: ", req.body)
      const url = req.query.url;
      const audio = youtubeDownloader(url, {
        filter: format => format.container === 'mp4',
        quality: 'highestaudio'
      });

      res.set("Content-Type", "video/mp4");

      audio.pipe(res);

      console.log('request served');
    });
  } catch (error) {
    console.log(`ocurrió un error al obtener el audio de ${url}`);
    res.status(500);
    res.send(error);
  }
});

app.get('/musica/genero', async (req, res) => {
  try {
    const genre = req.query.genre;
    res.send(Artists[genre.replace(/\s/g, "")]);
  } catch (error) {
    console.log(`ocurrió un error al obtener la data`);
    res.status(500);
    res.send(error);
  }
});

app.get('/musica/explorar', async (req, res) => {
  try {
    res.send(Genres);
  } catch (error) {
    console.log(`ocurrió un error al obtener la data`);
    res.status(500);
    res.send(error);
  }
});

app.post('/musica/buscar', async (req, res) => {
  try {
    console.log('body: ', req.body);

    const videos = await retry(async () => {
      const r = await youtubeSearcher(req.body.cancion);

      return r.videos;
    }, {
      retries: 3,
      onRetry: () => console.log('retrying...')
    });

    const responseArray = [];

    for (const video of videos) {
      const videoObject = {
        video: video.title,
        url: video.url
      };

      res.set("Content-Type", "application/json");
      responseArray.push(videoObject);
    }

    res.send({ responseArray });
  } catch (e) {
    console.log(e.message);
    res.status(500);
    res.send(error);
  }
});
