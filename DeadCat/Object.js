/*
Team Zombie Cat
Dead Cat Game Engine - Game Object

Author: William Kendall
*/

!function ($w, PIXI) {
    Object.prototype.gid = 0;
    Object.prototype.x = 0;
    Object.prototype.y = 0;
    Object.prototype.width = 0;
    Object.prototype.height = 0;
    Object.prototype.sprite = null;

    function Object() {
        //constructor
    }

    $w._DeadCat_Object = Object;
}(this, PIXI);