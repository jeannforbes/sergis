
var map = null

// Create an element and append it as a child of the given parent element.
// Then return the child element.
function createChild( parent, child ) {
    var e = document.createElement( child );
    parent.appendChild( e );
    return e;
}

// constructor for SeriousGame class
function SeriousGame (jsonstring) {
    this.json = JSON.parse(jsonstring)
    if this.json == null {
        throw new IllegalArgumentException("Invalid JSON string");
    }
    if !this.verifyJson() {
        throw new IllegalArgumentException("Invalid game data");
    }
    this.dialogNumber = 0
}

// actually start playing the game
SeriousGame.prototype.play = function () {
    var latlng = this.json.location
    map.setCenter( new google.maps.LatLng( latlng[0], latlng[1] ) );
    map.setZoom( this.json.zoom );
}

// creates a dialog
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

// perform an action
SeriousGame.prototype.doAction = function () {

}
