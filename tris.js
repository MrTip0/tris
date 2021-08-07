var board = document.getElementById("board")
var text = document.getElementById("GameInfo")
var tavolo = ["", "", "", "", "", "", "", "", ""]
var xTurn = true
var turno = 0
var finito = false
var scritta = ""
var winner = []
creaTavolo()

function gioco(numero) {
    if (tavolo[numero] == "" && !finito) {
        tavolo[numero] = xTurn ? "X" : "O"
        xTurn = !xTurn
        turno ++
        checkWin()
        if (turno == 9 && !finito) {
            finito = true
            scritta = "Parità"
        }
        creaTavolo()
    }
}

function creaTavolo() {
    board.innerHTML = ""
    for (let i = 0; i < 9; i++) {
        let a = document.createElement("button")
        a.addEventListener("click", ()=> gioco(i))
        a.innerText = tavolo[i]
        a.setAttribute("class", `button${a.innerText == 'X' ? ' X': a.innerText == 'O' ? ' O' : ''}${winner.includes(i) ? ' winner': ''}`)
        board.appendChild(a)
        text.innerText = `Turn: ${xTurn ? "X" : "O"}`
    }
    if (finito) {
        text.innerText = scritta
        var b = document.createElement("button")
        b.innerText = "Restart"
        b.addEventListener("click", ()=>restart())
        b.setAttribute("class", "restart")
        b.setAttribute("id", "restart")
        board.appendChild(b)
    }
}

function checkWin(){
    var possibili = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    possibili.forEach(value => {
        let act = tavolo[value[0]]
        if (act != "" && act == tavolo[value[1]] && act == tavolo[value[2]]) {
            scritta = `The winner is ${act}`
            finito = true
            winner = value
        }
    });
}
function restart() {
    tavolo = ["", "", "", "", "", "", "", "", ""]
    xTurn = true
    turno = 0
    finito = false
    scritta = ""
    winner = []
    creaTavolo()
}