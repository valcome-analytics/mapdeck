HTMLWidgets.widget({

    name: 'mapdeck',
    type: 'output',

    factory: function (el, width, height) {

        // TODO: define shared variables for this instance
        return {

            renderValue: function (x) {

                //console.log( "getting mapbox map??" );
                //console.log( mapboxgl );

                md_setup_window(el.id);

                /*
                // controller with events
                const myController = new deck.Controller({


                    handleEvent(event) {
                        console.log( "event" );
                        console.log( event );
                        if( event.type == "zoom") {
                            console.log("zooming");
                        }
                    }
                });

                console.log( myController );
                */

                // INITIAL VIEW
                window[el.id + 'INITIAL_VIEW_STATE'] = {
                    longitude: x.location[0],
                    latitude: x.location[1],
                    zoom: x.zoom,
                    pitch: x.pitch,
                    bearing: x.bearing
                };

                if (x.access_token === null) {
                    const deckgl = new deck.DeckGL({
                        map: false,
                        container: el.id,
                        //initialViewState: window[el.id + 'INITIAL_VIEW_STATE'],
                        viewState: window[el.id + 'INITIAL_VIEW_STATE'],
                        layers: [],
                        //onLayerHover: setTooltip
                    });
                    window[el.id + 'map'] = deckgl;
                } else {
                    const deckgl = new deck.DeckGL({
                        mapboxApiAccessToken: x.access_token,
                        //map: mapboxgl,
                        container: el.id,
                        mapStyle: x.style,
                        //initialViewState: window[el.id + 'INITIAL_VIEW_STATE'],
                        viewState: window[el.id + 'INITIAL_VIEW_STATE'],
                        layers: [],
                        //controller: myController
                        //onLayerHover: setTooltip
                        onViewStateChange: ({
                            viewState,
                            interactionState
                        }) => {

                            if (!HTMLWidgets.shinyMode) {
                                return;
                            }
                            // as per:
                            // https://github.com/uber/deck.gl/issues/3344
                            // https://github.com/SymbolixAU/mapdeck/issues/211
                            const viewport = new WebMercatorViewport(viewState);
                            const nw = viewport.unproject([0, 0]);
                            const se = viewport.unproject([viewport.width, viewport.height]);

                            viewState.viewBounds = {
                                north: nw[1],
                                east: se[0],
                                south: se[1],
                                west: nw[0]
                            };
                            viewState.interactionState = interactionState;

                            Shiny.onInputChange(el.id + '_view_change', viewState);

                            if (viewState.interactionState.isZooming != null && viewState.interactionState.isZooming) {
                                currentZoom = viewState.zoom;
                                Shiny.onInputChange(el.id + '_zoom', viewState.zoom);
                            }
                        },
                        onHover(info, event) {
                            if (!HTMLWidgets.shinyMode) {
                                return;
                            }

                            if (hoverNeedsApproval) {
                                hoverNeedsApproval = false;
                                emitShinyHoverApproveEvent(event.type == "pointermove")
                            }
                        },
                        onDragStart(info, event) {
                            if (!HTMLWidgets.shinyMode) {
                                return;
                            }
                            // Shiny.onInputChange(el.id +'_drag_start', info);
                        },
                        onDrag(info, event) {
                            if (!HTMLWidgets.shinyMode) {
                                return;
                            }
                            // Shiny.onInputChange(el.id +'_drag', info);
                        },
                        onDragEnd(info, event) {
                            if (!HTMLWidgets.shinyMode) {
                                return;
                            }
                            // Shiny.onInputChange(el.id +'_drag_end', info);
                        },
                        onResize(size) {
                            if (!HTMLWidgets.shinyMode) {
                                return;
                            }
                            // Shiny.onInputChange(el.id +'_resize', size);
                        },
                    });

                    window[el.id + 'map'] = deckgl;

                }
                md_initialise_map(el, x);
            },

            resize: function (width, height) {

                // TODO: code to re-render the widget with a new size
            }
        };
    }
});


if (HTMLWidgets.shinyMode) {

    Shiny.addCustomMessageHandler("mapdeckmap-calls", function (data) {

        console.log("mapdeck sync (impacts performance if called constant)");

        var id = data.id; // the div id of the map
        var el = document.getElementById(id);
        var map = el;
        var call = [];
        var i = 0;

        if (!map) {
            return;
        }

        for (i = 0; i < data.calls.length; i++) {

            call = data.calls[i];

            //push the mapId into the call.args
            call.args.unshift(id);

            if (call.dependencies) {
                Shiny.renderDependencies(call.dependencies);
            }

            if (window[call.method]) {
                window[call.method].apply(window[id + 'map'], call.args);
            } else {
                //console.log("Unknown function " + call.method);
            }
        }
    });
}