import 'babel-polyfill';

const styles = [
	'..%2Fdata%2Ftrainset_diff_no_start_all_labels.nc%2C973%2B905',
	'..%2Fdata%2Ftrainset_diff_no_start_all_labels.nc%2C1082%2B554',
	'..%2Fdata%2Ftrainset_diff_no_start_all_labels.nc%2C1495%2B898',
	'..%2Fdata%2Ftrainset_diff_no_start_all_labels.nc%2C1970%2B378',
	'..%2Fdata%2Ftrainset_diff_no_start_all_labels.nc%2C1561%2B872',
]
const maxlen = 80;

const getImage = function(apiURL, index) {
	let promise = Promise.resolve( 
		$.getJSON('http://anyorigin.com/go?url=' + encodeURIComponent(apiURL) + '&callback=?', (data) => {
			let el = document.createElement('html');
			el.innerHTML = data.contents;

			let imgSrc = $('img', el)[6];
			if (imgSrc) {
				imgSrc = imgSrc.src;
				let img = $('<img />', { 
					id: 'text'+index,
					class: 'text',
					src: imgSrc,
					alt: ''
				});
				img.appendTo($('#js-main'));
			} else {
				console.log('Image not parsed');
			}
		})
	);
	return promise;
}

const reorderImages = function() {
	let images = document.getElementsByClassName('text');
	console.log('Reorder');
}

const generate = function(e) {
	let form = $('#js-form').serializeArray();
	let text = form[0].value;
	let bias = form[1].value;
	let style = form[2].value;
	let samples = form[3].value;

	let url1 = 'http://www.cs.toronto.edu/~graves/handwriting.cgi?text=';
	let url2 = '&style=' + styles[style] + '&bias=' + bias + '&samples=' + samples;

	let apiURLs = [];

	while (text.length > 0) {
		let apiURL = '';
		let subtext = '';

		if (text.length > maxlen) {
			subtext = text.slice(0, maxlen);
			let lastindex = subtext.lastIndexOf(' ');
			if (lastindex == -1) {
				lastindex = maxlen;
			}
			subtext = subtext.slice(0, lastindex).trim();
			text = text.slice(lastindex).trim();
		} else {
			subtext = text;
			text = '';
		}

		apiURL = url1 + encodeURI(subtext) + url2;
		apiURLs.push(apiURL);
	}

	const apiPromises = apiURLs.map((apiURL, i) => {
		return getImage(apiURL, i);
	});

	return Promise.all(apiPromises)
		.then(() => reorderImages())
		.then(() => {
		});
}

global.app = function () {

	$('#js-form').submit((e) => {
		e.preventDefault();
 		generate();
 		return;
	});

};

app();
