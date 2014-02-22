exports.templates = function (client) {
	client.set('header',
		'{"element":"header","children":[{"element":"img","properties":{"src":"","data-img":"images/viewmachine-logo.png","class":"logo","title":"ViewMachine Logo"}, "src":"images/viewmachine-logo.png","preload":"","events":[]},{"element":"img","properties":{"src":"","data-img":"images/viewmachine-txt.png","class":"logotxt"}, "src":"images/viewmachine-txt.png","preload":""}]} '
		);
	client.set('templates', 'true');
};