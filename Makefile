.PHONY: build
subir-para-git: 
	git add .
	git commit -m "Atualização em $$(date +"%Y-%m-%d %T")"
	git branch -M main
	git remote add origin https://github.com/ClaudioSS01/Extension-to-put-audio-in-chatgpt-with-one-click.git
	git push -u origin main