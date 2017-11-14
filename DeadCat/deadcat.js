/*
Team Zombie Cat
Dead Cat Game Engine

Author: William Kendall
 */

!function ($w, Utils, Object, GraphicsManager) {
    var _GraphicsManager = null;
    var _map = null;
    var _objects = null;

    function DeadCat(mapFile) {
        _engine = this;
        _engine.Utils = new Utils();

        //TODO: test that the map was downloaded, or if an error (this is done by editing utils.js to return the error)
        _engine.Utils.loadJSON(mapFile, mapLoaded);
    }


    function mapLoaded(rMap) {
        _map = rMap;
        console.log(_map); //for debugging reasons
        //TODO: create objects, load tilesets
        _GraphicsManager = new GraphicsManager(_map);

        //create object array
        _objects = [];

        //load layers
        for (var lay = 0; lay < _map.layers.length; lay++) {
            var layer = _map.layers[lay];
            if (layer.type == "tilelayer") {
                var posX = 0;
                var posY = 0;
                for (var layerY = 0; layerY < layer.height; layerY++) {
                    for (var layerX = 0; layerX < layer.width; layerX++) {
                        var newTile = {};
                        newTile.x = posX;
                        newTile.y = posY;
                        newTile.width = _map.tilewidth;
                        newTile.height = _map.tileheight;
                        newTile.gid = layer.data[layerY * layer.width + layerX];
                        _objects.push(newTile);

                        posX += _map.tilewidth;
                    }
                    posY += _map.tileheight;
                    posX = 0;
                }

            }
        }

        _GraphicsManager.ticker = update;
    }

    function update(delta) {
        _GraphicsManager.update(_objects);
    }

    $w.DeadCat = DeadCat;

}(this, Utils, _DeadCat_Object, _DeadCat_GraphicsManager);