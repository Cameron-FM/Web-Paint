var oCanvas, oCTX;
var iXPos, iYPos; //Stylus X and Y position
var sColour="#000000"; //Default paint colour
var previousColor;

function fnInitialise() {
  let oCanvas = document.getElementById("cnCanvas");
  let defaultColors = ["red", "green", "blue", "yellow", "orange"]

  //If we can get the canvas' context execute the following
  if (oCanvas.getContext) {
    oCanvasContext = oCanvas.getContext("2d"); //set the context to 2D, only X/Y coordinates

    //Add colors to color bar
    defaultColors.forEach((arrayColor) => {
      newColor = document.createElement("div")
      newColor.className = "color"
      newColor.style.backgroundColor = arrayColor
      newColor.setAttribute("onclick","fnActivateColour(this)");
      document.getElementById('colourSelectors').appendChild(newColor)
    })

    iXPos = 0;
    iYPos = 0;
  }
}

function fnActivateColour(oElement) {
  //Returns all computed css and get value of backgroud-color attribute
  sColour = getComputedStyle(oElement).getPropertyValue("background-color");;

  //Reset border color for used colors
  document.querySelectorAll('.color').forEach(elm => {
    elm.style.borderColor = "white"
  })
  oElement.style.borderColor="black";
}

function fnPaintStylus() {
  //Function will be used to paint a stylus on the canvas
  let stylusSize = document.getElementById('size').value
  oCanvasContext.fillStyle = sColour;
  oCanvasContext.beginPath();
  oCanvasContext.arc(iXPos, iYPos, stylusSize, 0, 2 * Math.PI);
  oCanvasContext.fill()
}

function fnTrackMouse(e) {
  //Called "everytime" the user's mouse is moved when over the canvas
  iXPos=e.clientX; //Current mouse positionX in the X variable
  iYPos=e.clientY; //Current mouse positionY in the Y variable
  if(e.buttons==1) {
    fnPaintStylus(); //Called if left mouse button is held
  }
}

function switchTool(oElement){
  if (oElement.id === "rubber"){
    previousColor = sColour
    sColour = "#f0f0f0"
    oElement.style.borderBottom = "solid black 2px"
    document.getElementById('pencil').style.borderBottom = "solid white 2px"
  }else{
    sColour = previousColor
    oElement.style.borderBottom = "solid black 2px"
    document.getElementById('rubber').style.borderBottom = "solid white 2px"
  }
}

function downloadImage(){
  canv = document.getElementById("cnCanvas")
  image = canv.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "myDrawing.png";
  link.href = image;
  link.click();
}
