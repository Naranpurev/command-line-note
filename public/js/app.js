console.log('Client side js is loaded');

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = input.value;
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';
	setTimeout(() => {
		fetch(`http://localhost:3000/weather?address=${location}`).then(
			(response) => {
				response.json().then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						messageOne.textContent = data.location;
						messageTwo.textContent = data.forecast;
					}
				});
			}
		);
	}, 1000);
});
