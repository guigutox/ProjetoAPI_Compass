# Projeto API Compass

## Índice 

- [Instalação](instalação)
- [Uso](#uso) 
- [Endpoints](#endpoints)

## Instalação

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
   (6, 'Porto Alegre', 'Rio Grande do Sul');

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



