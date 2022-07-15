import * as loudness from "loudness";
import * as robot from 'robotjs';
import * as express from "express";
import * as path from "path";

const app = express()
const port = 3001

app.get('/play', (req, res) => {
    robot.keyTap('audio_play')
    res.send('audio_play')
});

app.get('/v_up', async (req, res) => {
    const volume = await loudness.getVolume();
    await loudness.setVolume(volume + 10);
    res.send('Up ' + (volume + 10).toString())
});

app.get('/v_down', async (req, res) => {
    const volume = await loudness.getVolume();
    await loudness.setVolume(volume - 10);
    res.send('Down ' + (volume - 10).toString())
});

app.get('/volume_set', async (req, res) => {
    const s: number = parseInt(req.query.v.toString());
    await loudness.setVolume(s);
    s === 0 ? loudness.setMuted(true) : (loudness.setMuted(false) && await loudness.getVolume());
    res.send('Down ' + (s).toString())
});

app.use(express.static(path.join(__dirname, '/../', 'views')));

app.listen(port, '0.0.0.0', () => {
    console.log('listening port : ' + port)
});
