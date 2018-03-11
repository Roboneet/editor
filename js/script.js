// set up editor
var editor = new Editor(document.querySelector("#editor"));
editor.setUp();

var result = new Result(document.querySelector("#result"));
result.setUp();
result.update((new Array(10)).fill(0).map(e=> Math.random()))


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

