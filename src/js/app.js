import 'babel-polyfill';

const styles = [
	'..%2Fdata%2Ftrainset_diff_no_start_all_labels.nc%2C973%2B905',
	'..%2Fdata%2Ftrainset_diff_no_start_all_labels.nc%2C1082%2B554',
	'..%2Fdata%2Ftrainset_diff_no_start_all_labels.nc%2C1495%2B898',
	'..%2Fdata%2Ftrainset_diff_no_start_all_labels.nc%2C1970%2B378',
	'..%2Fdata%2Ftrainset_diff_no_start_all_labels.nc%2C1561%2B872',
]
const maxlen = 100;

const getImage = function(apiURL) {
	$.getJSON('http://anyorigin.com/go?url=' + encodeURIComponent(apiURL) + '&callback=?', (data) => {
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
}

const generate = function(e) {
	let form = $('#js-form').serializeArray();
	let text = form[0].value;
	let bias = form[1].value;
	let style = form[2].value;
	let samples = form[3].value;

	let url1 = 'http://www.cs.toronto.edu/~graves/handwriting.cgi?text=';
	let url2 = '&style=' + styles[style] + '&bias=' + bias + '&samples=' + samples;

	// tokenize 
	// text = text.split(" ");
	// for (let i = 0; i < text.length; i++) {
	// 	let apiURL = url1 + text[i] + url2;
	// 	getImage(apiURL);
	// }

	// chunking by max len
	// while (text.length > maxlen) {
	// 	let subtext = text.slice(0, maxlen);
	// 	let lastindex = subtext.lastIndexOf(' ');
	// 	if (lastindex == -1) {
	// 		console.log('no space');
	// 		return;
	// 	}
	// 	subtext = subtext.slice(0, lastindex);
	// 	text = text.slice(lastindex);

	// 	let apiURL = url1 + subtext + url2;
	// 	getImage(apiURL);
	// }


	let apiURL = url1 + text + url2;
	getImage(apiURL);
}

global.app = function () {

	$('#js-form').submit((e) => {
		e.preventDefault();
 		generate();
 		return;
	});

};

app();
