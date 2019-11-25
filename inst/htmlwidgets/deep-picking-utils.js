function handleDeepPickingForBuildingOnHover(x, y, object) {
    deepPickedBuilding = doDeepPickingForBuildingAt(x, y, object);

    if (deepPickedBuilding != null) {
        console.log("+++ Found deep picked building during hover");
        selectedBuildingIndex = deepPickedBuilding.index;
        emitShinyHoverEvent("BUILDING", selectedBuildingIndex)
    } else if (selectedBuildingIndex != -1) {
        selectedBuildingIndex = -1 // when switching from a building to a communtiy we have to reset the selected building
        emitShinyHoverEvent("BUILDING", selectedBuildingIndex)
        console.log("--- Resetting building index")
    }
}

function doDeepPickingForBuildingAt(x, y, object) {
    var result = findDeepBuildingsAt(x, y, object)

    if (isNotEmpty(result)) {
        return result[0];
    } else {
        return null;
    }
}

function findDeepBuildingsAt(x, y, object) {
    identifier = object.properties.identifier;
    console.log("Perform deep pick for buildings in community: " + identifier);

    buildingLayerIds = findBuildingLayersByIdentifier(identifier);

    if (buildingLayerIds.length > 0) {
        return pickMultipleObjects(x, y, buildingLayerIds);
    } else {
        return [];
    }
}

function findBuildingLayersByIdentifier(identifier) {
    maplayers = window["mapmap"].props.layers;
    buildingLayerIds = [];

    for (var i = 0; i < maplayers.length; i++) {
        if (isPolygonBuildingLayerWithIdentifier(maplayers[i], identifier)) {
            buildingLayerIds.push(maplayers[i].id);
        }
    }

    return buildingLayerIds;
}

function isPolygonBuildingLayerWithIdentifier(mapLayer, identifier) {
    return mapLayer.id.indexOf("polygon-building") !== -1 &&
        mapLayer.id.indexOf(identifier) !== -1
}

function pickMultipleObjects(x, y, layerIds) {
    return window["mapmap"].pickMultipleObjects({
        x: x,
        y: y,
        radius: 15,
        layerIds: layerIds,
        depth: 3
    });
}