function md_setup_window(map_id) {

    globalMapId = map_id;

    md_setup_window_objects(map_id);
    md_setup_mapdeck_div(map_id);

    md_setup_legend(map_id);
    md_setup_title(map_id);
    md_setup_tooltip(map_id);
}

function md_setup_window_objects(map_id) {
    window[map_id + 'layers'] = []; // keep track of layers for overlaying multiple
    window[map_id + 'legendPositions'] = [];     // array for keeping a referene to legend positions
    window[map_id + 'mapTitlePositions'] = [];
    window[map_id + 'mapdeckBounds'] = [];       // store the bounding box of each layer
    window[map_id + 'globalBox'] = [];
    window[map_id + 'currentZoomLevel'] = 0;
}

function md_setup_mapdeck_div(map_id) {
    var mapDiv = document.getElementById(map_id);
    mapDiv.className = 'mapdeckmap';
}

function md_setup_legend(map_id) {
    var mapDiv = document.getElementById(map_id);
    var legendContainer = document.createElement('div');
    legendContainer.className = "legendContainer";
    legendContainer.id = "legendContainer" + map_id;
    mapDiv.appendChild(legendContainer);
}

function md_setup_title(map_id) {
    console.log("setup_title");
    var mapDiv = document.getElementById(map_id);
    var mapTitle = document.createElement('div');
    mapTitle.className = "mapTitleContainer";
    mapTitle.id = "mapTitleContainer" + map_id;
    mapDiv.appendChild(mapTitle);
}

function md_setup_tooltip(map_id) {
    var mapDiv = document.getElementById(map_id);
    var tooltipdiv = document.createElement('div');
    tooltipdiv.setAttribute("class", "mapdecktooltip");
    tooltipdiv.setAttribute("id", "mapdecktooltip" + map_id);
    mapDiv.appendChild(tooltipdiv);
}

function md_div_exists(div_element) {
    return document.getElementById(div_element);
}


// following: https://codepen.io/vis-gl/pen/pLLQpN
// and: https://beta.observablehq.com/@pessimistress/deck-gl-geojsonlayer-example
function md_on_hover({x, y, object, layer, index}, event) {
    // object is the data object sent to the layer function

    if (HTMLWidgets.shinyMode) {

        let layerId = layer.id;
        layerId = layerId.replace('-', '_');

        if (layerId.indexOf("buildings") !== -1) {
            // console.log('==== building ===');
            // console.log(index);
            // console.log(event);
            event.stopPropagation()
        }
        if (layerId.indexOf("communities") !== -1 && selectedCommunityIndex !== index) {
            selectedCommunityIndex = index;
            buildingOpacity = 0;
            Shiny.onInputChange(layer.props.map_id + "_" + layerId + "_hover", index);
            Shiny.onInputChange("map_redraw_building", {});
        }
    }

    if (!md_div_exists('mapdecktooltip' + layer.props.map_id)) {
        md_setup_tooltip(layer.props.map_id);
    }

    const tooltip = document.getElementById('mapdecktooltip' + layer.props.map_id);
    var tt;

    //console.log( tooltip );
    //console.log( object );
    //console.log( x, ", ", y );

    if (object) {
        if (object.properties !== undefined) {
            if (object.properties.tooltip !== undefined) {
                tt = object.properties.tooltip;
            } else {
                return;
            }
        } else if (object.tooltip !== undefined) {
            tt = object.tooltip;
        } else {
            return;
        }

        tooltip.style.display = 'block';
        tooltip.style.top = `${y}px`;
        tooltip.style.left = `${x}px`;
        tooltip.innerHTML = `<div>${tt}</div>`;
    } else {
        tooltip.style.display = 'none';
        tooltip.innerHTML = '';
    }
}


function md_initialise_map(el, x) {

    // call initial layers
    if (x.calls !== undefined) {

        for (layerCalls = 0; layerCalls < x.calls.length; layerCalls++) {

            //push the map_id into the call.args
            x.calls[layerCalls].args.unshift(el.id);

            if (window[x.calls[layerCalls].functions]) {

                window[x.calls[layerCalls].functions].apply(window[el.id + 'map'], x.calls[layerCalls].args);

            } else {
                //console.log("Unknown function " + x.calls[layerCalls]);
            }
        }
    }

}


function md_findObjectElementByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return i;
        }
    }
    return -1;
}

function md_layer_clear(map_id, map_type, layer_id, layer) {

    if (map_type == "mapdeck") {
        md_clear_layer(map_id, layer + '-' + layer_id);
    } else if (map_type == "google_map") {
        md_clear_overlay(map_id, layer + '-' + layer_id);
    }

    md_remove_from_bounds(map_id, layer_id);
    md_update_location(map_id, map_type);
    md_clear_legend(map_id, map_type, layer_id);
}

function md_update_layer(map_id, layer_id, layer) {

    var elem = md_findObjectElementByKey(window[map_id + 'map'].props.layers, 'id', layer_id);
    if (elem != -1) {
        window[map_id + 'layers'][elem] = layer;
    } else {
        window[map_id + 'layers'].push(layer);
    }

    console.log(window[map_id + 'layers']);

    // ## issue 137
    var vs = window[map_id + 'map'].viewState;

    window[map_id + 'map'].setProps({
        layers: [...window[map_id + 'layers']],
        viewState: vs
    });
}

function md_clear_layer(map_id, layer_id) {

    var elem = md_findObjectElementByKey(window[map_id + 'map'].props.layers, 'id', layer_id);
    if (elem != -1) {
        window[map_id + 'layers'].splice(elem, 1);
    }

    // ## issue 137
    var vs = window[map_id + 'map'].viewState;
    window[map_id + 'map'].setProps({
        layers: [...window[map_id + 'layers']],
        viewState: vs
    });
}


function md_update_overlay(map_id, layer_id, layer) {

    if (window[map_id + 'layers'] == null) {
        window[map_id + 'layers'] = [];
    }

    if (window[map_id + 'GoogleMapsOverlay'] == null) {
        window[map_id + 'GoogleMapsOverlay'] = new GoogleMapsOverlay();
    }

    var elem = md_findObjectElementByKey(window[map_id + 'layers'], 'id', layer_id);

    if (elem != -1) {
        window[map_id + 'layers'][elem] = layer;
    } else {
        window[map_id + 'layers'].push(layer);
    }

    window[map_id + 'GoogleMapsOverlay'].setProps({layers: [...window[map_id + 'layers']]});
    const overlay = window[map_id + 'GoogleMapsOverlay'];
    overlay.setMap(window[map_id + 'map']);
}


function md_clear_overlay(map_id, layer_id) {
    var elem = md_findObjectElementByKey(window[map_id + 'layers'], 'id', layer_id);
    if (elem != -1) {
        window[map_id + 'layers'].splice(elem, 1);
    }

    window[map_id + 'GoogleMapsOverlay'].setProps({layers: [...window[map_id + 'layers']]});
    const overlay = window[map_id + 'GoogleMapsOverlay'];
    overlay.setMap(window[map_id + 'map']);

}

function md_layer_click(map_id, layer, info) {

    if (!HTMLWidgets.shinyMode) {
        return;
    }

    var eventInfo = {
        index: info.index,
        color: info.color,
        object: info.object,
        layerId: info.layer_id,
        lat: info.lngLat[1],
        lon: info.lngLat[0]
    };

    eventInfo = JSON.stringify(eventInfo);
    Shiny.onInputChange(map_id + "_" + layer + "_click", eventInfo);
}

function md_hide_layer(map_id, layer_id) {

    let index = md_findObjectElementByKey(window[map_id + 'map'].props.layers, 'id', layer_id);
    console.log(index);

    if (index !== -1) {
        let layer = window[map_id + 'layers'][index];
        console.log(layer);
    }

    // ## issue 137
    var vs = window[map_id + 'map'].viewState;
    window[map_id + 'map'].setProps({
        layers: [...window[map_id + 'layers']],
        viewState: vs
    });
}
