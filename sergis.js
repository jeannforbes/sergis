
var map = null

function createChild( parent, child ) {
    var e = document.createElement( child );
    parent.appendChild( e );
    return e;
}

function SeriousGame (jsonstring) {
    this.json = JSON.parse(jsonstring)
    if this.json == null {
        throw new IllegalArgumentException("Invalid JSON string");
    }
    if !this.verifyJson() {
        throw new IllegalArgumentException("Invalid game data");
    }
}

SeriousGame.prototype.play = function () {
    var map = document.getElementById( "map-canvas" );
    var latlng = this.json.location
    map.setCenter( new google.maps.LatLng( latlng[0], latlng[1] ) );
    map.setZoom( this.json.zoom );
    this.dialogNumber = 0
}

SeriousGame.prototype.createDialog = function (json) {
    var nd = document.createElement( "div" );
    nd.id = "dialog";
    nd.title = this.json.title

    if (json.type == "choice") {
        //TODO create a dialog with choices
    } else if (json.type == "information") {
        if (json.image != null) {
            var img = createChild( nd, "img" );
            img.href = json.image.url
        }
        if (json.text != null) {
            var text = createChild( nd, "p" );
            text.innerHTML = json.text
        }
        if (json.video != null) {
            var iframe = createChild( nd, "iframe" );
            iframe.width = json.video.width or 560
            iframe.height = json.video.height or 315
            iframe.src = json.video.url
            iframe.frameborder = 0
            iframe.allowfullscreen = true
        }
        createChild( nd, "br" );
        // TODO create next button
    }
    
    var dialogParent = document.getElementById("dialog-parent");
    if (dialogParent.hasChildNodes()) {
        $( "#dialog" ).dialog( "destroy" );
        dialogParent.removeChild( dialogParent.firstChild );
    }
    dialogParent.appendChild( nd );
    $( "#dialog" ).dialog();
}

SeriousGame.prototype.doAction = function () {

}
