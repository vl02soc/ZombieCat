/*
Team Zombie Cat
Dead Cat Game Engine

Author: William Kendall
 */

!function ($w, Utils, GraphicsManager, KeyboardManager, LogicManager, dcObject, dcLayer) {
    var _GraphicsManager = null;
    DeadCat.prototype.KeyboardManager = null;
    DeadCat.prototype.LogicManager = null;

    var _engine;
    var _map = null;    //this is the Tiled JSON object
    var _layers = null;

    var _gameSetup = null;
    var _gameupdate = null;

    function DeadCat(mapFile, gameSetup, gameLoop) {
        _engine = this;
        _engine.Utils = new Utils();
        _engine.KeyboardManager = new KeyboardManager();

        //TODO: test that the map was downloaded, or if an error (this is done by editing utils.js to return the error)
        _engine.Utils.loadJSON(mapFile, mapLoaded);

        _layers = [];


        _gameSetup = gameSetup;
        _gameupdate = gameLoop;

    }


    function mapLoaded(rMap) {
        _map = rMap;

        console.log(_map); //for debugging reasons
        //TODO: create objects, load tilesets
        _GraphicsManager = new GraphicsManager(_map);

        //load layers
        for (var lay = 0; lay < _map.layers.length; lay++) {
            var layer = _map.layers[lay];
            var newLayer = new dcLayer();
            if (layer.hasOwnProperty("properties"))
                newLayer.properties = layer.properties;
            if (layer.hasOwnProperty("name"))
                newLayer.name = layer.name;

            if (layer.type == "tilelayer") {
                var posX = 0;
                var posY = 0;
                for (var layerY = 0; layerY < layer.height; layerY++) {
                    for (var layerX = 0; layerX < layer.width; layerX++) {
                        if (layer.data[layerY * layer.width + layerX] === 0) {
                            posX += _map.tilewidth;
                            continue; //gid of 0 is nothing
                        }
                        var newTile = new dcObject();
                        newTile.x = posX;
                        newTile.y = posY;
                        newTile.width = _map.tilewidth;
                        newTile.height = _map.tileheight;
                        newTile.gid = layer.data[layerY * layer.width + layerX];
                        newLayer.addChild(newTile);

                        posX += _map.tilewidth;
                    }
                    posY += _map.tileheight;
                    posX = 0;
                }

            }
            else if (layer.type == "objectgroup") {
                for (var obji = 0; obji < layer.objects.length; obji++) {
                    var obj = layer.objects[obji];
                    var newObj = new dcObject();
                    if (obj.hasOwnProperty("name"))
                        newObj.name = obj.name;
                    newObj.x = obj.x;
                    newObj.y = obj.y - obj.height; //tiled objects are reference from their bottom edge
                    newObj.width = obj.width;
                    newObj.height = obj.height;
                    newObj.gid = obj.gid;
                    newLayer.addChild(newObj);
                }
            }

            //and new layer to layers array
            _layers.push(newLayer);
        }

        _GraphicsManager.ticker = _update;   //graphics manager maintains the frame rate, thus, the game loop

    }

    //TODO: this is a temp example of some movement
    var gml = false;

    function _update(delta) {
        if (_GraphicsManager.resourcesLoaded === false) {
            //wait until resources loaded
            return;
        }
        if (gml === false) {
            //setup

            //do for each layer in layers array
            for (layer in _layers) {
                //bind all the textures to their objects
                _GraphicsManager.bindTextures(_layers[layer]);

                //build static layers ( no animation )
                if (_layers[layer].properties.static == true) {
                    //should remove the layer and add a texture for the hole layer
                    var newSprite = _GraphicsManager.spriteFromLayer(_layers[layer]);
                    newSprite.staticLayer = true;
                    newSprite.layer = _layers[layer];
                    _GraphicsManager.addChild(newSprite);
                }
                else {
                    _GraphicsManager.addChild(_layers[layer]);
                }
            }

            gml = true; //game all setup
            _engine.LogicManager = new LogicManager(_layers, _GraphicsManager);
            _gameSetup();
        }

        //begin game loop
        _engine.LogicManager.update(delta);
        _gameupdate(_engine, delta);
    }

    $w.DeadCat = DeadCat;

}(this, Utils, _DeadCat_GraphicsManager, _DeadCat_KeyboardManager, _DeadCat_LogicManager, _DeadCat_Object, _DeadCat_Layer);