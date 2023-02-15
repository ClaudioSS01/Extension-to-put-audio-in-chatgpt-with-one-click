console.log("versão 13-01-2023")

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  if (changeInfo.status == 'complete') {

    // executa quando a pagina for carregada

    try {

      chrome.browserAction.setBadgeText({
        text: 'OFF',
        code: `    console.log('background.js');`
      })
    } catch (error) {

    }

  }
})




//aqui ativa quando o icone é clicado
//esse chama o ia_kwl.js
chrome.browserAction.onClicked.addListener(function (tab) {
  
  //antes a ideia era executar em qq pagina assim em segundo plano agora a ideia é ter a propria pagina
  //  chrome.tabs.executeScript(null, {
  //    file: "ia_kwl.js"
  // });
  chrome.tabs.create({
    'url': "/bot.html"
  });
 
});



var codigo___ = '';

//============================================
//receber mensagem
//=========================================



//aqui temos o codido que queremos que seja executado na pagina



//se o background receber o comando de opções abra opções
//chrome.tabs.create({'url': "/options.html" } )



//======================================
//codigo abaixo aguarda uma mensgasem 
//====================================
/*
 


 //==========================
 //enviar mensagem
 //==========================

 //esse codigo abaixo envia uma mensagem para o background
 function enviar_para_background_js(chave,valor_a_ser_salvo){
    
//envia mensagem para o background.js
//chrome.runtime.sendMessage(chave+valor_a_ser_salvo);
chrome.runtime.sendMessage(chave+valor_a_ser_salvo, function (response) {
    console.log("\r\n\r\n\r\n resposta: "+response+"\r\n\r\n\r\n")
});
}
 
 















//============================================
//receber mensagem
//=========================================

  //aqui vamos detectar se a mensagem enviada foi o nome
var termo_de_busca_1 = "nome_hub";
//caminho onde vamos colocar o nome
var caminho_para_anaxar = 'document.querySelector("#razao_cliente").value';
//o que estamos colando na pagina
var o_que_estamos_colocando_pagina = "nome";
//codigo a ser adicionado na pagina
var codigo = "var "+o_que_estamos_colocando_pagina+"_bruto = '"+response+"';"
   codigo += "var "+o_que_estamos_colocando_pagina+" = "+o_que_estamos_colocando_pagina+"_bruto.replace('"+termo_de_busca_1+"','');"
   codigo += ""+caminho_para_anaxar+" = "+o_que_estamos_colocando_pagina+";"
  // codigo += "console.log('\r\n\r\n\r\n recebido: "+response+" \r\n "+o_que_estamos_colocando_pagina+" adicionado \r\n\r\n\r\n')"
//fim do codigo para adicionar
if(response.includes(termo_de_busca_1)){

  //enviando mensagem para todas as abas
chrome.tabs.executeScript(null,{
  //diz para a funcão qual codigo vamos executar na pagina
  code:    codigo
})
  
}






 */
//ele aguarda uma mensagem e da alerta
chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  console.log(`o codigo recebido foi "${response}"`);



  //aqui vamos detectar se a mensagem enviada foi o nome
  //var termo_de_busca_1 = "nome_hub";
  //caminho onde vamos colocar o nome
  //var caminho_para_anaxar = 'document.querySelector("#razao_cliente").value';
  //o que estamos colando na pagina
  //var o_que_estamos_colocando_pagina = "nome";
  //codigo a ser adicionado na pagina
  //var codigo = "var "+o_que_estamos_colocando_pagina+"_bruto = '"+response+"';"
  // codigo += "var "+o_que_estamos_colocando_pagina+" = "+o_que_estamos_colocando_pagina+"_bruto.replace('"+termo_de_busca_1+"','');"
  //codigo += ""+caminho_para_anaxar+" = "+o_que_estamos_colocando_pagina+";"
  // codigo += "console.log('\r\n\r\n\r\n recebido: "+response+" \r\n "+o_que_estamos_colocando_pagina+" adicionado \r\n\r\n\r\n')"
  //fim do codigo para adicionar
  //if(response.includes(termo_de_busca_1)){
  var codigo = `console.log('\r\n\r\n\r\n background recebeu o codigo a mensgaem: '); console.log(${response});`

  //enviando mensagem para todas as abas
  chrome.tabs.executeScript(null, {
    //diz para a funcão qual codigo vamos executar na pagina
    code: codigo
  })

  //}



















  //pegar o texto de verdadeiro ou falso do clipboard
  //no verdadeiro ou falso vamos abrir o google em uma nova aba
  //realizar a pesquisa com as palavras que queremos saber se é verdadeiro ou falso
  //vamos pegar todos os links de resposta
  //entrar em cada link e pegar o conteudo
  //salvar o conteudo e o link para usar depois
  //ao pegar cada link fechar a aba que ja foi retirada o texto
  //salvar o texto original em outra variavel
  //vamos quebrar o texto que queresmo saber se é verdadeiro
  //tirar o lixo do texto 
  //transoformar cada palavra em pontos e se a palavra repetir ela vale o dobro de pontos
  //quebrar cada texto em paragrafos
  //ver qual paragrafo tem mais pontos 
  //retornar o link de onde o paragro veio e o paragrafo mais relevante



  codigo___ = `
  
    console.log('verdadeiro ou falso ativado no background')
    
    `;

  //fim do codigo para adicionar
  if (response.includes("verdadeiro_ou_falso")) {

    //enviando mensagem para todas as abas
    chrome.tabs.executeScript(null, {
      //diz para a funcão qual codigo vamos executar na pagina
      code: codigo___
    })

  }














  //abrir a pagina opções.html
  if (response.includes('abrir opções')) {
    try {
      chrome.tabs.create({
        'url': "/option.html"
      });
      chrome.tabs.executeScript(null, {
        //diz para a funcão qual codigo vamos executar na pagina
        code: 'página opçoes aberta com sucesso'
      })
      console.log('página opçoes aberta com sucesso')
    } catch (error) {
      chrome.tabs.executeScript(null, {
        //diz para a funcão qual codigo vamos executar na pagina
        code: 'erro ao abrir pagina de opções :::' + error
      })
      console.log('erro ao abrir pagina de opções :::' + error)
    }
  }












  //INICIO DA BUSCA DE SIGINIFICADO 
  //============================================================================================================================
  //SE PEDIR PARA FAZER UMA PESQUISA SOBRE SIGINIFICADO
  if (response.includes('#buscar-SIGINIFICADO#')) {

 
  }
  //=============================================================================================================================
  //FIM DA BUSCA DE SIGINIFICADO















  //SE RECEBER EXIBIR MOSTRE O TEXTO A SEGUIR
  if (response.includes('ON')) {
    try {
      chrome.browserAction.setBadgeText({
        text: "ON"
      })








      /*
        elemento = texto;
        const textoArray = elemento.split('');
        elemento.innerHTML = ' ';
        textoArray.forEach(function (letra, i) {
    
            setTimeout(function () {
    
              chrome.browserAction.setBadgeText({
                text: letra
              })
    
            }, 20 * i)
    
        });

       
       */



    } catch (error) {
      console.log('erro :::' + error)
    }
  }













  //SE RECEBER EXIBIR MOSTRE O TEXTO A SEGUIR
  if (response.includes('OFF')) {

    chrome.browserAction.setBadgeText({
      text: "OFF"
    })


  }



  //=====================================================================
  //nao aterar daqui pra baixo
  //======================================================================
  //envia novamente para a pagina a resposta
  sendResponse(response);

  //envia mensagem no console do proprio background.js que é um conseole oculto
  //chrome.extension.getBackgroundPage().console.log('recebido no background: '+response+'; document.querySelector("#razao_cliente").value = "funlano";');



  //enviando mensagem para todas as abas
  chrome.tabs.executeScript(null, {
    code: "console.log(`\r\n\r\n\r\n background diz: recebido a mensagem: '" + response + "' \r\n\r\n\r\n`)"
  })




});