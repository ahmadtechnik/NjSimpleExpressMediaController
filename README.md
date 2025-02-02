# NodeJS Simple Media Controller

A modern web-based media controller that allows you to control your computer's media playback and volume from any device on your local network. Perfect for when you want to adjust volume or change tracks without going to your computer.

![Media Controller Interface](https://raw.githubusercontent.com/ahmadtechnik/NjSimpleExpressMediaController/main/docs/screenshot.png)

## Features

- 🎵 Media playback controls (Play/Pause, Next, Previous)
- 🔊 Volume control with real-time preview
- 🎨 Modern, responsive interface
- 🌐 Access from any device on your local network
- ⚡ Real-time updates
- 📱 Mobile-friendly design

## Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)
- TypeScript (for development)

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:ahmadtechnik/NjSimpleExpressMediaController.git
   ```

2. Navigate to the project directory:
   ```bash
   cd NjSimpleExpressMediaController
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Install TypeScript globally (if not already installed):
   ```bash
   npm install -g typescript
   ```

## Usage

### Development Mode

Run the application in development mode with auto-reload:
```bash
npm run start:dev
```

This will:
- Watch for TypeScript changes and recompile automatically
- Auto-restart the server when files change
- Enable hot-reloading for a better development experience

### Production Mode

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

## Accessing the Controller

1. Start the application using one of the methods above
2. Open your browser and navigate to:
   ```
   http://localhost:3001
   ```
   or
   ```
   http://<your-computer-ip>:3001
   ```
   from any device on your local network

## Key Features

### Media Controls
- **Play/Pause**: Toggle media playback
- **Next/Previous**: Skip between tracks
- **Volume Control**: Smooth volume adjustment with real-time preview

### User Interface
- Modern, glass-morphism design
- Responsive layout that works on all devices
- Smooth animations and transitions
- Real-time volume display
- Touch-friendly controls

## Development

The project uses several modern development tools and practices:

- **TypeScript** for type-safe code
- **Express.js** for the backend server
- **Bootstrap** for responsive design
- **jQuery** for DOM manipulation
- **nodemon** for development auto-reload
- **concurrently** for running multiple scripts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the [robotjs](https://github.com/octalmage/robotjs) library for system-wide media control
- Thanks to the [loudness](https://github.com/LinusU/node-loudness) package for volume control

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/ahmadtechnik/NjSimpleExpressMediaController/issues) on GitHub.
