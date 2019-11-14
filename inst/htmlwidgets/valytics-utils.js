selectedPolygonIndex = -1;
currentZoom = -1;
globalMapId = '';

function getZoomLevelFromMap() {
    try {
        return window[globalMapId + 'map'].viewState['default-view'].zoom;
    } catch (e) {
        console.error("Map not properly defined.");
        return 10;
    }
}
