import * as loudness from "loudness";
import * as robot from 'robotjs';
import * as express from "express";
import * as path from "path";
import * as os from 'os';
import { Request, Response } from 'express';

/**
 * Media Controller Server
 * 
 * This Express application provides a REST API for controlling system media playback
 * and volume through a web interface. It uses robotjs for keyboard simulation and
 * loudness for system volume control.
 */

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware for basic request logging
app.use((req: Request, res: Response, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

/**
 * Media Control Routes
 * These endpoints handle media playback controls using keyboard simulation
 */

/**
 * @route   GET /play
 * @desc    Toggle play/pause for media playback
 * @access  Public
 */
app.get('/play', (req: Request, res: Response) => {
    try {
        robot.keyTap('audio_play');
        res.status(200).json({ message: 'Toggled play/pause' });
    } catch (error) {
        console.error('Error toggling play/pause:', error);
        res.status(500).json({ error: 'Failed to toggle play/pause' });
    }
});

/**
 * @route   GET /next
 * @desc    Skip to next track
 * @access  Public
 */
app.get('/next', (req: Request, res: Response) => {
    try {
        robot.keyTap('audio_next');
        console.log('Next track button pressed');
        res.status(200).json({ message: 'Skipped to next track' });
    } catch (error) {
        console.error('Error skipping track:', error);
        res.status(500).json({ error: 'Failed to skip track' });
    }
});

/**
 * @route   GET /prev
 * @desc    Go to previous track
 * @access  Public
 */
app.get('/prev', (req: Request, res: Response) => {
    try {
        robot.keyTap('audio_prev');
        console.log('Previous track button pressed');
        res.status(200).json({ message: 'Returned to previous track' });
    } catch (error) {
        console.error('Error returning to previous track:', error);
        res.status(500).json({ error: 'Failed to return to previous track' });
    }
});

/**
 * Volume Control Routes
 * These endpoints handle system volume control using the loudness package
 */

/**
 * @route   GET /v_up
 * @desc    Increase system volume by 5%
 * @access  Public
 */
app.get('/v_up', async (req: Request, res: Response) => {
    try {
        const currentVolume = await loudness.getVolume();
        const newVolume = Math.min(currentVolume + 5, 100);
        await loudness.setVolume(newVolume);
        console.log(`Volume increased to ${newVolume}%`);
        res.status(200).json({ volume: newVolume });
    } catch (error) {
        console.error('Error increasing volume:', error);
        res.status(500).json({ error: 'Failed to increase volume' });
    }
});

/**
 * @route   GET /v_down
 * @desc    Decrease system volume by 5%
 * @access  Public
 */
app.get('/v_down', async (req: Request, res: Response) => {
    try {
        const currentVolume = await loudness.getVolume();
        const newVolume = Math.max(currentVolume - 5, 0);
        await loudness.setVolume(newVolume);
        console.log(`Volume decreased to ${newVolume}%`);
        res.status(200).json({ volume: newVolume });
    } catch (error) {
        console.error('Error decreasing volume:', error);
        res.status(500).json({ error: 'Failed to decrease volume' });
    }
});

/**
 * @route   GET /get_volume
 * @desc    Get current system volume
 * @access  Public
 */
app.get('/get_volume', async (req: Request, res: Response) => {
    try {
        const volume = await loudness.getVolume();
        console.log(`Current volume: ${volume}%`);
        res.status(200).json({ volume });
    } catch (error) {
        console.error('Error getting volume:', error);
        res.status(500).json({ error: 'Failed to get volume' });
    }
});

/**
 * @route   GET /volume_set
 * @desc    Set system volume to specific value
 * @param   {number} v - Volume value (0-100)
 * @access  Public
 */
app.get('/volume_set', async (req: Request, res: Response) => {
    try {
        const requestedVolume = parseInt(req.query.v?.toString() || '0');
        const volume = Math.max(0, Math.min(requestedVolume, 100));
        
        await loudness.setVolume(volume);
        if (volume === 0) {
            await loudness.setMuted(true);
        } else {
            await loudness.setMuted(false);
        }
        
        console.log(`Volume set to ${volume}%`);
        res.status(200).json({ volume });
    } catch (error) {
        console.error('Error setting volume:', error);
        res.status(500).json({ error: 'Failed to set volume' });
    }
});

function getLocalIpAddress(): string {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        const networkInterface = interfaces[name];
        if (!networkInterface) continue;
        
        for (const info of networkInterface) {
            if (info.family === 'IPv4' && !info.internal) {
                return info.address;
            }
        }
    }
    return 'localhost';
}

app.get('/server-info', (req: Request, res: Response) => {
    const ipAddress = getLocalIpAddress();
    const port = PORT;
    res.json({ 
        ipAddress,
        port,
        url: `http://${ipAddress}:${port}`
    });
});

// Serve static files from the views directory
const staticPath = path.resolve(process.cwd(), 'views');
console.log('Resolved static path:', staticPath);

// Serve static files with proper MIME types
app.use(express.static(staticPath, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
        if (filePath.endsWith('.html')) {
            res.setHeader('Content-Type', 'text/html');
        }
    }
}));

// Serve index.html for the root path
app.get('/', (req: Request, res: Response) => {
    const indexPath = path.join(staticPath, 'index.html');
    console.log('Serving index.html from:', indexPath);
    
    if (!require('fs').existsSync(indexPath)) {
        console.error('index.html not found at:', indexPath);
        return res.status(404).json({ error: 'index.html not found' });
    }
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).json({ error: 'Failed to serve index.html' });
        }
    });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
    console.log(`Static files being served from: ${staticPath}`);
});

// Handle process termination
process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('Received SIGINT signal. Shutting down gracefully...');
    process.exit(0);
});
