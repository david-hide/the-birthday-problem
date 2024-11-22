function calcProbOfMatch(people) {
    let prob = new Big(1);
    for (let i = 1; i <= (people - 1); i++) {
        prob = prob.times(new Big(365 - i).div(365));
    }

    return new Big(1).minus(prob).times(100).toString();
}

function fewestPeopleForProbabilityOfMatch(p) {
    if (p > 100) {
        return;
    }

    let probOfMatch = new Big(0);
    let people = 2;

    // Increment people until the desired probability is reached
    while (probOfMatch.lt(p)) {
        people++;
        probOfMatch = new Big(calcProbOfMatch(people));
    }

    return people;
}

const targetForm = document.querySelector('.target-form').addEventListener('submit', handleTargetSubmit);
const peopleForm = document.querySelector('.people-form').addEventListener('submit', handlePeopleSubmit);
const answerUnrounded = document.querySelector('.people-answer__unrounded');
const showUnroundedAnswerBtn = document.querySelector('.show-unrounded');
showUnroundedAnswerBtn.addEventListener('click', showUnroundedAnswer);

function handleTargetSubmit(e) {
    e.preventDefault();
    const answerElem = document.querySelector('.target-answer');
    answerElem.style.display = 'block';
    const formData = new FormData(this);
    const target = formData.get('target')
    const fewestPeople = fewestPeopleForProbabilityOfMatch(target);

    answerElem.textContent = `A group of ${fewestPeople} people have a ${target}% chance or greater of having at least one shared birthday.`;
}

function handlePeopleSubmit(e) {
    e.preventDefault();
    answerUnrounded.style.display = 'none';
    showUnroundedAnswerBtn.style.display = 'block';
    document.querySelector('.people-answer').style.display = 'block';
    const answerElem = document.querySelector('.people-answer__text');
    const formData = new FormData(this);
    const people = formData.get('people')
    const probOfMatch = calcProbOfMatch(people);
    answerElem.textContent = `A group of ${people} people has a ${parseFloat(probOfMatch).toFixed(2)}% chance of having a shared birthday (rounded to 2 decimal places).`;
    answerUnrounded.textContent = probOfMatch + '%';
}

function showUnroundedAnswer() {
    answerUnrounded.style.display = 'block';
    showUnroundedAnswerBtn.style.display = 'none';
}