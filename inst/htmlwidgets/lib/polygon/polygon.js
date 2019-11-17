function add_polygon_geo(map_id, map_type, polygon_data, layer_id, light_settings, auto_highlight, highlight_colour,
                         legend, bbox, update_view, focus_layer, js_transition, is_extruded,
                         line_width_min_pixels, line_width_max_pixels) {

    const polygonLayer = getBasePolygon(map_id, map_type, polygon_data, layer_id, light_settings, auto_highlight, highlight_colour,
        legend, bbox, update_view, focus_layer, js_transition, is_extruded,
        line_width_min_pixels, line_width_max_pixels);

    addBasePolygonToMap(map_id, layer_id, polygonLayer, map_type, legend, focus_layer, bbox, update_view)
}

function add_polygon_polyline(map_id, map_type, polygon_data, layer_id, light_settings, auto_highlight, highlight_colour,
                              legend, bbox, update_view, focus_layer, js_transition, is_extruded,
                              line_width_min_pixels, line_width_max_pixels) {

    const polygonLayer = new PolygonLayer({
        map_id: map_id,
        id: 'polygon-' + layer_id,
        data: polygon_data,
        pickable: true,
        stroked: true,
        filled: true,
        wireframe: false,
        extruded: is_extruded,
        lineWidthMinPixels: line_width_min_pixels,
        lineWidthMaxPixels: line_width_max_pixels,
        getPolygon: d => decode_polygons(d.polyline),
        getLineColor: d => md_hexToRGBA(d.stroke_colour),
        getFillColor: d => md_hexToRGBA(d.fill_colour),
        getLineWidth: d => d.stroke_width,
        getElevation: d => d.elevation,
        lightSettings: light_settings,
        autoHighlight: auto_highlight,
        highlightColor: md_hexToRGBA(highlight_colour),
        onHover: md_on_hover,
        onClick: info => md_layer_click(map_id, "polygon", info),
        transitions: js_transition || {}
    });

    addBasePolygonToMap(map_id, layer_id, polygonLayer, map_type, legend, focus_layer, bbox, update_view)
}

function decode_polygons(polylines) {
    var i, j, p;
    var coordinates = [];
    var lines = [];

    for (i = 0; i < polylines.length; i++) {
        lines = polylines[i];

        for (j = 0; j < lines.length; j++) {
            p = lines[j];
            if (p != "-") {
                coordinates.push(md_decode_polyline(p));
            }
        }
    }
    return coordinates;
}

function getBasePolygon(map_id, map_type, polygon_data, layer_id, light_settings, auto_highlight, highlight_colour,
                        legend, bbox, update_view, focus_layer, js_transition, is_extruded,
                        line_width_min_pixels, line_width_max_pixels) {
    return new PolygonLayer({
        map_id: map_id,
        id: 'polygon-' + layer_id,
        data: polygon_data,
        pickable: true,
        stroked: true,
        filled: true,
        wireframe: false,
        extruded: is_extruded,
        lineWidthMinPixels: line_width_min_pixels,
        lineWidthMaxPixels: line_width_max_pixels,
        getPolygon: d => md_get_polygon_coordinates(d),
        getLineColor: d => md_hexToRGBA(d.properties.stroke_colour),
        getFillColor: (d, o) => md_hexToRGBA(d.properties.fill_colour, o),
        getLineWidth: d => d.properties.stroke_width,
        getElevation: d => d.properties.elevation,
        updateTriggers: {
            getFillColor: [selectedCommunityIndex, currentZoom]
        },
        lightSettings: light_settings,
        autoHighlight: auto_highlight,
        highlightColor: md_hexToRGBA(highlight_colour),
        onHover: (info, event) => md_on_hover(info, event),
        onClick: info => md_layer_click(map_id, "polygon", info),
        transitions: js_transition || {}
    });
}

function addBasePolygonToMap(map_id, layer_id, polygonLayer, map_type, legend, focus_layer, bbox, update_view) {
    if (map_type === "google_map") {
        md_update_overlay(map_id, 'polygon-' + layer_id, polygonLayer);
    } else {
        md_update_layer(map_id, 'polygon-' + layer_id, polygonLayer);
    }

    if (legend !== false) {
        md_add_legend(map_id, map_type, layer_id, legend);
    }
    md_layer_view(map_id, map_type, layer_id, focus_layer, bbox, update_view);
}
