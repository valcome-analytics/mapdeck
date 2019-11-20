mapdeckDistrictDependency <- function() {
    list(
        createHtmlDependency(
            name = "district",
            version = "1.0.0",
            src = system.file("htmlwidgets/lib/valytics", package = "mapdeck"),
            script = c("district.js"),
            all_files = FALSE
        )
    )
}

add_district_as_polygon <- function(
    map,
    data = get_map_data(map),
    polyline = NULL,
    stroke_colour = NULL,
    stroke_width = NULL,
    stroke_opacity = NULL,
    fill_colour = NULL,
    fill_opacity = NULL,
    elevation = NULL,
    tooltip = NULL,
    auto_highlight = FALSE,
    highlight_colour = "#AAFFFFFF",
    light_settings = list(),
    layer_id = NULL,
    id = NULL,
    palette = "viridis",
    na_colour = "#808080FF",
    legend = FALSE,
    legend_options = NULL,
    legend_format = NULL,
    update_view = TRUE,
    focus_layer = FALSE,
    line_width_min_pixels = 0,
    line_width_max_pixels = 100000,
    digits = 6,
    transitions = NULL
) {
    map <- addDependency(map, mapdeckDistrictDependency())

    add_polygon(
        map,
        data,
        polyline,
        stroke_colour,
        stroke_width,
        stroke_opacity,
        fill_colour,
        fill_opacity,
        elevation,
        tooltip,
        auto_highlight,
        highlight_colour,
        light_settings,
        layer_id,
        id,
        palette,
        na_colour,
        legend,
        legend_options,
        legend_format,
        update_view,
        focus_layer,
        line_width_min_pixels,
        line_width_max_pixels,
        digits,
        transitions,
        TRUE,
        "add_polygon_district"
    )
}

add_district_as_path <- function(
    map,
    data = get_map_data(map),
    polyline = NULL,
    stroke_colour = NULL,
    stroke_width = NULL,
    stroke_opacity = NULL,
    dash_size = NULL,
    dash_gap = NULL,
    tooltip = NULL,
    billboard = FALSE,
    layer_id = NULL,
    id = NULL,
    auto_highlight = FALSE,
    highlight_colour = "#AAFFFFFF",
    palette = "viridis",
    na_colour = "#808080FF",
    legend = FALSE,
    legend_options = NULL,
    legend_format = NULL,
    update_view = TRUE,
    focus_layer = FALSE,
    width_min_pixels,
    width_max_pixels,
    digits = 6,
    transitions = NULL
) {
    map <- addDependency(map, mapdeckDistrictDependency())

    add_path(
        map,
        data,
        polyline,
        stroke_colour,
        stroke_width,
        stroke_opacity,
        dash_size,
        dash_gap,
        tooltip,
        billboard,
        layer_id,
        id,
        auto_highlight,
        highlight_colour,
        palette,
        na_colour,
        legend,
        legend_options,
        legend_format,
        update_view,
        focus_layer,
        width_min_pixels,
        width_max_pixels,
        digits,
        transitions,
        "add_path_district"
    )
}
