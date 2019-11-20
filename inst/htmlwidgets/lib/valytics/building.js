function add_polygon_building_geo(map_id, map_type, polygon_data, layer_id, light_settings, auto_highlight, highlight_colour,
                                  legend, bbox, update_view, focus_layer, js_transition, is_extruded,
                                  line_width_min_pixels, line_width_max_pixels, isVisible) {

    let additionalProperties = {
        updateTriggers: {
            getFillColor: [selectedCommunityIndex]
        },
        pickable: false,
        visible: isVisible,
        transitions: {
            getFillColor: {
                duration: 500,
                enter: value => [value[0] / 255, value[1] / 255, value[2] / 255, 0]
            },
            getElevation: {
                duration: 500,
                enter: () => [0]
            }
        }
    };

    const polygonLayer = getBasePolygon(map_id, map_type, polygon_data, layer_id, light_settings, auto_highlight, highlight_colour,
        legend, bbox, update_view, focus_layer, js_transition, is_extruded, line_width_min_pixels, line_width_max_pixels,
        additionalProperties);

    addBasePolygonToMap(map_id, layer_id, polygonLayer, map_type, legend, focus_layer, bbox, update_view)
}

function add_scatterplot_building_geo(map_id, map_type, scatter_data, layer_id, auto_highlight, highlight_colour, legend, bbox,
                                      update_view, focus_layer, js_transition, radius_min_pixels, radius_max_pixels,
                                      brush_radius, isVisible) {

    let additionalProperties = {
        updateTriggers: {
            getFillColor: [selectedCommunityIndex]
        },
        pickable: false,
        visible: isVisible,
        transitions: {
            getFillColor: {
                duration: 500,
                enter: value => [value[0] / 255, value[1] / 255, value[2] / 255, 0]
            }
        }
    };

    const scatterplotLayer = getBaseScatterplot(map_id, map_type, scatter_data, layer_id, auto_highlight, highlight_colour, legend, bbox,
        update_view, focus_layer, js_transition, radius_min_pixels, radius_max_pixels,
        brush_radius, additionalProperties);

    addBaseScatterplotToMap(map_id, map_type, layer_id, scatterplotLayer, legend, focus_layer, bbox, update_view)
}
