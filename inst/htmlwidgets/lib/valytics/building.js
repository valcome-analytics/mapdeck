function add_polygon_building_geo(map_id, map_type, polygon_data, layer_id, light_settings, auto_highlight, highlight_colour,
                                  legend, bbox, update_view, focus_layer, js_transition, is_extruded,
                                  line_width_min_pixels, line_width_max_pixels) {

    const polygonLayer = getBasePolygon(map_id, map_type, polygon_data, layer_id, light_settings, auto_highlight, highlight_colour,
        legend, bbox, update_view, focus_layer, js_transition, is_extruded, line_width_min_pixels, line_width_max_pixels);

    addBasePolygonToMap(map_id, layer_id, polygonLayer, map_type, legend, focus_layer, bbox, update_view)
}

function add_scatterplot_building_geo(map_id, map_type, scatterplot_data, layer_id, light_settings, auto_highlight, highlight_colour,
                                      legend, bbox, update_view, focus_layer, js_transition, billboard,
                                      width_min_pixels, width_max_pixels) {

    let additionalProperties = {
        updateTriggers: {
            getFillColor: [selectedCommunityIndex]
        },
        transitions: {
            getFillColor: {
                duration: 1000,
                enter: value => [value[0], value[1], value[2], 0] // fade in
            }
        }
    };

    const scatterplotLayer = getBaseScatterplot(map_id, map_type, scatterplot_data, layer_id, light_settings,
        auto_highlight, highlight_colour, legend, bbox, update_view, focus_layer, js_transition, billboard,
        width_min_pixels, width_max_pixels, additionalProperties);

    addBaseScatterplotToMap(map_id, map_type, layer_id, scatterplotLayer, legend, focus_layer, bbox, update_view)
}
