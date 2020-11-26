# test_backend_leal

Los microservicios se encuentran en la carpeta src y dist. La carpeta src es para el desarrollo "development" y la carpeta dist es para el desarrollo "production".
Para la base de datos se utilizó mySQL bajo el puerto 3306 "localhost:3306". Se utilizaron diversos paquetes/librerías tales como passport, jsonwebtoken, md5, bcrypt, 
dotenv,  joi, sequelize, mocha, chai, entre otras.

## Base de datos

En la carpeta src y dist, cada directorio corresponde al microservicio solicitado. Para ejecutar los microservicios es necesario tener una base de datos 
corriendo en localhost:3306, con los siguientes datos:

**Host:** 'localhost'  <br />
**User:** 'root' <br />
**Password:** '' <br />
**Database:** 'abc-db' <br />
**port:** '3306' <br />

## Microservicios

Debe primero ejecutar el comando npm install para crear la carpeta node_modules y con esto, empezar a utilizar los microservicios. Por otro lado, se utilizan los puertos *4000 - 4006*, por lo que si desea correr los microservicios en estos puertos, 
únicamente ingrese el comando dev_{nombre de la carpeta del microservicio} para usar los scripts programados. 

**user_register**: port 4000  --- Post: http://localhost:4000/signup <br />
**user_login**: port 4001 --- Post: http://localhost:4001/signin <br />
**transaction_create_**: port 4002 --- Post: http://localhost:4002/transaction/create  <br />
**transaction_inactive_**: port 4003  --- Put: http://localhost:4003/transaction/inactive/:id <br />
**transaction_history_**: port 4004 --- Get: http://localhost:4004/transaction/history <br />
**transaction_totalpoints_**: port 4005 --- Get: http://localhost:4005/transaction/totalpoints<br />
**transaction_excel_**: port 4006 --- Post: http://localhost:4006/transaction/excel<br />

## Ejemplos para uso de Insomnia o Postman 

![register](https://user-images.githubusercontent.com/55201355/86304378-48f99b00-bbd4-11ea-82ee-602b6586070e.png)

![login](https://user-images.githubusercontent.com/55201355/86304395-557df380-bbd4-11ea-901a-ed3e4e5df676.png)

![create](https://user-images.githubusercontent.com/55201355/86304406-5dd62e80-bbd4-11ea-944e-904fd4d5957e.png)

- Para los demás microservicios solo es necesario enviar la petición HTTP. 

- luego de enviada la petición de http://localhost:4000/signup, se debe enviar GET: http://localhost:4000/logout para luego volver a usar el microservicio de register. Esto debido al funcionamiento de la librería passport utilizada.

- luego de enviada la petición de http://localhost:4001/signin, se debe enviar GET: http://localhost:4001/logout para luego volver a usar el microservicio de login. Esto debido al funcionamiento de la librería passport utilizada.



## TOKEN JWT

Es importante mencionar que, para los microservicios diferentes al login y register, debe colocar el token como header en una petición HTTP , cuyo nombre de cabecera debe 
llamarse "x-access-token". Para conseguir este token, se debe primero ejecutar el microservicio de *dev_user_register* o *dev_user_login* y copiar el token generado.

![header](https://user-images.githubusercontent.com/55201355/86293640-ab44a280-bbb8-11ea-9e16-0de9439dbcef.png)

## Test: mocha and chai 

Para ejecutar el test de prueba; primero, se debe instalar la carpeta node_modules con el comando npm install; segundo, se debe usar el comando
**npm run test** para correr automáticamente  el test de prueba para el proyecto backend realizado.

El test tendrá el resultado que se puede observar en la siguiente imagen. Adicionalmente, cada prueba tiene de forma detallada el resultado que debe arrojar.

Los archivos en la rama "master", son los mismos que estaban en la rama "version" anterior. Se modifico el archivo pruebas.spec.js de la carpeta test para hacer funcionar las pruebas con mocha y chai. 

![test](https://user-images.githubusercontent.com/55201355/86294615-86512f00-bbba-11ea-8d9d-b6db1cecc0d9.png)

