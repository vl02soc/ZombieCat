/*
Team Zombie Cat
Dead Cat Game Engine - Game Logic

Author: William Kendall
*/

!function ($w, dcLayer, dcObject) {

    var _GraphicsManager; //needed to get the width and height of the screen (centering sprites and what not)

    var _layers = null;
    var _mapX = 0;
    var _mapY = 0;

    var _self = null;

    function LogicManager(layers, GraphicsManager) {
        _layers = layers;
        _GraphicsManager = GraphicsManager;
        this.setMapX(0);
        this.setMapY(0);
        _self = this;
    }

    LogicManager.prototype.getMapX = function () {
        return _mapX;
    };
    LogicManager.prototype.getMapY = function () {
        return _mapY;
    };
    LogicManager.prototype.setMapX = function (x) {
        _mapX = x;
        for (layer in _layers) {
            _layers[layer].x = x;
        }
    };
    LogicManager.prototype.setMapY = function (y) {
        _mapY = y;
        for (layer in _layers) {
            _layers[layer].y = y;
        }
    };

    LogicManager.prototype.getWidth = function () {
        return _GraphicsManager.getWidth();
    };
    LogicManager.prototype.getHeight = function () {
        return _GraphicsManager.getHeight();
    };


    LogicManager.prototype.getObjectByNameInLayer = function (layer, name) {
        for (childObj in layer.children) {
            if (layer.children[childObj].name == name)
                return layer.children[childObj];
        }
        return null;

    };

    LogicManager.prototype.getLayerByName = function (name) {
        for (layer in _layers) {
            if (_layers[layer].name == name)
                return _layers[layer];
        }
        return null;
    };


    LogicManager.prototype.centerObject = function (object) {
        var movex = (_GraphicsManager.getWidth() - object.width) / 2;
        var movey = (_GraphicsManager.getHeight() - object.height) / 2;
        _self.setMapY(movey - object.y);
        _self.setMapX(movex - object.x);
    };

    LogicManager.prototype.update = function (delta) {
        //update x,y of static layers
    };


    LogicManager.prototype.hitTest = function (object1, object2) {
        /*
        var a = {};
        a.x = (object1.x + object1.collision.x) ;
        a.y = (object1.y + object1.collision.x );
        a.width = object1.collision.width;
        a.height = object1.collision.height;
        var b = {};
        b.x = (object2.x + object2.collision.x);
        b.y = (object2.y + object2.collision.y);
        b.width = object2.collision.width;
        b.height = object2.collision.height;
        return a.x + a.width > b.x && a.x < b.x + b.width && a.y + a.height > b.y && a.y < b.y + b.height;
    */
        //this is slow
        return (object1.x + object1.collision.x) + object1.collision.width > (object2.x + object2.collision.x) &&
            (object1.x + object1.collision.x) < (object2.x + object2.collision.x) + object2.collision.width &&
            (object1.y + object1.collision.x ) + object1.collision.height > (object2.y + object2.collision.y) &&
            (object1.y + object1.collision.x ) < (object2.y + object2.collision.y) + object2.collision.height;
    };

    LogicManager.prototype.hitTestLayer = function (obj, layer) {
        var objs = [];
        if (layer.properties.static == true)
            for (tile in layer.staticLayerChildren) {
                if (layer.staticLayerChildren[tile].collision.hasCollision) {
                    //not sure if this makes hittest any faster
                    //a gpu would be great at this
                    if (Math.sqrt(Math.pow(layer.staticLayerChildren[tile].x - obj.x, 2) + Math.pow(layer.staticLayerChildren[tile].y - obj.y, 2)) < obj.width + obj.height)
                        if (_self.hitTest(obj, layer.staticLayerChildren[tile]) == true) {
                            //console.log(layer.staticLayerChildren[tile].collision);
                            return true;
                        }
                }
            }
        return false;
    };

    $w._DeadCat_LogicManager = LogicManager;
}(this, _DeadCat_Layer, _DeadCat_Object);