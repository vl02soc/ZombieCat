/*
Team Zombie Cat
Dead Cat Game Engine - Graphics (PIXI)

Author: William Kendall
*/

!function ($w, PIXI, Object) {
    var _graphics = null;
    var _application = null;
    var _map;
    var _textures = [];

    var _spritePool = null;
    var _spritePoolSize = 0;
    var _spritePoolUsedIndex = 0;

    var _resourcesLoaded = false;

    function GraphicsManager(map) {
        //TODO: make setup functions non-static by taking in the setup options

        _graphics = this;
        _map = map;
        _spritePool = [];

        //Text browser surface
        var pixiSurfaceType = "WebGL";
        if (!PIXI.utils.isWebGLSupported()) {
            pixiSurfaceType = "Canvas";
        }
        PIXI.utils.sayHello(pixiSurfaceType);

        //setup the pixi renderer
        var renderingOptions = {
            transparent: false,
            resolution: 1,
            backgroundColor: '0x000000',
            antialias: false,
        };

        _application = new PIXI.Application(640, 480, renderingOptions);
        $w.document.getElementById('display').appendChild(_application.view);
        //todo: check this function
        _application.ticker.speed = .5; //30 fps? maybe?


        //load image(s)
        //TODO: fix static assets location
        var imagesLocation = "maps/";
        for (var ts = 0; ts < _map.tilesets.length; ts++) {
            //loader: resource name, resource location
            PIXI.loader.add(_map.tilesets[ts].image, imagesLocation + _map.tilesets[ts].image);
        }
        PIXI.loader.load(imagesLoaded);

    }

    function imagesLoaded() {
        //PIXI callback from loading images

        //build textures array. gid indexed
        for (var ts = 0; ts < _map.tilesets.length; ts++) {
            var tileset = _map.tilesets[ts];
            var gid = tileset.firstgid;
            var width = tileset.imagewidth / tileset.tilewidth;
            var height = tileset.imageheight / tileset.tileheight;
            //console.log("Tile width: "+width +" Tile Height: "+ height);
            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    _textures[gid] = new PIXI.Texture(PIXI.loader.resources[tileset.image].texture,
                        new PIXI.Rectangle(x * tileset.tilewidth, y * tileset.tileheight, tileset.tilewidth, tileset.tileheight));
                    gid++;
                }
            }
        }

        //create sprite pool
        _spritePoolSize = 100;
        for (var sp = 0; sp < _spritePoolSize; sp++) {
            _spritePool[sp] = new PIXI.Sprite();
        }

        _resourcesLoaded = true;
        _application.ticker.add(_graphics.ticker);
        //_application()
    }


    GraphicsManager.prototype.update = function (objects) {
        //remove old sprites
        //_application.stage.removeChildren();
        _spritePoolUsedIndex = 0;
        if (_resourcesLoaded == false)
            return;

        //render sub objects
        for (var o = 0; o < objects.length; o++) {
            var object = objects[o];

            //check if visible sprite
            if (object.gid == 0)
                continue;

            //TODO:test if object is on the display area
            //allocate sprite. soon: if near on screen, remove sprite if not
            if (object.sprite === null) {
                object.sprite = _spritePool.pop();
                object.sprite.texture = _textures[object.gid];
                _application.stage.addChild(object.sprite);
            }

            //get sprite from pool
            object.sprite.x = object.x;
            object.sprite.y = object.y;
            object.sprite.width = object.width;
            object.sprite.height = object.height;

        }

    };


    GraphicsManager.prototype.ticker = function (delta) {
    };


    GraphicsManager.prototype.render = function () {
        _application.render(_mainContainer);
    };


    $w._DeadCat_GraphicsManager = GraphicsManager;
}(this, PIXI, _DeadCat_Object);