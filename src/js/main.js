// import _ from 'lodash';
import Utils from './_sub';
import {BreakPoint} from '../_util/Breakpoint';

Utils.method1();
Utils.method2();
Utils.method2();

// timer(5000);
// console.log(_);


console.log("aaaaaa");
console.log("aaaaaa");
console.log("aaaaaa");

timer(5000);

function timer(delay) {
	let myFirstPromise = new Promise((resolve, reject) => {
		setTimeout(function(){
			resolve("Success!"); // Yay! Everything went well!
		}, delay);
	});

	myFirstPromise.then((successMessage) => {
		// successMessage is whatever we passed in the resolve(...) function above.
		// It doesn't have to be a string, but if it is only a succeed message, it probably will be.
		console.log("Yay! " + successMessage);
	});
}

const breakpoint = new BreakPoint({
	breakpoints: [
		{width: 480, name: 'portrait'},
		{width: 720, name: 'landscape'},
		{width: 1200, name: 'PC'}
	]
});
breakpoint.addEventListener('breakpoints', function (e) {
	console.log(e);
	// if(e['name'] === 'PC') {
	// 	console.log(e['name']);
	// } else if(e['name'] === 'landscape') {
	// 	console.log(e['name']);
	// } else if(e['name'] === 'portrait') {
	// 	console.log(e['name']);
	// } else if(e['name'] === 'SP') {
	// 	console.log(e['name']);
	// }
});


document.addEventListener("click", function(event) {
	if(event.target.classList.contains("button")) {
		console.log(breakpoint.getPoint());
		console.log(breakpoint.getName());
		console.log(breakpoint.getBreakPoint());
		console.log(breakpoint.getWidth());
		breakpoint.removeEventListener('breakpoints');
	}
}, false);
