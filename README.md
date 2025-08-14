# WebXR WorldWind Integration with A-Frame

This project is a Node.js-based web application that integrates the NASA WorldWind JavaScript SDK with A-Frame to create immersive WebXR experiences.

## Features

- **3D Globe Rendering:** Utilizes NASA WorldWind for terrain visualization.
- **WebXR Support:** Integrates with A-Frame for VR and AR capabilities.
- **Custom Data Overlays:** Supports loading and displaying custom GeoJSON data.
- **Local Tile Support:** Can be configured to use local terrain tiles.
- **XR UI:** Includes a basic UI for toggling data layers in XR mode.

## Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the server:**
   ```bash
   node server.js
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Project Structure

- `server.js`: The main Node.js server file.
- `public/`: Contains the static frontend files.
  - `index.html`: The main HTML file with the A-Frame scene.
  - `scripts/main.js`: The core JavaScript file for WorldWind and A-Frame integration.
- `data/`: Contains custom data files (e.g., `custom.geojson`).
- `tiles/`: Directory for local terrain tiles.

## Configuration

### Local Tiles

To use local terrain tiles, you need to have a directory of tiles that follows the WorldWind tile structure. Update the `main.js` file to include the `TiledImageLayer` with the correct path to your tiles.

### Custom Data

Place your custom GeoJSON files in the `data/` directory and update the `main.js` file to load the desired data.
