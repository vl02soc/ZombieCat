(function () {

    //TODO:remove this
    tmxLoadMap("maps/sandbox.tmx", function (map) {
        console.log(map)
    });


    //console display type for debugging
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
    }

    var renderer = PIXI.autoDetectRenderer(640, 480, renderingOptions);
    document.getElementById('display').appendChild(renderer.view);


//set up pixi stage
    var stage = new PIXI.Container();
    renderer.render(stage);
    renderer.autoResize = false;
//renderer.resize(512, 512);


    tmxLoadMap("maps/sandbox.tmx", mapLoaded);

    var map;
    var imagesLocation = "maps/";

    function mapLoaded(rMap) {
        map = rMap;

        for (var i = 0; i < map.tilesets[0].images.length; i++) {
            PIXI.loader.add([imagesLocation + map.tilesets[0].images[0].source])
        }

        PIXI.loader.load(loaded);
    }


    function loaded() {
        //called when resources requested are loaded

        var tile = new PIXI.Rectangle(0, 0, map.tilesets[0].tilewidth, map.tilesets[0].tileheight);

        var rx = 0;
        var ry = 0;
        var textures = [];
        for (var i = 0; i < map.tilesets[0].images.length; i++) {

            for (var tiles = 0; tiles < map.tilesets[0].tilecount; tiles++) {
                var texture = new PIXI.Texture(PIXI.loader.resources[imagesLocation + map.tilesets[0].images[0].source].texture,
                    new PIXI.Rectangle(rx, ry, map.tilesets[0].tilewidth, map.tilesets[0].tileheight));
                textures.push(texture);

                rx += map.tilesets[0].tilewidth;
                if (rx >= map.tilesets[0].images[0].width) {
                    rx = 0;
                    ry += map.tilesets[0].tileheight;
                }
            }
        }

        var sx = 0;
        var sy = 0;
        var tileNumber = 0;

        for (var y = 0; y < map.height; y++) {
            for (var x = 0; x < map.width; x++) {
                var sprite = new PIXI.Sprite(textures[map.layers[0].data[tileNumber] - 1]);
                sprite.x = x * map.tilesets[0].tilewidth;
                sprite.y = y * map.tilesets[0].tileheight;
                stage.addChild(sprite);

                tileNumber++;
                sx += map.tilesets[0].tilewidth;
            }
            sy += map.tilesets[0].tileheight;
        }


        renderer.render(stage);

        //gameLoop();
    }


}());