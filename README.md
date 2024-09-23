# 🟨	 Projeto Final para Curso Pós Graduação em Desenvolvimento Full Stack - MVP_Fullstack 🚀 

# ☑️ Sumário 
1. [Introdução](#introduction)  
2. [Screenshots](#Screenshots) 🖥️
3. [Instalação 😊🚀 ](#paragraph1)
4. [Deployment - Implantação 😊🚀](#paragraph2)
5. [Referência da API ](#paragraph3) 📦 
    
    5.1. [Exemplos de Métodos HTTP - Referência da API](#subparagraph3) 📬

## Introdução

🔸 MVP_Fullstack
Projeto Final de desenvolvimento de uma API Backend (Python + Flask) para o Curso de Desenvolvimento Full Stack - Pós Graduação - PUC RJ

## Screenshots  

![App Screenshot](https://github.com/ledelmastro/MVP_Fullstack_Back_End/blob/main/Screenshot2.png?raw=true)

![App Screenshot](https://github.com/ledelmastro/MVP_Fullstack_Back_End/blob/main/Screenshot1.png?raw=true)

## Instalação

☑️ 1. Clone o projeto  ↪️
~~~ bash  
  git clone https://github.com/ledelmastro/MVP_Fullstack_Front_End
~~~

Vá para o diretório local onde o projeto foi baixado ↪️

~~~bash  
  cd MVP_Fullstack_Front_End
~~~

Se estiver usando VsCode, abra o diretório local da aplicação ↪️

        CTRL+K+O -> escolha o diretório onde o projeto foi clonado 

ou utilize os atalhos para visualização local:
~~~bash  
   Clique com botão direito e escolha a opção -> Open Preview
   Clique com botão direito e escolha a opção -> Show in Browser
~~~

## Visualização através do Gerenciador de Arquivos

Abra seu gerenciador de arquivos no local onde o repositório foi baixado e abra o arquivo index.html em seu browser de preferência ↪️

~~~bash  
   Abrir com -> Browser de preferência (Chrome, Edge, Firefox, Opera, etc)
~~~

## Referência da API

☑️ Para conferir a documentação da API e testar suas requisições, abra o endereço http://127.0.0.1:5000/swagger/ em seu navegador de preferência.

## Exemplos de Métodos HTTP - Referência da API 📬📦

|        Parameter         | Type    | Description                       |
|--------------------------|---------|-----------------------------------|
|📂GET - /user/{id_user}  | `string`| **Required "id_user", 200 - "Usuario localizado com sucesso."**      |
|📮POST - /login            | `string`| **Required "login","password", 200 - "Login realizado com sucesso"** |
|✅PUT - /user/{id_user}    | `string`| **Required "id_imovel", 201 - "Imovel alterado com sucesso."**       |
|❌DELETE - /user/{id_user} | `string`| **Required "id_user", 200 - "Usuario deletado com sucesso."**       |


## Tech Stack  

**Client:** Flask, Python

**Server:** SQLAlchemy

## Autora

- [@ledelmastro](https://github.com/ledelmastro)
