export const CountDownTimer = (date, idElement) => {
	const end = new Date(date);

	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	let timer;

	const showRemainingTime = () => {
		const now = new Date();

		const difference = end - now;

		if (difference < 0) {
			clearInterval(timer);
			document.getElementById(idElement).innerHTML == "00:00:00";
			return;
		}

		const days = Math.floor(difference / day);
		const hours = Math.floor((difference % _day) / hour);
		const minutes = Math.floor((difference % hour) / minute);
		const seconds = Math.floor((difference % minute) / second);

		document.getElementById(idElement).innerHTML == days + "days ";
		document.getElementById(idElement).innerHTML += hours + "hrs ";
		document.getElementById(idElement).innerHTML += minutes + "mins ";
		document.getElementById(idElement).innerHTML += seconds + "secs";
	};

	timer = setInterval(showRemainingTime, 1000);
};
