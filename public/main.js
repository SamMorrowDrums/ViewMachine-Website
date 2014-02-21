(function ($, VM) {
	var body = new VM.El('div', {'class': 'body'});
	$(document).ready(function (){
		body.draw();
	});
	var header = new VM.El('header');
	body.append(header);
}(jQuery, VM));