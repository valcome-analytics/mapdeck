function add_scatterplot_geo(map_id, map_type, scatter_data, layer_id, auto_highlight, highlight_colour, legend, bbox,
                             update_view, focus_layer, js_transition, radius_min_pixels, radius_max_pixels, brush_radius) {

    const scatterLayer = getBaseScatterplot(map_id, map_type, scatter_data, layer_id, auto_highlight, highlight_colour, legend, bbox,
        update_view, focus_layer, js_transition, radius_min_pixels, radius_max_pixels, brush_radius);

    addBaseScatterplotToMap(map_id, map_type, layer_id, scatterLayer, legend, focus_layer, bbox, update_view)
}

function add_scatterplot_polyline(map_id, map_type, scatter_data, layer_id, auto_highlight, highlight_colour, legend, bbox, update_view, focus_layer, js_transition, radius_min_pixels, radius_max_pixels, brush_radius) {

    var extensions = [];

    if (brush_radius > 0) {
        extensions.push(new BrushingExtension());
    }
    const scatterLayer = new ScatterplotLayer({
        map_id: map_id,
        id: 'scatterplot-' + layer_id,
        data: scatter_data,
        radiusScale: 1,
        radiusMinPixels: radius_min_pixels || 1,
        radiusMaxPixels: radius_max_pixels || Number.MAX_SAFE_INTEGER,
        lineWidthMinPixels: 0,
        stroked: true,
        filled: true,
        parameters: {
            depthTest: false
        },
        getRadius: d => d.radius,
        getPosition: d => md_decode_points(d.polyline),
        getFillColor: d => md_hexToRGBA(d.fill_colour),
        getLineColor: d => md_hexToRGBA(d.stroke_colour),
        getLineWidth: d => d.stroke_width,
        pickable: true,
        autoHighlight: auto_highlight,
        highlightColor: md_hexToRGBA(highlight_colour),
        onClick: info => md_layer_click(map_id, "scatterplot", info),
        onHover: md_on_hover,
        transitions: js_transition || {},
        brushingRadius: brush_radius,
        extensions: extensions
    });

    addBaseScatterplotToMap(map_id, map_type, layer_id, scatterLayer, legend, focus_layer, bbox, update_view)
}

function getBaseScatterplot(map_id, map_type, scatter_data, layer_id, auto_highlight, highlight_colour, legend, bbox,
                            update_view, focus_layer, js_transition, radius_min_pixels, radius_max_pixels,
                            brush_radius, additions = {}) {

    var extensions = [];

    if (brush_radius > 0) {
        extensions.push(new BrushingExtension());
    }

    let scatterplotLayer = {
        map_id: map_id,
        id: 'scatterplot-' + layer_id,
        data: scatter_data,
        radiusScale: 1,
        radiusMinPixels: radius_min_pixels || 1,
        radiusMaxPixels: radius_max_pixels || Number.MAX_SAFE_INTEGER,
        lineWidthMinPixels: 0,
        stroked: true,  // TODO( make conditional IFF stroke provided?)
        filled: true,
        parameters: {
            depthTest: false
        },
        getRadius: d => d.properties.radius,
        getPosition: d => md_get_point_coordinates(d),
        getFillColor: d => md_hexToRGBA(d.properties.fill_colour),
        getLineColor: d => md_hexToRGBA(d.properties.stroke_colour),
        getLineWidth: d => d.properties.stroke_width,
        pickable: true,
        autoHighlight: auto_highlight,
        highlightColor: md_hexToRGBA(highlight_colour),
        onClick: info => md_layer_click(map_id, "scatterplot", info),
        onHover: md_on_hover,
        brushingRadius: brush_radius,
        extensions: extensions
    };

    return new ScatterplotLayer({...scatterplotLayer, ...additions});
}

function addBaseScatterplotToMap(map_id, map_type, layer_id, scatterLayer, legend, focus_layer, bbox, update_view) {
    if (map_type === "google_map") {
        md_update_overlay(map_id, 'scatterplot-' + layer_id, scatterLayer);
    } else {
        md_update_layer(map_id, 'scatterplot-' + layer_id, scatterLayer);
    }

    if (legend !== false) {
        md_add_legend(map_id, map_type, layer_id, legend);
    }
    md_layer_view(map_id, map_type, layer_id, focus_layer, bbox, update_view);
}
