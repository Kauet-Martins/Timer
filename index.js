const decress = document.getElementById('decress')
const incresse = document.getElementById('incresse')
const timer = document.getElementById('timer')

incresse.addEventListener('click', () => {

    timer.value = parseInt(timer.value) + 1 || 1;
    
    if (timer.value > 60){

        timer.value = 60

    }

})

decress.addEventListener('click', () => {

    timer.value = parseInt(timer.value) - 1 || 0;

    if (timer.value < 0){

        timer.value = 0

    }
})

const init = document.getElementById('init')

const project = document.getElementById('Project_Name')
const erro = document.getElementById('erro')
const Mdisplay = document.querySelector('.display input[placeholder="MM"]')
const Sdisplay = document.querySelector('.display input[placeholder="SS"]')

let intervalID

function startTimer(){


    erro.innerText = ''

    if (timer.value === "" || project.value === "" ){

    
        const newP = document.createElement('p')
        newP.innerText = "Preencha o nome e a duração antes de começar."

        erro.appendChild(newP)
        return
    
    } 

    // adicionando valor aos inputs
    let minutes = parseInt(timer.value) || 0
    let seconds = 0

    // transformando tudo em segundos
    let totalTimeInSeconds = minutes * 60 + seconds

    // previnindo que comece zerado
    if (totalTimeInSeconds <= 0) {

        alert('Por favor, defina um tempo valido')
        return

    }


    // Logica do Timer ( a magica acontece aqui)
    timeInterval = setInterval(() => {

        // monstrando ao usuario quando acaba
        if (totalTimeInSeconds <= 0){

            clearInterval(timerInterval)
            alert('Tempo Acabou')
            return

        }

        // Pegando o total de segundos e dimunuindo um a cada intervalo de tempo
        totalTimeInSeconds--;

        // convertendo novamente para minutos (para mostrar no display)
        const displayMinutes = Math.floor(totalTimeInSeconds / 60)
        const displaySeconds = totalTimeInSeconds % 60

        // alterando a formatacao para se enquadrar 
        Mdisplay.value = displayMinutes < 10 ? '0' + displayMinutes : displayMinutes

        Sdisplay.value = displaySeconds < 10 ? '0' + displaySeconds : displaySeconds

    }, 1000) // definindo o intervalo (1000 === 1 sec)

    


}

init.addEventListener('click', startTimer)

