let andar = ""
let vida = "❤"
let pontos_de_vida = 6;
let vida_atual = ""


function calcular_vida(){
    vida_atual = ""
for(p=0;p<pontos_de_vida;p++){
    vida_atual = vida_atual+vida
}
}

setInterval(()=>{
    calcular_vida()
    desenhar()
},250)

function desenhar(){
    try {
        console.clear()
        console.log(`HP:${vida_atual}`)
        console.log('===========================================')
        console.log('                                          ')
        console.log('                                          ')
        console.log(`${andar}  ☻︎\n ${andar}/|\\ \n ${andar}/ \\`)
        console.log('===========================================')
    } catch (error) {
        console.log(`Erro ao iniciar o jogo "${erro}"`)
    }
}


document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' ) {
        andar = andar+" "
    }
    if (event.key === 'ArrowLeft') {
        andar = andar.replace(" ","")
    }
});