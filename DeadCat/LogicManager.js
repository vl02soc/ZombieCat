/*
Team Zombie Cat
Dead Cat Game Engine - Game Logic

Author: William Kendall
*/

!function ($w, dcLayer, dcObject) {
    var _layers = null;
    var _mapX = 0;
    var _mapY = 0;


    function LogicManager(layers) {
        _layers = layers;
    }

    LogicManager.prototype.getMapX = function (x) {
        return _mapX;
    };
    LogicManager.prototype.getMapY = function (y) {
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

    LogicManager.prototype.getObjectByName = function (layer) {
//TODO: stuff here
    };


    LogicManager.prototype.centerObject = function (object) {
//TODO: things like center the player, and the map the player is on.
    };

    LogicManager.prototype.update = function (delta) {

    };


    $w._DeadCat_LogicManager = LogicManager;
}(this, _DeadCat_Layer, _DeadCat_Object);