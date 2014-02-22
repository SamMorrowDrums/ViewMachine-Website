(function ($, VM) {
	var body = new VM.El('div', {'class': 'body'});
	var header = new VM.El('header');
	var logo = new VM.Image('images/viewmachine-logo.png', '', {'class': 'logo', title: 'ViewMachine Logo'});
	var txtLogo = new VM.Image('images/viewmachine-txt.png', '', {'class': 'logotxt'});
	$.extend(logo, VM.matrixMethods);
	logo.matrixData = [0,0,0,0,0,0,1, true];
	logo.event('click', function (e) {e.data.animate(1, 1, 0, 360, 0, 0, 0, 0); });
	header.append(logo);
	header.append(txtLogo);
	body.append(header);
	var content = new VM.El('div', {'class': 'content center'});
	body.append(content);
	content.append(new VM.El('h3', {text: 'Love JS?', 'class': 'center hidden'}).css('opacity', 0));
	content.append(new VM.El('h3', {text: 'Hate HTML?', 'class': 'center hidden'}));
	content.append(new VM.El('p', {'class': 'center hidden', text: 'ViewMachine empowers your JS, so HTML is a consequence, not a hindrance.'}));
	$(document).ready(function (){
		body.draw();
		setTimeout(function (){logo.animate(1.5,1,0,360,0,0,0,0);}, 300);
		setTimeout(function (){ content.children[0].$().animate({'opacity': '+=1'}, 2000); }, 1500);
		setTimeout(function (){ content.children[1].$().animate({'opacity': '+=1'}, 2000); }, 3000);
		setTimeout(function (){
			$('h3').animate({'opacity': '-=1', 'margin-bottom': '-=30px'}, 800);
			content.children[2].$().animate({'opacity': '+=1'}, 2000);
			setTimeout(function (){
				content.append(new VM.El('p', {'class': 'center', text: 'Visit us on '}).append(new VM.El('a', {text: 'Github.', href: 'https://github.com/SamMorrowDrums/ViewMachine/wiki'}) ).css('margin-top', '50px'));
			}, 3000);
		}, 5000);
	});
}(jQuery, VM));