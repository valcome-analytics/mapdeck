buildingsLayerId = "buildings";
selectedBuildingIndex = -1;

communitiesLayerId = "communities"
selectedCommunityIndex = -1;
lastHoveredCommunityIndex = -1;
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

function isCommunityLayer(layerId) {
    return layerId.indexOf(communitiesLayerId) !== -1;
}

function isBuildingLayer(layerId) {
    return layerId.indexOf(buildingsLayerId) !== -1;
}

function getBuildingColor(hex, object) {
    color = md_hexToRGBA(hex)
    if (object.index === selectedBuildingIndex) {
        brightener = 65
        return [
            Math.min(255, color[0] + brightener),
            Math.min(255, color[1] + brightener),
            Math.min(255, color[2] + brightener),
            color[3]
        ];
    }

    return color;
}

function isNotEmpty(array) {
    return !isEmpty(array)
}

function isEmpty(array) {
    return array == null || array.length === 0 || array === "undefined"
}

function emitShinyHoverEvent(type, index) {
    Shiny.onInputChange("map_element_hover", {
        index: index,
        type: type
    });
}