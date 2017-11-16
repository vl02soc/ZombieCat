/*
Team Zombie Cat
Dead Cat Game Engine - Game Logic (extend this class)

Author: William Kendall
*/

!function ($w, KeyboardManager, dcLayer, dcObject) {
    var _map = null;
    var _objects = null;
    var _KeyboardManager = null;

    function LogicManager(mapLayer, objectLayer) {
        _KeyboardManager = new KeyboardManager();
        _map = mapLayer;
        _objects = objectLayer;

    }

    LogicManager.prototype.getObjectByName = function () {
//TODO: stuff here
    };


    LogicManager.prototype.centerObject = function (object) {
//TODO: things like center the player, and the map the player is on.
    };

    LogicManager.prototype.update = function (delta) {
        //temp movement functionality
        var mvDelta = delta * 5;
        var moveX = 0;
        var moveY = 0;

        if (_KeyboardManager.keysPressed[87] == true)
            moveY += mvDelta;
        if (_KeyboardManager.keysPressed[83] == true)
            moveY -= mvDelta;
        if (_KeyboardManager.keysPressed[65] == true)
            moveX += mvDelta;
        if (_KeyboardManager.keysPressed[68] == true)
            moveX -= mvDelta;

        if (moveX != 0 && moveY != 0) {
            moveX = moveX / 1.3;
            moveY = moveY / 1.3;
        }
        _map.y += moveY;
        _map.x += moveX;
    };


    $w._DeadCat_LogicManager = LogicManager;
}(this, _DeadCat_KeyboardManager, _DeadCat_Layer, _DeadCat_Object);