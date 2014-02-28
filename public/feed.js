VM.on('VMio-Spin', function (e, el) {
	if (!el.matrixData) {
		VM.extend(el, VM.matrixMethods);
		el.matrixData = [0,0,0,0,0,0,1, true];
	}
	el.animate(1, 1, 0, 360, 0, 0, 0, 0);
});