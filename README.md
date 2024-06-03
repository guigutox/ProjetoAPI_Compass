# Projeto API Compass

## Índice 

- [Instalação](instalação)
- [Endpoints](#endpoints)

## Instalação
Para que seja possível rodar a API de forma local, siga os passos a seguir:

1. Clone o repositório:  
```git clone https://github.com/guigutox/ProjetoAPI_Compass/tree/main ```

2. Navavegue até o repositório:  
   ```cd  repositorio```

3. Abra o terminal e instale as dependências:  
   ``` npm install```

4. Instale o MYSQL server: https://dev.mysql.com/downloads/installer/

5. Instale o MYSQL WorkBench: https://www.mysql.com/products/workbench/

   1. Abra o MYSQL WorkBench e rode o seguinte script:  
   ~~~sql
   -- Criar DataBase
   CREATE DATABASE projetoapicompass;

   -- Comando para usar o database criado
   USE projetoapicompass;

   -- Criar tabela cidade
   CREATE TABLE cidades(
       id INT PRIMARY KEY,
       nome VARCHAR(50) NOT NULL,
       estado VARCHAR(50) NOT NULL
   );

   -- Criar tabela clientes
   CREATE TABLE clientes (
       id INT PRIMARY KEY,
       nome_completo VARCHAR(100) NOT NULL,
       sexo VARCHAR(15),
       data_nascimento DATE,
       idade INT, 
       cidade_id INT,
       CONSTRAINT fk_cidade FOREIGN KEY (cidade_id) REFERENCES cidades(id)
   );

   -- Popular tabelas
   -- Inserir dados na tabela cidades
   INSERT INTO cidades (id, nome, estado) VALUES
   (1, 'São Paulo', 'São Paulo'),
   (2, 'Rio de Janeiro', 'Rio de Janeiro'),
   (3, 'Salvador', 'Bahia'),
   (4, 'Fortaleza', 'Ceará'),
   (5, 'Manaus', 'Amazonas'),
   (6, 'Porto Alegre', 'Rio Grande do Sul'),
   (7, 'Barreiras', 'Bahia');

   -- Inserir dados na tabela clientes
   INSERT INTO clientes (id, nome_completo, sexo, data_nascimento, idade, cidade_id) VALUES
   (1, 'Ana Silva', 'Feminino', '1990-05-15', 31, 1),
   (2, 'João Santos', 'Masculino', '1985-09-20', 36, 2),
   (3, 'Maria Oliveira', 'Feminino', '1988-07-10', 33, 3),
   (4, 'Pedro Souza', 'Masculino', '1995-03-25', 26, 4),
   (5, 'Juliana Costa', 'Feminino', '1992-11-12', 29, 5),
   (6, 'Lucas Pereira', 'Masculino', '1980-12-30', 41, 6); 
   ~~~


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

- ### DELETE /clientes
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
 