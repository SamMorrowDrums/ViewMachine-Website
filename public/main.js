(function ($, VM) {
	var body = new VM.El('div', {'class': 'body'});
	$(document).ready(function (){
		body.draw();
		setTimeout(function (){logo.animate(2,1,0,360,0,0,0,0);}, 300);
	});

	var header = new VM.El('header');
	var logo = new VM.Image('images/viewmachine-logo.png', '', {'class': 'logo'});
	var txtLogo = new VM.Image('images/viewmachine-txt.png', '', {'class': 'logotxt'});
	$.extend(logo, VM.matrixMethods);
	logo.matrixData = [0,0,0,0,0,0,1, true];
	logo.event('click', function (e) {e.data.animate(1, 1, 0, 360, 0, 0, 0, 0); });
	header.append(logo);
	header.append(txtLogo);
	body.append(header);
	var content = new VM.El('div', {'class': 'content center'});
	body.append(content);
	content.append(new VM.El('p', {'class': 'center', text: 'Welcome to ViewMachine, a templating engine to make your Javascript come alive. Visit us on '}).append(new VM.El('a', {text: 'Github.', href: 'https://github.com/SamMorrowDrums/ViewMachine/wiki'})));
	content.append(new VM.El('h3', {text: 'Coming soon...', 'class': 'center'}));
}(jQuery, VM));