function add_community_geo(map_id, map_type, polygon_data, layer_id, light_settings, auto_highlight, highlight_colour,
                          legend, bbox, update_view, focus_layer, js_transition, is_extruded,
                          line_width_min_pixels, line_width_max_pixels) {

    globalMapId = map_id;


    const polygonLayer = getBasePolygon(map_id, map_type, polygon_data, layer_id, light_settings, auto_highlight, highlight_colour,
        legend, bbox, update_view, focus_layer, js_transition, is_extruded,
        line_width_min_pixels, line_width_max_pixels);

    addBasePolygonToMap(map_id, layer_id, polygonLayer, map_type, legend, focus_layer, bbox, update_view)
}
