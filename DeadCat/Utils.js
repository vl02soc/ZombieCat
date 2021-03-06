!function ($w) {

    function Utils() {
    }

    Utils.prototype.loadJSON = function (fileName, callback) {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                callback(JSON.parse(xhttp.responseText));
            }
        };

        xhttp.overrideMimeType("text/plain; charset=x-user-defined");
        xhttp.open("GET", fileName, true);
        xhttp.send();
    };


    //export module
    $w.Utils = Utils;
}(this);