//inicia sem clicar

console.log('aqui.js')
var port = chrome.runtime.connect({name:"mycontentscript"});
port.onMessage.addListener(function(message,sender){
console.log("versão 13-01-2023")



///==========================================================
///==========================================================
///==========================================================
///==========================================================
///==========================================================
///==========================================================
///==========================================================



status("Quality Agro Criado por Claudio S. S. - versão 10/05/2021");







url_atual = window.location.href;

contador = 0;

var loopinho = setInterval(function () {
    //verificando se a url é a do hubspot
    if (url_atual.includes('app.hubspot.com/')) {

        status('Estamos no hubspot...')
        status('Procurando as tags dos dados...');
        pega_dados_do_hubspot();
    } else if (url_atual.includes('app.vhsys.com.br/')) {
        status('Estamos no VHsys');
 
        //ouvir()



    } else {
        status("Aguardando estarmos no hubspot ou vhsys")
    }
    contador = contador + 1;
}, 5000)











function pega_dados_do_hubspot() {

    status(" \r\n\ ")
    status(" \r\n\ ")
    status(" \r\n\ ")

    try {
    
        nome = document.querySelector('[data-selenium-test="contact-chicklet-title-link"]').textContent;
        enviar_para_background_js("nome_hub",nome);
        status("nome: " + nome);
    } catch (error) {
        status("erro ao pegar nome: " + error);
    }

    try {

        valor = document.querySelector('[data-selenium-test="currency-component-loaded"]').textContent;
        enviar_para_background_js("valor_hub",valor);
        status("valor: " + valor);
    } catch (error) {
        status("erro ao pegar o valor: " + error);
    }

    try {
              data_do_fechamento = document.querySelector('[data-selenium-test="DealHighlightDetailsCloseDateInput"').innerHTML;
        //tratando a data pega
        //qubrando em array
        lista_da_data = data_do_fechamento.split(" ");
        data_tratada = ""
        for(x = 0; x< lista_da_data.length; x++){
            texto_atual =  lista_da_data[x];
            if(texto_atual.includes('value="')){
                texto_semi_bruto1 = texto_atual.replace("value=","")
                texto_semi_bruto2 = texto_semi_bruto1.replaceAll('"','')
                data_tratada = texto_semi_bruto2.replace("><div","")
            }
        }
        //console.log(data_tratada)
        enviar_para_background_js("data_do_fechamento_hub",data_tratada);
        status("data do fechamento: " + data_tratada);
    } catch (error) {
        status("data do fechamento: " + error);
    }

    try {
        //o elemento do vendedor
            vendedor = document.querySelector('[data-selenium-test="property-input-hubspot_owner_id"]').textContent;
        enviar_para_background_js("vendedor_hub",vendedor);
        status("nome vendedor: " + vendedor)
    } catch (error) {
        status("erro ao pegar o nome do vendedor: " + error);
    }

    try {
        //elemento telefone do cliente
           telefone_cliente = document.querySelector('[data-unit-test="contact-chicklet-phone"]').textContent;
        enviar_para_background_js("telefone_cliente_hub",telefone_cliente);
        status("telefone do cliente: " + telefone_cliente);

    } catch (error) {
        status("erro ao pegar o telefone do cliente: " + error);
    }

    try {
        //elemento do email
             email_cliente = document.querySelector('[data-selenium-test="contact-chicklet-email"]').textContent;
        enviar_para_background_js("email_cliente_hub",email_cliente);
        status("email do cliente: " + email_cliente);
    } catch (error) {
        status("erro ao pegar o email do cliente: " + error);
    }

    try {
        //elemento de observaçoes
     
        observacoes = document.querySelector('[class="onboarding-peek-timeline"]').textContent;
        //observacoes = observacoes_texto_bruto.replaceAll("GMT-3","\r\n\r\n")
        enviar_para_background_js("observacoes_hub",observacoes);
        status("observaçoes: " + observacoes);
    } catch (error) {
        status("erro ao pegar as observações: " + error);
    }

      //pegando cpf
    //   data-selenium-test="property-input-cpf"
    try {
        //elemento de observaçoes
     
        cpf = document.querySelector('[data-field="cpf"]').value;
        //observacoes = observacoes_texto_bruto.replaceAll("GMT-3","\r\n\r\n")
        //cpf = document.querySelector("#floating-input-128").value;
        enviar_para_background_js("cpf_hub",cpf.toString());
        status("cpf: " + cpf.toString());
    } catch (error) {
        status("erro ao pegar o cpf: " + error);
    }



    ///pegando rua
    try {
        rua = document.querySelector('[data-field="address"]').textContent
        enviar_para_background_js("rua_hub",rua.toString());
        status("rua: " + rua.toString());
    } catch (error) {
        status("erro ao pegar o rua: " + error);
    }


    
//pegando cidade
try {
    cidade = document.querySelector('[data-field="city"]').textContent
    enviar_para_background_js("cidade_hub",cidade.toString());
    status("cidade: " + cidade.toString());
} catch (error) {
    status("erro ao pegar o cidade: " + error);
}



//pegando estado
try {
    estado = document.querySelector('[data-field="state"]').textContent
    enviar_para_background_js("estado_hub",estado.toString());
    status("estado: " + estado.toString());
} catch (error) {
    status("erro ao pegar o estado: " + error);
}



    //pegando rua
    //data-selenium-test="property-input-address"



    //pegando cidade
    //data-selenium-test="property-input-city"

    status(" \r\n\ ")
    status(" \r\n\ ")
    status(" \r\n\ ")

    
    status("salvando dados...")



    status("fim da capitura de dados...")
    

    clearInterval(loopinho)



}














































function enviar_para_background_js(chave,valor_a_ser_salvo){
    
//envia mensagem para o background.js
//chrome.runtime.sendMessage(chave+valor_a_ser_salvo);
chrome.runtime.sendMessage(chave+valor_a_ser_salvo, function (response) {
    console.log("\r\n\r\n\r\n resposta: "+response+"\r\n\r\n\r\n")
});
}

function ouvir(){
    chrome.runtime.sendMessage(function (response) {
        console.log("resposta: "+response)
    });  
}

































function postar() {
    var messageBox = document.querySelectorAll("[contenteditable='true']")[contador];

    //cria um evento de simulação do mouse para ativar o botao de enviar
    var eventFire = (MyElement, ElementType) => {
        var MyEvent = document.createEvent("MouseEvents");
        MyEvent.initMouseEvent(ElementType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        MyElement.dispatchEvent(MyEvent);
    };



    //quantas vezes a mensagem deve ser enviada
    counter = 1;

    for (d = 0; d < counter; d++) {
        //cria evento de simulação de interface humana
        event = document.createEvent("UIEvents");

        //remove a mensagem de digite um texto aqui
        messageBox.innerHTML = mensagem.replace();
        event.initUIEvent("input", true, true, window, 1);

        //coloca a mensagem na caixa
        messageBox.dispatchEvent(event);

        //envia a mensagem
        // eventFire(document.querySelector('span[data-icon="send"]'), 'click');
    }


    function click(caminho) {
        console.log("query selector pego: " + caminho)
        setTimeout(function () {
            //cria o evento a ser simulado o click
            var eventFire = (MyElement, ElementType) => {
                var MyEvent = document.createEvent("MouseEvents");
                MyEvent.initMouseEvent(ElementType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                MyElement.dispatchEvent(MyEvent);
            };

            //quantas vezes a mensagem deve ser enviada
            counter = 1;

            for (d = 0; d < counter; d++) {
                //cria evento de simulação de interface humana
                var event = document.createEvent("UIEvents");



                try {
                    console.log("iniciando metodo de click 1")
                    //tentando metodo de click 1;
                    //exemplo
                    //eventFire(document.querySelector('span[data-icon="send"]'), 'click');
                    eventFire(document.querySelector('' + caminho + ''), 'click');

                } catch (err) {
                    //em caso de erro no metodo de click 1
                    console.log("metodo de click 1 não obteve sucesso tentando metodo de click 2 erro: " + err.message)
                    try {
                        console.log("iniciando metodo de click 2")
                        //metodo de click 2
                        //exemplo
                        //document.querySelector('span[data-icon="send"]').click();
                        document.querySelector('' + caminho + '')[contador].click();

                    } catch (err) {
                        //nao obteve sucesso no metodo de click 2
                        console.log("metodo de click 2 não obeteve sucesso erro: " + err.message)
                    }

                }
            }


            //quanto tempo aguardar antes do click
        }, 1000)
    }

    //pegar o query selector
    //[contenteditable='true']
    click("button[aria-disabled='false']");
}



function status(texto) {
    console.log(texto)
}


///==========================================================
///==========================================================
///==========================================================
///==========================================================
///==========================================================
///==========================================================
///==========================================================
///==========================================================




});


