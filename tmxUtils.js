/*
William Kendall
yet another tmx file reader
 */

function tmxLoadMap(fileName, callback) {
    function intOrString(str) {
        var int = Number(str);
        if (String(int) === str)
            return int;
        else
            return str;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = xhttp.responseXML;
            var map = {};
            map.tilesets = [];
            map.layers = [];

            var root = xmlDoc.getElementsByTagName("map")[0];
            for (var a = 0; a < root.attributes.length; a++) {
                map[root.attributes[a].name] = intOrString(root.attributes[a].value);
            }

            for (var node = 0; node < root.children.length; node++) {
                var child = root.children[node];
                switch (child.nodeName) {
                    case "tileset":
                        var tile = {};  //not sure if there is any hanging issues with this
                        tile.images = [];
                        for (var a = 0; a < child.attributes.length; a++) {
                            tile[child.attributes[a].name] = intOrString(child.attributes[a].value);
                        }

                        for (var cin = 0; cin < child.children.length; cin++) {
                            var childImagesNodes = child.children[cin];
                            var image = {};
                            for (var cini = 0; cini < childImagesNodes.attributes.length; cini++) {
                                image[childImagesNodes.attributes[cini].name] = intOrString(childImagesNodes.attributes[cini].value);
                            }
                            tile.images.push(image);
                        }

                        map.tilesets.push(tile);
                        break;

                    case "layer":
                        var layer = {};
                        for (var a = 0; a < child.attributes.length; a++) {
                            layer[child.attributes[a].name] = intOrString(child.attributes[a].value);
                        }

                        //messy
                        //layer.data = child.getElementsByTagName("data")[0].firstChild.nodeValue;
                        var data = child.getElementsByTagName("data")[0].firstChild.nodeValue.split(",");
                        layer.data = [];
                        for (var dp = 0; dp < data.length; dp++) {
                            layer.data.push(parseInt(data[dp]));
                        }

                        map.layers.push(layer);
                        break;
                }
            }
            callback(map);
        }
    }

    xhttp.overrideMimeType('text/xml');
    xhttp.open("GET", fileName, true);
    xhttp.send();
}


