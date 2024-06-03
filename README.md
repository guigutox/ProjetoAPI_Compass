# Projeto API Compass

## Índice 

- [Instalação](instalação)
- [Endpoints](#endpoints)

## Instalação
Para que seja possível rodar a API de forma local, siga os passos a seguir:

1. Clone o repositório:  
```git clone https://github.com/guigutox/ProjetoAPI_Compass.git ```

2. Navavegue até o repositório:  
   ```cd  ProjetoAPI_Compass```

3. Abra o terminal e instale as dependências:  
   ``` npm install```

4. Instale o MYSQL server: https://dev.mysql.com/downloads/installer/

5. Instale o MYSQL WorkBench: https://www.mysql.com/products/workbench/

   1. Abra o MYSQL WorkBench e rode o seguinte script:  
    [Script para criar e popular o banco](script.sql)


7. Crie um arquivo com o nome .env na raiz do projeto, ficará localizado junto aos arquivos index.js, package-lock.json e etc;

8. Preencha o arquivo da seguinte forma, substituindo x pelo nome do usuário do seu mysql instalado e y pela senha desse mesmo usuário:
    ```
    DB_USER=x  
    DB_PASSWORD=y
    ``` 

9. Inicie o servidor utilizando no terminal o comando: 
    ``` node index.js ```


---
## EndPoints

- ### POST /cidades
  - URL: `http://localhost:3001/cidades`
  - MÉTODO: `POST`
  - Descrição: Rota utilizada para cadastrar novas cidades
  - Formato da requisição:
    ~~~ json 
        {
        "id": integer,
        "nome": string,
        "estado": string
        }
    ~~~
  - Exemplo requisição de sucesso:
    ~~~json
        {
            "id": 1,
            "nome": "Uberlândia",
            "estado": "Minas Gerais"
        }
    ~~~
  - Resposta de Sucesso: `201 created`
  - Formato da resposta: 
    ~~~json 
        {
            "message": "Cidade criada com sucesso!"
        }
    ~~~

- ### POST /clientes
  - URL: `http://localhost:3001/clientes`
  - MÉTODO: `POST`
  - Descrição: Rota utilizada para cadastrar novos clientes
  - Formato da requisição:
    ~~~ json 
        {
        "id": integer,
        "nome_completo": string,
        "sexo": string,
        "data_nascimento": date,
        "idade": integer ,
        "cidade_id": integer
        }
    ~~~
  - Exemplo Requisição de sucesso: 
    ~~~ json 
        {
        "id": 1,
        "nome_completo": "Guilherme A",
        "sexo": "Masculino",
        "data_nascimento": "2002-02-12",
        "idade": 21 ,
        "cidade_id": 1
        }
    ~~~
  - Resposta de sucesso: `201 created`
  - Formato da resposta:
    ~~~json
        {
            "message": "Cliente criado com sucesso!"
        }
    ~~~

- ### GET /cidades/:nome
  - URL: `http://localhost:3001/cidades/:nome`
  - MÉTODO: `GET`
  - DESCRIÇÃO: Rota utilizada para buscar cidades passando o nome como parametro de busca
  - EXEMPLO REQUISIÇÃO DE SUCESSO: `http://localhost:3001/cidades/Salvador`
  - RESPOSTA DE SUCESSO: `200 OK`
  - EXEMPLO RESPOSTA:  
      ~~~json
          {
          "id": 3,
          "nome": "Salvador",
          "estado": "Bahia"
          }
      ~~~

- ### GET /estados/:estado/cidades
  - URL: `http://localhost:3001/estados/:estado/cidades`
  - MÉTODO: `GET`
  - DESCRIÇÃO: Rota utilizada para buscar cidades passando o nome do estado como parametro
  - EXEMPLO REQUISIÇÃO DE SUCESSO: `http://localhost:3001/estados/bahia/cidades`
  - RESPOSTA DE SUCESSO: `200 OK`
  - EXEMPLO RESPOSTA:  
      ~~~json
          {
          "id": 3,
          "nome": "Salvador",
          "estado": "Bahia"
          }
          { 
          "id": 7,
          "nome": "Barreiras",
          "estado": "Bahia"
          }
      ~~~
 
- ### GET /clientes/:id
  - URL: `http://localhost:3001/clientes/:id`
  - MÉTODO: `GET`
  - DESCRIÇÃO: Rota utilizada para buscar um cliente a partir de seu ID passado como parâmetro
  - EXEMPLO REQUISIÇÃO DE SUCESSO: `http://localhost:3001/clientes/1`
  - RESPOSTA DE SUCESSO: `200 OK`
  - EXEMPLO RESPOSTA:  
      ~~~json
        {
            "id": 1,
            "nome_completo": "Ana Silva",
            "sexo": "Feminino",
            "data_nascimento": "1990-05-15",
            "idade": 31,
            "cidade_id": 1
        }
      ~~~


- ### GET /clientes
  - URL: `http://localhost:3001/clientes?nome_completo=`
  - MÉTODO: `GET`
  - DESCRIÇÃO: Rota utilizada para buscar clientes pelo nome utilizando query parameters
  - EXEMPLO REQUISIÇÃO DE SUCESSO: `http://localhost:3001/clientes?nome_completo=Ana Silva`
  - RESPOSTA DE SUCESSO: `200 OK`
  - EXEMPLO RESPOSTA:  
      ~~~json
        {
            "id": 1,
            "nome_completo": "Ana Silva",
            "sexo": "Feminino",
            "data_nascimento": "1990-05-15",
            "idade": 31,
            "cidade_id": 1
        }
      ~~~

- ### DELETE /clientes/:id
  - URL: `http://localhost:3001/clientes/:id`
  - MÉTODO: `DELETE`
  - DESCRIÇÃO: Rota utilizada para deletar cliente  a partir de seus IDs
  - EXEMPLO REQUISIÇÃO DE SUCESSO: `http://localhost:3001/clientes/1`
  - RESPOSTA DE SUCESSO: `200 OK`
  - EXEMPLO RESPOSTA:  
      ~~~json
        {
            "message": "Cliente excluido com sucesso!"
        }   
      ~~~


- ### PATCH /clientes
  - URL: `http://localhost:3001/cidades`
  - MÉTODO: `PATCH`
  - Descrição: Rota para atualizar o nome completo dos cliente a partir de seus IDs
  - Formato da requisição:
    ~~~ json 
        {
        "id": integer,
        "nome_completo": string,
        }
    ~~~
  - Exemplo requisição de sucesso:
    ~~~json
        {
            "id": 1,
            "nome_completo": "Ana Paula"
        }
    ~~~
  - Resposta de Sucesso: `201 created`
  - Formato da resposta: 
    ~~~json 
        {
            "message": "Nome atualizado com sucesso!"
        }
    ~~~
 