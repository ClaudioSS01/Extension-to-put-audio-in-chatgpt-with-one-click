function pesquisar(query) {
    return new Promise(async (resolve, reject) => {
        // Converte a frase em uma string válida para usar na URL da pesquisa
        const searchTerm = encodeURIComponent(query.replace(/\s/g, "+"));
        const searchUrl = `https://www.google.com/search?q=${searchTerm}`;

        try {
            // Faz a requisição à URL da pesquisa
            const res = await fetch(searchUrl, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                },
            });
            const html = await res.text();

            // Extrai todos os links da página de resultados
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const links = Array.from(doc.querySelectorAll("a")).map(
                (a) => a.getAttribute("href")
            );

            // Concatena o texto de todas as páginas que são acessadas
            let result = "";
            for (const link of links) {
                if (!link || !link.startsWith("http")) {
                    continue;
                }

                try {
                    const res = await fetch(link, {
                        headers: {
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                        },
                    });
                    const text = await res.text();
                    result += text;
                } catch (error) {
                    console.error(`Erro ao acessar ${link}: ${error.message}`);
                }
            }

            console.log(result)
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

async function main() {
    try {
      const result = await pesquisar("o que é sabão");
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  
  main();
  