function add_path_geo(map_id, map_type, path_data, layer_id, auto_highlight, highlight_colour,
                      legend, bbox, update_view, focus_layer, js_transition, billboard,
                      width_min_pixels, width_max_pixels) {

  const pathLayer = getBasePath(map_id, map_type, path_data, layer_id, auto_highlight, highlight_colour,
      legend, bbox, update_view, focus_layer, js_transition, billboard, width_min_pixels, width_max_pixels);

    addBasePathToMap(map_id, layer_id, pathLayer, map_type, legend, focus_layer, bbox, update_view);
}

function add_path_polyline( map_id, map_type, path_data, layer_id, auto_highlight, highlight_colour,
                            legend, bbox, update_view, focus_layer, js_transition, billboard,
                            width_min_pixels, width_max_pixels) {

  const pathLayer = new PathLayer({
    map_id: map_id,
    id: 'path-'+layer_id,
    data: path_data,
    pickable: true,
    widthScale: 1,
    widthMinPixels: width_min_pixels,
    widthMaxPixels: width_max_pixels,
    rounded: true,
    parameters: {
	    depthTest: false
    },
    billboard: billboard,
    getPath: d => md_decode_polyline( d.polyline ),  // needs to be one row per polyline
    getColor: d => md_hexToRGBA( d.stroke_colour ),
    getWidth: d => d.stroke_width,
    getDashArray: d => [ d.dash_size, d.dash_gap ],
    onClick: info => md_layer_click( map_id, "path", info ),
    onHover: md_on_hover,
    autoHighlight: auto_highlight,
    highlightColor: md_hexToRGBA(highlight_colour),
    transitions: js_transition || {}
  });

   addBasePathToMap(map_id, layer_id, pathLayer, map_type, legend, focus_layer, bbox, update_view);
}

function getBasePath(map_id, map_type, path_data, layer_id, auto_highlight, highlight_colour,
                     legend, bbox, update_view, focus_layer, js_transition, billboard,
                     width_min_pixels, width_max_pixels, additions = {}) {

    let pathLayer = {
        map_id: map_id,
        id: 'path-'+layer_id,
        data: path_data,
        pickable: true,
        widthScale: 1,
        widthMinPixels: width_min_pixels,
        widthMaxPixels: width_max_pixels,
        rounded: true,
        billboard: billboard,
        parameters: {
            depthTest: false
        },
        getPath: d => md_get_line_coordinates( d ),
        getColor: d => md_hexToRGBA( d.properties.stroke_colour ),
        getWidth: d => d.properties.stroke_width,
        getDashArray: d => [ d.properties.dash_size, d.properties.dash_gap ],
        onClick: info => md_layer_click( map_id, "path", info ),
        onHover: md_on_hover,
        autoHighlight: auto_highlight,
        highlightColor: md_hexToRGBA(highlight_colour),
        transitions: js_transition || {}
    };

    return new PathLayer({...pathLayer, ...additions});
}

function addBasePathToMap(map_id, layer_id, pathLayer, map_type, legend, focus_layer, bbox, update_view) {
    if( map_type === "google_map") {
        md_update_overlay( map_id, 'path-'+layer_id, pathLayer );
    } else {
        md_update_layer( map_id, 'path-'+layer_id, pathLayer );
    }

    if ( legend !== false ) {
        md_add_legend( map_id, map_type, layer_id, legend );
    }
    md_layer_view( map_id, map_type, layer_id, focus_layer, bbox, update_view );
}
