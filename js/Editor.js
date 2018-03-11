(function(){

Object.assign(window, {Editor})

// editor 
function Editor(ele, {strokeWidth=3, color="#777", scale=1, background="#fff"}={}){
	this.canvas = ele;
	this.ctx = ele.getContext('2d');
	this.strokeWidth = strokeWidth;
	this.color = color;
	this.prevPoint = null;

	this.ctx.scale(scale, scale);
	this.ctx.fillStyle = background;
	this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
}

Editor.prototype.draw = function({clientX, clientY}={}){
	// event end might trigger
	if(clientX == 0 && clientY == 0)return;
	this.ctx.fillStyle = this.color;
	var editorOffsets = this.canvas.getClientRects()[0];
	var dx = clientX - editorOffsets.left - 16;
	var dy = clientY - editorOffsets.top - 16;
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

Editor.prototype.handleEvent = function(event){
	var scope = this;
	if(event instanceof MouseEvent){
		this.draw(event);
	}else if(event instanceof TouchEvent){
		Array.prototype.forEach.call(event.touches,( t ) => scope.draw(t))
	}
}

Editor.prototype.setUp = function(){
	var scope = this;
	scope.handleEvent = scope.handleEvent.bind(scope);
	if(window.innerWidth > 768){
		scope.canvas.addEventListener('mousedown', function(event){
			scope.canvas.addEventListener('mousemove',scope.handleEvent, true)
		})

		scope.canvas.addEventListener('mouseup', function(event){	
			scope.canvas.removeEventListener('mousemove',scope.handleEvent, true)
			scope.prevPoint = null;
		})
	}else{
		scope.canvas.addEventListener('touchstart', function(event){
			scope.canvas.addEventListener('touchmove',scope.handleEvent, true)
		})

		scope.canvas.addEventListener('touchend', function(event){	
			scope.canvas.removeEventListener('touchmove',scope.handleEvent, true)
			scope.prevPoint = null;
		})
	}
}

Editor.prototype.clear = function(){
	var scope = this;
	scope.ctx.clearRect(0, 0, scope.canvas.width, scope.canvas.height);
	scope.prevPoint =  null;
}

Editor.prototype.getImage = function() {
	var imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
	
	// create a hidden canvas, render the image as 28*28 and then extract data
	var hiddenCanvas  = document.createElement('canvas');
	hiddenCanvas.width = imgData.width;
	hiddenCanvas.height = imgData.height;
	var hctx = hiddenCanvas.getContext('2d');
	var scaleX = imgData.width/28; 
	var scaleY = imgData.height/28;
	hctx.scale(scaleX, scaleY);
	hctx.putImageData(imgData,0, 0);
	return hctx.getImageData(0, 0, 28, 28)
};



})(window);