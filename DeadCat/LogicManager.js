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

    };


    $w._DeadCat_LogicManager = LogicManager;
}(this, _DeadCat_Layer, _DeadCat_Object);