console.log('ia_kwl.js')
console.log("versão 7-2-2023")

enviar_para_background_js("OFF")

function enviar_para_background_js(mensagem_para_o_background) {

    //envia mensagem para o background.js
    //chrome.runtime.sendMessage(chave+valor_a_ser_salvo);
    chrome.runtime.sendMessage(mensagem_para_o_background, function (response) {
        console.log("\r\n\r\n\r\nia_kwl.js diz: recebemos do background a seguinte resposta: '" + response + "'\r\n\r\n\r\n")
        //retornar a resposta do background
        if (response.includes("#resposta_da_busca#")) {
            //se cairmos aqui significa que recebemos a resposta da busca
        }
    });
}









function numero_aleatorio(numero_inicial, numero_limite) {
    return Math.floor(Math.random() * (numero_inicial - numero_limite)) + numero_limite;
}

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        enviar()
    }
});
let contexto_da_conversa = ""













function cria_imagem(phrase) {
    let url = `https://image.pollinations.ai/prompt/{${phrase}}`;
    let ul = document.querySelector('.ul-lista-de-conversa');

    fetch(url)
        .then(response => response.blob())
        .then(imageBlob => {
            const li = document.createElement('li');
            const img = new Image();
            img.src = URL.createObjectURL(imageBlob);
            li.appendChild(img);
            ul.appendChild(li);
        })
        .catch(error => console.error(error));
}





let modo_imagem = false;


function enviar() {
    try {

        function pergunta_pra_outra_ia(pergunta_) {



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
                    let resposta_final_da_ia = data
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


                    if (modo_imagem == false) {


                        //se vier uma resposta invalida continue tentando buscar
                        if (resposta_final_da_ia == "" || resposta_final_da_ia == undefined || resposta_final_da_ia == "{}") {
                            if (tentativas_de_resposta == 0) {
                                tentativas_de_resposta = 1;
                                let ul = document.querySelector('.ul-lista-de-conversa');
                                let li = document.createElement('li');
                                li.setAttribute('class', 'resposta-bot');
                                let pre = document.createElement("pre")
                                pre.innerHTML = "...processando a resposta por favor aguarde ..."
                                li.appendChild(pre)
                                ul.appendChild(li);
                                rolar_para_ultimo_elemento_da_lista()
                                setTimeout(() => {
                                    pergunta_pra_outra_ia("responda em portugues levando em consideração o contexto da conversa : '" + contexto_da_conversa + "', não cite frases que já foram ditas no contexto." + pergunta_ + "?")
                                }, 5000)
                            } else if (tentativas_de_resposta == 1) {
                                tentativas_de_resposta = 2
                                let ul = document.querySelector('.ul-lista-de-conversa');
                                let li = document.createElement('li');
                                li.setAttribute('class', 'resposta-bot');
                                let pre = document.createElement("pre")
                                pre.innerHTML = "...processando a resposta por favor aguarde ..."
                                li.appendChild(pre)
                                ul.appendChild(li);
                                rolar_para_ultimo_elemento_da_lista()
                                setTimeout(() => {
                                    pergunta_pra_outra_ia("responda em portugues levando em consideração o contexto da conversa : '" + contexto_da_conversa + "', reformule a pergunta a seguir e responda sem citar como você reformulou a pergunta: '" + pergunta_ + "?'")
                                }, 5000)
                            } else if (tentativas_de_resposta == 2) {
                                tentativas_de_resposta = 0
                                let ul = document.querySelector('.ul-lista-de-conversa');
                                let li = document.createElement('li');
                                li.setAttribute('class', 'resposta-bot');
                                let pre = document.createElement("pre")
                                pre.innerHTML = "... infelizmente não consegui entender, poderia perguntar de outra forma? ..."
                                li.appendChild(pre)
                                ul.appendChild(li);
                                rolar_para_ultimo_elemento_da_lista()

                            }
                        } else {
                            tentativas_de_resposta = 0;
                            // a reposta estiver ok
                            let ul = document.querySelector('.ul-lista-de-conversa');
                            let li = document.createElement('li');
                            li.setAttribute('class', 'resposta-bot');
                            let pre = document.createElement("pre")
                            pre.innerHTML = resposta_final_da_ia
                            li.appendChild(pre)
                            ul.appendChild(li);
                            rolar_para_ultimo_elemento_da_lista()
                            setTimeout(() => {
                                modo_imagem = true;
                                pergunta_pra_outra_ia("na frase a seguir verifique sobre quem ou sobre o que está se falando e crie um prompto do midjournei com base no tema central da frase: '" + resposta_final_da_ia + "', não retorne nada alem do prompt solicitado. é obrigatorio que o prompt esteja em  inglês e que esteja no formato, description = {sceneDetailed), (adjective 1), (characters Detailed)(adjective2), (visualStyle1), (visualStyle2), (visualStyle3}, (genre), {artistReference) ")
                                
                            }, 5000);
                        }




                    } else if (modo_imagem == true) {
                        modo_imagem = false;
                        cria_imagem(resposta_final_da_ia)
                        rolar_para_ultimo_elemento_da_lista()
                    }
                });





        }






    } catch (error) {
        console.log(`erro ao buscar siginificado "${error}"`)
    }
    try {
        let entrada_do_usuario = document.querySelector("#entrada-do-usuario").value;
        ultima_pergunta = entrada_do_usuario
        let ul = document.querySelector('.ul-lista-de-conversa');
        let li = document.createElement('li');
        li.setAttribute('class', 'entrada_usuario');
        let text = document.createTextNode(entrada_do_usuario);
        li.appendChild(text);
        ul.appendChild(li);
        document.querySelector("#entrada-do-usuario").value = "";
        contexto_da_conversa += document.querySelector('ul li:last-child').textContent;
        if (contexto_da_conversa == "Oi, como posso ajudar?") {
            contexto_da_conversa = ""
        }
        pergunta_pra_outra_ia("responda em portugues levando em consideração o contexto da conversa : '" + contexto_da_conversa + "', não cite frases que já foram ditas no contexto. use o contexto apenas como base para vc saber o assunto que está sendo dito e responda apenas a pergunta a seguir levando em consideração o contexto. segue-se a pergunta: " + entrada_do_usuario + "?")
    } catch (error) {
        console.log(`erro no enviar "${error}"`)
        let ul = document.querySelector('.ul-lista-de-conversa');
        let li = document.createElement('li');
        li.setAttribute('class', 'resposta-bot');
        let pre = document.createElement("pre")
        pre.innerHTML = "não estou conseguindo entender, poderia perguntar de outar forma?"
        li.appendChild(pre)
        ul.appendChild(li);
        rolar_para_ultimo_elemento_da_lista()
    }
}

let ultima_pergunta = "";
let tentativas_de_resposta = 0;

function rolar_para_ultimo_elemento_da_lista() {
    try {
        document.querySelector("#resultado").scrollTop += 50;
    } catch (error) {
        console.log(`erro ao rolarar para ultimo elemento da lista "${error}"`)
    }
}