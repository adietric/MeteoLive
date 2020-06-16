let city 		= 'sete'
const keys 		= 'e01cec8695e7f24c75db6f451fb8619d';
let change_city = document.querySelector('#changer')
let body		= document.querySelector('body');

getTempCity(city);

change_city.addEventListener('click', () => {
	let new_city = prompt("Choisissez une ville :");
	if (new_city !== null && new_city !== "") {
		getTempCity(new_city);
	}
});

function getTempCity(city) {
	const url 	= 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + keys + '&units=metric';
	let request = new XMLHttpRequest();

	request.open('GET', url);
	request.responseType = 'json';
	request.send();
	request.onload = function () {
	if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
		let response 	= request.response;
		let temp 		= response.main.temp;
		let city_name 	= response.name;
		let country		= response.sys.country;

		if (temp > 20 && !body.classList.contains('hot')) {
			body.classList.toggle('hot');
		} else if (temp <= 20 && body.classList.contains('hot')) {
			body.classList.toggle('hot');
		}
		document.querySelector('#ville').textContent = city_name;
		document.querySelector('#pays').textContent = country;
		document.querySelector('#temperature_label').textContent = temp;
		} else if (request.status === 404) {
			alert("La ville \'" + city + "\' n'existe pas, veuillez réessayer avec une ville valide.");
		} else {
			alert("Un problème avec l'API est survenu. Veuillez réessayer plus tard.");
		}
	}
}