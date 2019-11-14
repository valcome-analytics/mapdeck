selectedPolygonIndex = -1;
currentZoom = -1;
globalMapId = '';

function getZoomLevelFromMap() {
    try {
        let viewState = window[globalMapId + 'map'].viewState;

        if (viewState['default-view'] != null) {
            return viewState['default-view'].zoom;
        } else {
            return viewState.zoom
        }
    } catch (e) {
        console.error("Map not properly defined.");
        return 10;
    }
}
