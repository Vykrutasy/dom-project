const initinalData = [
	{
		id: 1,
		question: 'JavaScript это Java?',
		answers: [
			{text: 'Нет', correct: true},
			{text: 'Да', correct: false},
			{text: 'Возможно', correct: false}
		]
	},
	{
		id: 2,
		question: 'Сколько параментров можно передать в фукнцию?',
		answers: [
			{text: 'Сколько указано при ее создании', correct: true},
			{text: 'Минимум один', correct: false},
			{text: 'Сколько угодно', correct: false}
		]
	},
	{
		id: 3,
		question: 'Массивы это объекты?',
		answers: [
			{text: 'Не совсем', correct: false},
			{text: 'Нет', correct: false},
			{text: 'Да, это спископодобные объекты', correct: true}
		]
	}
];

const acc = [];

const box = document.querySelector('.box'),
	  question = box.querySelector('.question'),
	  labels = box.querySelectorAll('.form-check-label'),
	  inputs = box.querySelectorAll('input'),
	  checkBtn = box.querySelector('button'),
	  surveyResult = document.querySelector('.survey-result');

function fillData(data) {
	box.dataset.id = data.id;
	question.textContent = data.question;
	labels.forEach((label, index) => label.textContent = data.answers[index].text);
	inputs.forEach((input, index) => input.dataset.correct = data.answers[index].correct);
}

fillData(initinalData[0]);

function isRadioOn(radioInputs) { // функция принимает массив инпутов (радиокнопок)
	let radioOn = false; //объявляем, что радио выключено

	radioInputs.forEach(item => { //перебор массива инпутов: конкретный инпут в интерациях
		if (item.checked) //проверяем, что этот инпут нажат
		radioOn = true; //есди хоть один инпут включен, включаем радио
	})
	return radioOn; //возвращаем состояние радио (true или false)
}

function isChecked(input) {
	isValid = false;
	input.checked ? isValid = true : isValid = false;
  	return isValid;
}

box.addEventListener('click', clickBox)

function clickBox(somebox){
	if (event.target.tagName == 'INPUT') {
		if (isRadioOn(inputs)) {
			checkBtn.disabled = false;
		}
	} else if ((event.target.tagName == 'BUTTON') && (checkBtn.disabled == false)) {
		if (box.dataset.id < initinalData.length) {
			inputs.forEach(input => {
				if (isChecked(input)) {
				acc.push(input.dataset.correct);
				fillData(initinalData[box.dataset.id]);
				input.checked = false;
				checkBtn.disabled = true;
				}
			})
		} else {
			inputs.forEach(input => {
				if (isChecked(input)) {
				acc.push(input.dataset.correct);
				}
			})
			counter = 0;
			console.log(acc);
			acc.forEach(answer => {
				if (answer == 'true') {
				counter++;
				}
			})
			box.classList.add('d-none');
			surveyResult.textContent = `У вас ${counter} правильных ответов из ${initinalData.length}`;
		}
		
	}
}







// Нужен обработчик на клика на box. Смотрим, на что кликнули.
// Смотрим, что один из инпутов checked (вспомогательная функция проверки на то, что в группе радиокнопок 1 активная)
// Если условие выше выполняется, то убираем disabled с button
// Если event.target == button (по классу можно проверить) && button не disabled, то
	// если box.dataset.id < initialData.length
		// 1) acc.push(активный инпут.dataset.correct)
		// 2) fillData(initialData[box.dataset.id])
		// 3) заблокировали кнопку
	// иначе выводим итог в surveyResult; проходя по массиву ответов выводим количество true


