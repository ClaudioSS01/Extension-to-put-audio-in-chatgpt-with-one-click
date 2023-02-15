console.log('Bot Deriv 2023 - com analise por inteligencia artificial')

let valor_atual_da_acao = ""
let subindo_ou_descendo = ""

function pega_valor_da_acao() {
    try {
        try {
            subindo_ou_descendo = "subiu"
            valor_atual_da_acao = document.querySelector("#trade > div > div.cq-context > div > div > div.ciq-chart > div.cq-top-ui-widgets > div > div.cq-menu-btn > div > div > div > div.cq-chart-price > div.cq-animated-price.cq-current-price.cq-up").textContent;
        } catch (error) {
            subindo_ou_descendo = "desceu"
            valor_atual_da_acao = document.querySelector("#trade > div > div.cq-context > div > div > div.ciq-chart > div.cq-top-ui-widgets > div > div.cq-menu-btn > div > div > div > div.cq-chart-price > div.cq-animated-price.cq-current-price.cq-down").textContent
        }

        return valor_atual_da_acao
    } catch (error) {
        console.log(`Erro ao pegar o valor da ação "${error}"`)
    }
}



let numero_De_ticks = 10


let relatorio_para_enviar = ""
let contador_de_tick = 0
let saldo_inicial = document.querySelector("#dt_core_account-info_acc-info > div").textContent;
let saldo_atual = document.querySelector("#dt_core_account-info_acc-info > div").textContent
let utlima_jogada = ""
let ganhou = 0
let perdeu = 0
let total_de_jogadas = 0
let ultimo_saldo_registrado_antes_da_jogada = ""

setInterval(() => {

    if (contador_de_tick == numero_De_ticks) {
        contador_de_tick = 0;
        //zerando relatorio
        relatorio_para_enviar = ""
    }

    console.log(contador_de_tick)
    saldo_atual = document.querySelector("#dt_core_account-info_acc-info > div").textContent
    contador_de_tick = contador_de_tick + 1
    relatorio_para_enviar = relatorio_para_enviar + " tick=> '" + pega_valor_da_acao() + "' status '" + subindo_ou_descendo + "' ; "

    if (contador_de_tick == (numero_De_ticks - 1)) {
        ultimo_saldo_registrado_antes_da_jogada = saldo_atual
        total_de_jogadas = total_de_jogadas + 1;

        function analise(pergunta_) {
            try {
                let pergunta = pergunta_.replace(" ", "%20")

                fetch("https://you.com/api/streamingSearch?q=" + pergunta +
                        "&page=1&count=10&safeSearch=Moderate&onShoppingPage=false&mkt=&responseFilter=WebPages,Translations,TimeZone,Computation,RelatedSearches&domain=youchat&queryTraceId=8b945f58-9587-4bf0-b3d6-621e8f299b30&chat=%5B%5D&chatId=8b945f58-9587-4bf0-b3d6-621e8f299b30", {
                            "headers": {
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
                                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                                "Accept-Encoding": "gzip, deflate, br",
                                "Accept-Language": "en-US,en;q=0.5"

                            },
                            "body": null
                        }).then(response => {
                        return response.text();
                    })
                    .then(data => {

                        // aqui processamos e limpamos a reposta da ia
                        let resposta_final_da_ia = data.toLowerCase()
                            .split('\n')
                            .filter(s => s.includes('data:'))
                            .map(s => s.replace('data: ', ''))
                            .map(s => decodeURIComponent(s))
                            .filter(s => s.includes('youChatToken'))
                            .map(JSON.parse)
                            .map(s => s.youChatToken)
                            .join('')
                            .replaceAll('```', '\n')
                            .replaceAll('. ', '\n')
                            .trim();

                            console.log(`RESULTADO DA ANALISE: \n "${resposta_final_da_ia}"`)
                            

                        if (resposta_final_da_ia.includes('sobe')) {
                            console.log(`cliando em sobe`)
                            document.querySelector("#dt_purchase_call_button > div.btn-purchase__info.btn-purchase__info--left").click()
                            utlima_jogada = "sobe"

                        } else if (relatorio_para_enviar.includes('desce')) {
                            console.log(`cicando em desce`)
                            document.querySelector("#dt_purchase_put_button > div.btn-purchase__info.btn-purchase__info--left > div > div.btn-purchase__text_wrapper > span").click()

                            utlima_jogada = "desce"
                        } else if (relatorio_para_enviar.includes('aguardar')) {
                            console.log(`aguardar`)
                            //document.querySelector("#dt_purchase_put_button > div.btn-purchase__info.btn-purchase__info--left > div > div.btn-purchase__text_wrapper > span").click()

                            utlima_jogada = "aguardar"
                        }

                    })
                    .catch(error => {
                        console.error('An error occurred:', error);

                    });
            } catch (error) {
                console.log(`erro ao analisar erro "${error}"`)
            }


        }
        let relatorio_para_enviar_completo = relatorio_para_enviar + " saldo inicial : '" + saldo_inicial + "' saldo atual: '" + saldo_atual + "'"
        //relatorio_para_enviar = relatorio_para_enviar + `com a estrategia que você está usando no momento nos ganhamos "${ganhou}" e perdemos "${perdeu}"`
        console.log(relatorio_para_enviar_completo)
        //let ultimas_jogadas = (document.querySelector("#dt_positions_drawer > div.positions-drawer__body > div > div > div > div:nth-child(1) > div > div").textContent).toString()
        analise("analise matematicamente o relatorio a seguir e tente prever se o proximo tick vai subir ou descer, se tiver mais de 90 por cento de chance do proximo tick subir responda apenas usando a palavra 'SOBE' se tiver mais de 90 por cento de cance de descer responda usando apenas a palavra 'DESCE' e se não for nenhum desses casos responda 'AGUARDAR' relatorio: '''" + relatorio_para_enviar.toString() + "'''")

    } //aqui dentro é só se completou o numero de jogadas de analise
}, 2000)