/*
Team Zombie Cat
Dead Cat Game Engine - Graphics (PIXI)

Author: William Kendall
*/

!function ($w, PIXI, dcObject, dcLayer) {
    var _graphics = null;
    var _application = null;
    var _map;
    var _textures = [];

    GraphicsManager.prototype.resourcesLoaded = false;

    function GraphicsManager(map) {
        //TODO: make setup functions non-static by taking in the setup options

        _graphics = this;
        _map = map;
        _spritePool = [];

        //Test browser surface
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

        _application = new PIXI.Application(800, 600, renderingOptions);
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
        //this function takes the images and slices them into a "gid" indexed array

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
                    //_textures[gid].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST; //prevents texture bleeding
                    gid++;
                }
            }
        }

        _graphics.resourcesLoaded = true;
        _application.ticker.add(_graphics.ticker);
        //_application()
    }

    GraphicsManager.prototype.bindTextures = function (layer) {
        for (var i = 0; i < layer.children.length; i++) {
            var obj = layer.children[i];
            if (obj.gid != 0) obj.texture = _textures[obj.gid];
        }
    };

    GraphicsManager.prototype.spriteFromLayer = function (layer) {
        //slow
        var brt = new PIXI.BaseRenderTexture(layer.width, layer.height);
        var rt = new PIXI.RenderTexture(brt);
        _application.renderer.render(layer, rt);
        var sprite = new dcObject();
        sprite.texture = rt;
        sprite.properties = layer.properties;
        return sprite;
    };

    GraphicsManager.prototype.addChild = function (child) {
        _application.stage.addChild(child);
    };


    GraphicsManager.prototype.ticker = function (delta) {
        console.log("GE ticker");
    };



    $w._DeadCat_GraphicsManager = GraphicsManager;
}(this, PIXI, _DeadCat_Object, _DeadCat_Layer);