# Test Práctico Frontend

En este servidor encontrará un API REST la cual consume otra API REST de un cliente externo, este proyecto tiene como objetivo enviar la información por medio de peticiones http a un cliente visual en React

## Estrategia de diseño de aplicaciones

Esta aplicación está diseñada consumir un servicio de API REST utilizando NodeJs y archivos de configuración para declarar rutas, configuraciones y servicios.

Este proyecto se ha desarrollado utilizando NodeJs con Express JS, está destinado a consumir API REST que manejen solicitudes http y devuelvan respuestas http json válidas.

## Iniciemos

Siga los subtemas a continuación para configurar su entorno, ejecutar el servidor web y trabajar con los puntos finales de la API Rest.

#### Requisitos del sistema operativo
Asegúrese de que se cumplan los siguientes requisitos antes de comenzar.

- Cliente git
- Node >= v16.14.2
- Un cliente web como Postman o Insomia

#### Clonar el repositorio

```sh
git@github.com:Daniela10289/ml-shop-back.git
```

#### Instalar dependencias

para instalar las dependencias que se encuentran en el archivo package.json es necesario ejecutar el siguiente comando

```sh
npm install
```

#### Iniciar el servidor web

Ejecute la siguiente línea para iniciar el servidor

```sh
npm run dev
```

## Realización de solicitudes HTTP a las API REST expuestas

Una vez iniciado el servidor en su terminal, se mostrará el puerto del API en la consola.
Podrá realizar las peticiones http desde Postman o Insomia.

| ITEM | URL |
| ------ | ------ |
| Inicio | http://localhost:8080/api/items/?search={query} |
| Lista de productos | http://localhost:8080/api/items/{id} |

## Definición de parámetros de búsqueda

- {query}: Palabra clave por la cual el Api buscara las coincidencias y devolverá una lista de las mismas.
- {id}: Id del producto que se quiere obtener directamente del Api

