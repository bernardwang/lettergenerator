import 'babel-polyfill';

global.app = function () {

	let testStr = 'http://www.cs.toronto.edu/~graves/handwriting.cgi?text=hi+testing+yay+testing&style=&bias=0.5&samples=1';
	$.getJSON('http://anyorigin.com/go?url=' + encodeURIComponent(testStr) + '&callback=?', function(data) {
		let el = document.createElement('html');
		el.innerHTML = data.contents;

		let imgs = $.map($('img', el), (val, i) => {
			if (i > 5) return val.src;
			else return;
		});

		$.map(imgs, (val, i) => {
			let img = $('<img>');
			img = $('<img />', { 
				id: '',
				src: val,
				alt: ''
			});
			img.appendTo($('#js-main'));
		});
	});

};

app();

