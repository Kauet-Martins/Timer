const decress = document.getElementById('decress');
const incresse = document.getElementById('incresse');
const timer = document.getElementById('timer');

incresse.addEventListener('click', () => {
    timer.value = parseInt(timer.value) + 1 || 1;
    if (timer.value > 60) {
        timer.value = 60;
    }
});

decress.addEventListener('click', () => {
    timer.value = parseInt(timer.value) - 1 || 0;
    if (timer.value < 0) {
        timer.value = 0;
    }
});

const init = document.getElementById('init');
const project = document.getElementById('Project_Name');
const erro = document.getElementById('erro');
const Mdisplay = document.querySelector('.display input[name="minutes"]');
const Sdisplay = document.querySelector('.display input[name="seconds"]');
const initImg = document.querySelector('.initImg');

let intervalID;  // Identificador do intervalo
let isTimerRunning = false;  // Verifica se o timer está rodando
let totalTimeInSeconds = 0;  // Mantém o tempo restante

function playImg(){

    initImg.src = 'assets/Play, Regular.png'
    init.querySelector('span').textContent = 'Começar'

}

function pauseImg(){

    initImg.src = 'assets/Vector (Stroke).png'
    init.querySelector('span').textContent = 'Interromper'

}

// Função para iniciar o timer
function startTimer() {
    erro.innerText = '';

    if (timer.value === "" || project.value === "") {
        const newP = document.createElement('p');
        newP.innerText = "Preencha o nome e a duração antes de começar.";
        erro.appendChild(newP);
        return;
    }

    // Somente redefine o tempo se o timer ainda não estiver rodando E se for a primeira vez que o timer está sendo iniciado
    if (!isTimerRunning && totalTimeInSeconds === 0) {
        let minutes = parseInt(timer.value) || 0;
        let seconds = 0;
        totalTimeInSeconds = minutes * 60 + seconds;

        if (totalTimeInSeconds <= 0) {
            alert('Por favor, defina um tempo válido');
            return;
        }
    }

    // Trocar o botão para "Interromper" e mudar a imagem
    pauseImg()
    isTimerRunning = true;

    // Lógica do Timer
    intervalID = setInterval(() => {
        if (totalTimeInSeconds <= 0) {
            clearInterval(intervalID);
            alert('Tempo Acabou');
            resetButton();  // Reseta o botão após o término do tempo
            return;
        }

        totalTimeInSeconds--;

        const displayMinutes = Math.floor(totalTimeInSeconds / 60);
        const displaySeconds = totalTimeInSeconds % 60;

        Mdisplay.value = displayMinutes < 10 ? '0' + displayMinutes : displayMinutes;
        Sdisplay.value = displaySeconds < 10 ? '0' + displaySeconds : displaySeconds;

    }, 1000);  // Intervalo de 1 segundo
}

// Função para pausar o timer
function pauseTimer() {
    clearInterval(intervalID);  // Pausa o intervalo do timer
    playImg()
    isTimerRunning = false;
}

// Função para resetar o botão e estado quando o tempo acabar
function resetButton() {
    playImg()
    isTimerRunning = false;
}

// Função que alterna entre iniciar e pausar o timer
function toggleTimer() {
    if (isTimerRunning) {
        pauseTimer();  // Pausa o timer se ele estiver rodando
    } else {
        startTimer();  // Inicia o timer se ele não estiver rodando
    }
}

// Adicionar evento ao botão para alternar entre iniciar e interromper
init.addEventListener('click', toggleTimer);
