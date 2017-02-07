import 'babel-polyfill';

global.app = function () {

	let testStr = 'http://www.cs.toronto.edu/~graves/handwriting.cgi?text=hi+testing+yay+testing&style=&bias=0.15&samples=3';
	$('#iframe').attr('src', testStr);
	
	$.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('testStr') + '&callback=?', function(data){
		console.log(data.contents);
	});
};

app();

