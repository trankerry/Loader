const input = document.getElementById('weight');
const list = document.getElementById('answer');

// Add event listener for input change
input.addEventListener('input', function () {
	// Clear the output
	clearOutput();
});

function Calc() {
	const plates = [
		{ value: [25, 'images/25kg.svg', 100], width: 100 },
		{ value: [20, 'images/20kg.svg', 100] },
		{ value: [15, 'images/15kg.svg', 100] },
		{ value: [10, 'images/10kg.svg', 100] },
		{ value: [5, 'images/5kg.svg', 70] },
		{ value: [2.5, 'images/2_5kg.svg', 70] },
		{ value: [2, 'images/2kg.svg', 70] },
		{ value: [1.5, 'images/1_5kg.svg', 70] },
		{ value: [1, 'images/1kg.svg', 70] },
		{ value: [0.5, 'images/0_5kg.svg', 70] }
	];

	//clear output of past results
	clearOutput();

	let sum = 0;
	const platesNeeded = [];
	const otherInfo = [];
	let bar = document.getElementById('bar').value;
	let weight = document.getElementById('weight').value;
	let remainder = (weight - bar) / 2;
	let noRed = document.getElementById('red25');
	let convert = document.getElementById('convert');

	//if they don't want to use big red 25kg plates
	if (!noRed.checked) {
		plates.shift();
	}

	if (convert.checked) {
		let lbsWeight = weight * 2.205;
		let rounded = lbsWeight.toFixed(2);
		document.getElementById('lbs').innerHTML =
			'You are lifting ' + rounded + ' lbs.';
	}

	for (let i = 0; i < plates.length; i++) {
		while (sum + plates[i].value[0] <= remainder) {
			sum += plates[i].value[0];
			platesNeeded.push(plates[i].value[1]);
		}
	}

	var dups = findDups(platesNeeded);

	document.getElementById('prompt').innerHTML =
		"You'll need the following on each side:";
	for (let j = 0; j < dups.length; j++) {
		let li = document.createElement('li');
		let img = document.createElement('img');
		img.src = dups[j].value;
		if (
			dups[j].value == 'images/25kg.svg' ||
			dups[j].value == 'images/20kg.svg' ||
			dups[j].value == 'images/15kg.svg' ||
			dups[j].value == 'images/10kg.svg'
		) {
			img.width = 120;
		} else {
			img.width = 70;
		}

		let text = document.createTextNode(dups[j].count + ' x ');
		li.appendChild(text);
		li.appendChild(img);
		document.getElementById('answer').appendChild(li);
	}
}

function clearOutput() {
	// Remove all child elements of the list
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
	document.getElementById('prompt').innerHTML = '';
	document.getElementById('lbs').innerHTML = '';
}

function findDups(array) {
	const duplicates = {};

	array.forEach((item) => {
		if (duplicates[item]) {
			duplicates[item]++;
		} else {
			duplicates[item] = 1;
		}
	});

	// Create an array of objects representing duplicates and their counts
	const result = [];
	for (const key in duplicates) {
		result.push({ value: key, count: duplicates[key] });
	}

	return result;
}
