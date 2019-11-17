selectedCommunityIndex = -1;
currentZoom = -1;
buildingOpacity = 0;

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


function getCommunityColor(hex, object) {
    color = md_hexToRGBA(hex);
    if (object.index === selectedCommunityIndex) {
        let zoom = getZoomLevelFromMap();

        if (zoom < 11) {
            color[3] = 90;
            return color;
        } else {
            color[3] = 0;
            return color;
        }
    }

    return color;
}

function getBuildingColor(hex) {
    color = md_hexToRGBA(hex);
    console.log(selectedCommunityIndex);
    return color;
}
