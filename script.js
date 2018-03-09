

// editor 
function Editor(ele, {strokeWidth=3, color="#777", scale=1}={}){
	this.canvas = ele;
	this.ctx = ele.getContext('2d');
	this.strokeWidth = strokeWidth;
	this.color = color;
	this.prevPoint = null;

	this.ctx.scale(scale, scale);

}

Editor.prototype.draw = function(event){
	this.ctx.fillStyle = this.color;
	var editorOffsets = this.canvas.getClientRects()[0];
	var dx = event.clientX - editorOffsets.left;
	var dy = event.clientY - editorOffsets.top;
	if(this.prevPoint){
		this.ctx.beginPath();
		this.ctx.moveTo(this.prevPoint.dx, this.prevPoint.dy);
		this.ctx.quadraticCurveTo(this.prevPoint.dx, this.prevPoint.dy, dx, dy);
		this.ctx.lineWidth = this.strokeWidth;
		this.ctx.stroke();
	}
	// this.ctx.fillRect(dx, dy, this.strokeWidth, this.strokeWidth);
	this.prevPoint = {dx, dy};
}

Editor.prototype.setUp = function(){
	var scope = this;
	scope.draw = scope.draw.bind(scope);
	scope.canvas.addEventListener('mousedown', function(event){
		scope.canvas.addEventListener('mousemove',scope.draw, true)
	})

	scope.canvas.addEventListener('mouseup', function(event){	
		scope.canvas.removeEventListener('mousemove',scope.draw, true)
		scope.prevPoint = null;
	})
}

Editor.prototype.clear = function(){
	var scope = this;
	scope.ctx.clearRect(0, 0, scope.canvas.width, scope.canvas.height);
	scope.prevPoint =  null;
}

Editor.prototype.getImage = function() {
	return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

// set up editor
var editor = new Editor(document.querySelector("#editor"));
editor.setUp();

document.querySelector("#clearEditor").addEventListener('click', function(){
	editor.clear();
});

// document.querySelector("#getImage").addEventListener('click', function(){
// 	var imgData = editor.getImage();
// 	console.log(imgData);
// });

		
// draw number
var numberCanvas = document.querySelector("#number");
var ctx = numberCanvas.getContext('2d');

var rgbaArray = floatToUint8Clamped(exampleArray);
var imgData = ctx.createImageData(28,28);
imgData.data.map((e, i)=>{
	imgData.data[i] = rgbaArray[i];
})

ctx.putImageData(imgData, 0, 0);


//convert float array into rgba Unit9ClampedArray
function floatToUint8Clamped(floatArray){
	var uint8Array = new Uint8ClampedArray(floatArray);
	var rgbaArray = new Uint8ClampedArray(uint8Array.length * 4);

	uint8Array.forEach((e, i)=>{
		rgbaArray[i*4] = e;
		rgbaArray[i*4 + 1] = e;
		rgbaArray[i*4 + 2] = e;
		rgbaArray[i*4 + 3] = 255;
	})
	return rgbaArray;
}