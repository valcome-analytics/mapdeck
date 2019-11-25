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

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;

        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};