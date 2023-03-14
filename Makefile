.PHONY: build
subir-para-git: 
	git add -A || echo "Nenhum arquivo adicionado."
	git commit -m "Atualização em $$(date +"%Y-%m-%d %T")" || (echo "Nada para commitar." && exit 0)
	git branch -M main
	git remote add origin https://github.com/ClaudioSS01/Extension-to-put-audio-in-chatgpt-with-one-click.git || echo "O repositório remoto já existe."
	git push -u origin main || echo "Erro ao enviar para o repositório remoto."
