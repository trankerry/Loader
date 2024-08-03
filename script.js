const input = document.getElementById('weight');
const list = document.getElementById('answer');

//this will calculate the amount of weight on the bar
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#button-container button');
    const clearButton = document.getElementById('clear-button');
    const totalDisplay = document.getElementById('total');
    let total = 0;
    let isFirstClick = true;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (isFirstClick) {
				//get the weight of the bar
				let barStart = document.getElementById('bar').value;
                total = total + Number(barStart);
                isFirstClick = false;
            }
			//get the weight of the plates and * by 2 so you only need to count one side
            total += parseFloat(button.value)*2;
            totalDisplay.textContent = total;
        });
    });

    clearButton.addEventListener('click', () => {
        total = 0;
        totalDisplay.textContent = total;
        isFirstClick = true;
    });
});

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
	let oneBlue = document.getElementById('blue20');
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

	if (convertKG.checked) {
		let lbsWeight = weight / 2.205;
		let rounded = lbsWeight.toFixed(2);
		document.getElementById('lbs').innerHTML =
			'You are lifting ' + rounded + ' kg.';
	}

	if (oneBlue.checked && !noRed.checked) {
		remainder = remainder - 20;
		platesNeeded.push(plates[0].value[1]);
		plates.shift();
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

//toggle off second weight calculator
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');
    const largePlates25 = document.getElementById('largePlates25');
	const largePlates20 = document.getElementById('largePlates20');
	const largePlates15 = document.getElementById('largePlates15');
	const largePlates10 = document.getElementById('largePlates10');
	const largePlates5 = document.getElementById('largePlates5');
	const smallPlates2_5 = document.getElementById('smallPlates2.5');
	const smallPlates2 = document.getElementById('smallPlates2');
	const smallPlates1_5 = document.getElementById('smallPlates1.5');
	const smallPlates1 = document.getElementById('smallPlates1');
	const smallPlates_5 = document.getElementById('smallPlates.5');
	const totalDisplay = document.getElementById('total-display');
	const clearButton = document.getElementById('clear-button');
	const total = document.getElementById('total');

    toggle.addEventListener('change', (event) => {
		total.textContent = 0;
		largePlates25.classList.toggle('hidden');
		largePlates20.classList.toggle('hidden');
		largePlates15.classList.toggle('hidden');
		largePlates10.classList.toggle('hidden');
		largePlates5.classList.toggle('hidden');
		smallPlates2_5.classList.toggle('hidden');
		smallPlates2.classList.toggle('hidden');
		smallPlates1_5.classList.toggle('hidden');
		smallPlates1.classList.toggle('hidden');
		smallPlates_5.classList.toggle('hidden');
		totalDisplay.classList.toggle('hidden');
		clearButton.classList.toggle('hidden');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item a');
    const views = document.querySelectorAll('.view');

    function showView(viewId) {
        views.forEach(view => {
            if (view.id === viewId) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const viewId = item.getAttribute('data-view');
            showView(viewId);
        });
    });

    // Show the home view by default
    showView('home');
});