window.addEventListener('load', () => {
    const wwd = new WorldWind.WorldWindow("worldwind-canvas");
    wwd.addLayer(new WorldWind.BMNGOneImageLayer());
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    wwd.addLayer(new WorldWind.AtmosphereLayer());
    wwd.addLayer(new WorldWind.StarFieldLayer());

    const globe = document.querySelector('#globe');
    const canvas = document.querySelector('#ww-canvas');
    const ctx = canvas.getContext('2d');

    // Function to load and display GeoJSON data
    function loadGeoJSON() {
        fetch('/data/custom.geojson')
            .then(response => response.json())
            .then(geojson => {
                const placemarkLayer = new WorldWind.RenderableLayer("Placemarks");
                const placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
                placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";
                placemarkAttributes.imageScale = 1;
                placemarkAttributes.imageOffset = new WorldWind.Offset(
                    WorldWind.OFFSET_FRACTION, 0.3,
                    WorldWind.OFFSET_FRACTION, 0.0);
                placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
                    WorldWind.OFFSET_FRACTION, 0.5,
                    WorldWind.OFFSET_FRACTION, 1.0);

                geojson.features.forEach(feature => {
                    const placemark = new WorldWind.Placemark(
                        new WorldWind.Position(
                            feature.geometry.coordinates[1],
                            feature.geometry.coordinates[0],
                            1e2)
                    );
                    placemark.label = feature.properties.name;
                    placemark.attributes = placemarkAttributes;
                    placemarkLayer.addRenderable(placemark);
                });
                wwd.addLayer(placemarkLayer);
            });
    }

    loadGeoJSON();

    // --- Local Tile Layer (Example) ---
    // This is an example of how to load local tiles.
    // You would need to have a tile server running or have the tiles
    // in the correct directory structure.
    /*
    const localTileLayer = new WorldWind.TiledImageLayer(
        new WorldWind.Sector(-90, 90, -180, 180),
        new WorldWind.Location(45, 45),
        10, "image/png", "local-tiles", "/tiles/", 0, 9
    );
    wwd.addLayer(localTileLayer);
    */

    function updateTexture() {
        ctx.drawImage(wwd.canvas, 0, 0);
        const material = globe.getAttribute('material');
        material.src = '#ww-canvas';
        globe.setAttribute('material', material);
        requestAnimationFrame(updateTexture);
    }

    updateTexture();

    const toggleButton = document.querySelector('#toggle-button');
    toggleButton.addEventListener('click', () => {
        const placemarkLayer = wwd.layers.find(layer => layer.displayName === "Placemarks");
        if (placemarkLayer) {
            placemarkLayer.enabled = !placemarkLayer.enabled;
            wwd.redraw();
        }
    });
});
