mapdeckBuildingDependency <- function() {
	list(
		createHtmlDependency(
		name = "building",
		version = "1.0.0",
		src = system.file("htmlwidgets/lib/valytics", package = "mapdeck"),
		script = c("building.js"),
		all_files = FALSE
		)
	)
}

add_building_as_polygon <- function(
	map,
	data = get_map_data(map),
	identifier = NULL,
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
	transitions = NULL,
	is_visible = TRUE
) {

	map <- addDependency(map, mapdeckBuildingDependency())

	add_polygon(
		map,
		data,
		identifier,
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
		is_visible,
		"add_polygon_building"
	)
}

add_building_as_scatterplot <- function(
	map,
	data = get_map_data(map),
	lon = NULL,
	lat = NULL,
	polyline = NULL,
	radius = NULL,
	radius_min_pixels = 1,
	radius_max_pixels = NULL,
	fill_colour = NULL,
	fill_opacity = NULL,
	stroke_colour = NULL,
	stroke_width = NULL,
	stroke_opacity = NULL,
	tooltip = NULL,
	auto_highlight = FALSE,
	highlight_colour = "#AAFFFFFF",
	layer_id = NULL,
	id = NULL,
	palette = "viridis",
	na_colour = "#808080FF",
	legend = FALSE,
	legend_options = NULL,
	legend_format = NULL,
	digits = 6,
	update_view = TRUE,
	focus_layer = FALSE,
	transitions = NULL,
	brush_radius = NULL,
	is_visible = TRUE
) {

	map <- addDependency(map, mapdeckBuildingDependency())

	add_scatterplot(
		map,
		data,
		lon,
		lat,
		polyline,
		radius,
		radius_min_pixels,
		radius_max_pixels,
		fill_colour,
		fill_opacity,
		stroke_colour,
		stroke_width,
		stroke_opacity,
		tooltip,
		auto_highlight,
		highlight_colour,
		layer_id,
		id,
		palette,
		na_colour,
		legend,
		legend_options,
		legend_format,
		digits,
		update_view,
		focus_layer,
		transitions,
		brush_radius,
		is_visible,
		"add_scatterplot_building"
	)
}
