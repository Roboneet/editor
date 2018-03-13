let Buffer = new BSON().serialize({}).constructor

var weightsRequest = new XMLHttpRequest();
weightsRequest.open('GET', './mnist-mlp.bson');
weightsRequest.responseType = "arraybuffer";

var pbar = new ProgressBar({
	xhr: weightsRequest,
	container: document.querySelector('.render_editor'),
	done: function(res){
		if(res.currentTarget.readyState == 4 && res.currentTarget.status == 200){
			var response = new Buffer(res.currentTarget.response);
			var data = new BSON().deserialize(response);
			model.weights = flux.convertArrays_(data).weights;
			console.log(model.weights)
		}
		__init__()
	},
	err: console.log
})

window.onload = ()=>{
	console.log(weightsRequest)
	weightsRequest.send();
	pbar.start();
}