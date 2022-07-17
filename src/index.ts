import * as loudness from "loudness";
import * as robot from 'robotjs';
import * as express from "express";
import * as path from "path";

const app = express()
const port = 3001
const host = '0.0.0.0'

app.get('/play', (req, res) => {
    robot.keyTap('audio_play');
    res.send('audio_play');
});

app.get('/next', (req, res) => {
    robot.keyTap('audio_next');
    console.log('nex button pressed');
    res.send('audio_next');
});

app.get('/prev', (req, res) => {
    robot.keyTap('audio_prev');
    console.log('pref button pressed');
    res.send('audio_prev');
});

app.get('/v_up', async (req, res) => {
    const volume = await loudness.getVolume();
    console.log('volume up button pressed');
    await loudness.setVolume(volume + 10);
    res.send('Up ' + (volume + 10).toString())
});

app.get('/v_down', async (req, res) => {
    const volume = await loudness.getVolume();
    console.log('volume down button pressed');
    await loudness.setVolume(volume - 10);
    res.send('Down ' + (volume - 10).toString());
});

app.get('/get_volume', async (req, res) => {
    const volume = await loudness.getVolume();
    console.log('volume get');
    res.send(volume.toString());
});

app.get('/volume_set', async (req, res) => {
    const s: number = parseInt(req.query.v.toString());
    console.log(`volume set ${s}%`);
    await loudness.setVolume(s);
    s === 0 ? loudness.setMuted(true) : (loudness.setMuted(false) && await loudness.getVolume());
    res.send('Down ' + (s).toString());
});

app.get('/press_key', async (req, res) => {
    const key = req.query.key
    if (key === 'swi') {
        robot.keyToggle('alt', 'down');
        robot.keyTap('tab');
        robot.keyTap('tab');
        robot.keyToggle('alt', 'up');
        res.end('Key ' + (key).toString());
        return;
    }
    robot.keyTap(key.toString());
    res.end('Key ' + (key).toString());
})

app.use(express.static(path.join(__dirname, '/../', 'views')));

app.listen(port, host, () => {
    console.log('listening port : ' + port);
});
