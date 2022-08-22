const defaultCard = {
	suit: null,
	number: 0,
	seal: false
};

const cards = [
	{
		...defaultCard
	},
	{
		...defaultCard
	},
	{
		...defaultCard
	}
];

const spades = ['🂡', '🂢', '🂣', '🂤', '🂥', '🂦', '🂧', '🂨', '🂩', '🂪', '🂫', '🂭', '🂮'];
const hearts = ['🂱', '🂲', '🂳', '🂴', '🂵', '🂶', '🂷', '🂸', '🂹', '🂺', '🂻', '🂽', '🂾'];
const diamonds = ['🃁', '🃂', '🃃', '🃄', '🃅', '🃆', '🃇', '🃈', '🃉', '🃊', '🃋', '🃍', '🃎'];
const clubs = ['🃑', '🃒', '🃓', '🃔', '🃕', '🃖', '🃗', '🃘', '🃙', '🃚', '🃛', '🃝', '🃞'];
const suitDict = {
	spades, hearts, diamonds, clubs
};


const rules = [
	{ id: 1, calc: (cs) => {
		return cs.filter(c => c.suit === 'heart' || c.suit === 'diamond').length;
	}},
	{ id: 2, calc: (cs) => {
		return cs.every(c => c.suit !== 'heart' && c.suit !== 'diamond') ? 4 : 0;
	}},
	{ id: 3, calc: (cs) => {
		return cs.filter(c => c.number >= 11 && c.number <= 13).length;
	}},
	{ id: 4, calc: (cs) => {
		return cs.filter(c => c.number >= 11 && c.number <= 13).length === 0 ? 4 : 0;
	}},
	{ id: 5, calc: (cs) => {
		return cs.filter(c => c.number % 2 === 1).length;
	}},
	{ id: 6, calc: (cs) => {
		return cs.filter(c => c.number % 2 === 1).length === 0 ? 4 : 0;
	}},
	{ id: 7, calc: (cs) => {
		return cs.filter(c => c.number === 4 || c.number === 11).length;
	}},
	{ id: 8, calc: (cs) => {
		return (cs.some(c => c.number === 12) && cs.some(c => c.number === 13)) ? 1 : 0;
	}},
	{ id: 9, calc: (cs) => {
		return cs.some(c => c.seal) ? 1 : 0;
	}}
];


const onPageLoad = () => {
	//cards
	document.getElementById("suit1").onchange = (e) => onInputChange(0, "suit", e.currentTarget.value);
	document.getElementById("number1").onchange = (e) => onInputChange(0, "number", Number(e.currentTarget.value));
	document.getElementById("seal1").onchange = (e) => onInputChange(0, "seal", e.currentTarget.value === "1");
	document.getElementById("suit2").onchange = (e) => onInputChange(1, "suit", e.currentTarget.value);
	document.getElementById("number2").onchange = (e) => onInputChange(1, "number", Number(e.currentTarget.value));
	document.getElementById("seal2").onchange = (e) => onInputChange(1, "seal", e.currentTarget.value === "1");
	document.getElementById("suit3").onchange = (e) => onInputChange(2, "suit", e.currentTarget.value);
	document.getElementById("number3").onchange = (e) => onInputChange(2, "number", Number(e.currentTarget.value));
	document.getElementById("seal3").onchange = (e) => onInputChange(2, "seal", e.currentTarget.value === "1");

	//button
	document.getElementById("calc-button").onclick = () => onCalcButtonClick();
};

const onInputChange = (cardId, field, value) => {
	cards[cardId][field] = value;
	//Hide rules
	document.getElementById('rules').className = 'hidden';

	onStateUpdate();
};

const onStateUpdate = () => {
	for(i = 0; i < 3; i++) {
		updateCardUI(cards[i], document.getElementById("card" + (i+1)));
		updateSealUI(cards[i], document.getElementById('seal-ui-' + (i+1)));
	}
	updateButtonUI();
	updateRulesUI();
};

const updateCardUI = (card, element) => {
	if (card.suit && card.number > 0) {
		element.innerHTML = suitDict[card.suit + "s"][card.number-1];
		if (card.suit === 'spade' || card.suit === 'club') {
			element.className = 'black';
		} else {
			element.className = 'red';
		}
	} else {
		element.innerHTML = "🂠"; // 裏面
		element.className = 'gray';
	}
};

const updateSealUI = (card, element) => {
	if (card.seal) {
		element.innerHTML = '●';
	} else {
		element.innerHTML = '';
	}
}

const updateButtonUI = () => {
	const buttonElem = document.getElementById("calc-button");
	if(cards.every((card) => card.suit && card.number > 0)) {
		buttonElem.className = "";
	} else {
		buttonElem.className = "hidden";
	}
}

const updateRulesUI = () => {
	let sum = 0
	rules.forEach(rule => {
		const e = document.getElementById('rule-' + rule.id + '-point');
		const point = rule.calc(cards);
		sum += point;
		e.innerHTML = point;
	});
	document.getElementById('total-point').innerHTML = sum;
};

const onCalcButtonClick = () => {
	document.getElementById("rules").className = "";
	document.getElementById('total-point-row').scrollIntoView({behavior: 'smooth'});
}