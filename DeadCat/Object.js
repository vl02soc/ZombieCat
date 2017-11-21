/*
Team Zombie Cat
Dead Cat Game Engine - Game Objects

Author: William Kendall
*/

!function ($w, PIXI) {
    Layer.prototype = Object.create(PIXI.Container.prototype);
    Layer.prototype.constructor = Layer;

    Layer.prototype.texture = null;

    Layer.prototype.name = "";
    Layer.prototype.properties = {};//loads from Tiled JSON file
    Layer.prototype.properties.static = false;

    var _self = null;

    function Layer() {
        PIXI.Container.call(this);
        _self = this;

    }

    $w._DeadCat_Layer = Layer;
}(this, PIXI);


!function ($w, PIXI) {
    gObject.prototype = Object.create(PIXI.Sprite.prototype);
    gObject.prototype.constructor = gObject;

    gObject.prototype.name = "";
    gObject.prototype.gid = 0; //set gid
    gObject.prototype.gidLast = 0; //changes in gid
    gObject.prototype.properties = null;

    function gObject() {
        PIXI.Sprite.call(this);
        //constructor
    }

    $w._DeadCat_Object = gObject;
}(this, PIXI);