(function(obj){

	Object.assign(obj, {Model})

	function Model(editor, result, model){
		this.editor = editor;
		this.result = result;
		this.model = model;

		var scope = this;
		this.editor.setDrawEndCallback(callback.bind(scope))
		function callback(image){
			this.findResult(image)
		}
	}

	Model.prototype.findResult = function(image){
		var scope = this;
		var input = this.blackAndWhite(image.data);
		
		drawImage(document.querySelector('#number'), input)
		
		var tensor = dl.tensor(input);	
		var output = this.model(tensor);
		console.log(output)
		output.data().then(function(val){
			(scope.showResult.bind(scope))(val);
		})
	}

	Model.prototype.blackAndWhite = function(imageData){
		return (new Array(784)).fill(0).map((e, i)=>{
			return (255 - imageData[i*4]);
		});
	}

	Model.prototype.showResult = function(val){
		console.log(val)
		this.result.update(val)
	}

})(window)