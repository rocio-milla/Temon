const youtubeSearcher = require('yt-search');
const youtubeDownloader = require('ytdl-core');
const express = require("express");
const bodyParser = require('body-parser');
const retry = require('async-retry');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

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

    res.send({responseArray});
  } catch (e) {
    console.log(e.message);
    res.status(500);
    res.send(error);
  }
});
