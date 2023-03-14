let paragraphs = document.getElementsByTagName('p');

for (let i = 0; i < paragraphs.length; i++) {
  const button = document.createElement('button');
  button.textContent = 'Ler';
  button.setAttribute('style','background:black; color:white;');
  button.setAttribute('id','speak');
  paragraphs[i].parentNode.insertBefore(button, paragraphs[i].nextSibling);
}

document.addEventListener("click", (event) => {
    if (event.target.id === "speak") {
      const parentText = event.target.parentNode.textContent;
      console.log(parentText)
      speak(parentText);
    }
  });


//const userLang = navigator.language;
function speak(text) {
  let msg = text;
  let speech = new SpeechSynthesisUtterance();
speech.lang = "pt-br";
  speech.text = msg;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}


// seleciona o elemento que será observado
const targetNode = document.querySelector('body');

// cria uma nova instância da MutationObserver
const observer = new MutationObserver(function(mutationsList, observer) {
    // verifica cada mutação no DOM
    for(let mutation of mutationsList) {
        // verifica se um novo elemento <p> foi adicionado
        if (mutation.type === 'childList') {
            for (let node of mutation.addedNodes) {
                if (node.nodeName === 'P') {
                    const button = document.createElement('button');
                    button.textContent = 'Ler';
                    button.setAttribute('id', 'speak');
                    node.appendChild(button);
                    console.log('Novo elemento <p> adicionado:', node);
                }
                
            }
        }
    }
});

// configura as opções de observação
const config = { childList: true, subtree: true };

// inicia a observação do DOM
observer.observe(targetNode, config);
