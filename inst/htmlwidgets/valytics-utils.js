selectedBuildingIndex = -1;
selectedCommunityIndex = -1;
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

function getBuildingColor(hex, object) {
    if (object.index === selectedBuildingIndex) {
        return [255, 255, 255, 255];
    }

    return md_hexToRGBA(hex);
}

function emitShinyHoverEvent(type, index) {
    Shiny.onInputChange("map_element_hover", {
        index: index,
        type: type
    });
}