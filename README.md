# Test Practico Frontend

En este servidor encontrara un API REST la cual consume un API REST de un cliente externo, este proyecto tiene como objetivo enviar la información por medio de peticiones htttp a un cliente visual en React

## Estrategia de diseño de aplicaciones

Esta aplicación está diseñada consumir un servicio de API REST utilizando NodeJs y archivos de configuración para declarar rutas, configuraciones y servicios.

Este proyecto se ha desarrollado utilizando NodeJs con express, está destinado a consumir API REST que manejen solicitudes http y devuelvan respuestas http json válidas.

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

#### Instalar dependencias backend

para instalar las depencias que se encuentran en el archivo package.json es necesario ejecutar el siguiente comando

- npm install

#### Iniciar el servidor web

Ejecute la siguiente línea para iniciar el servidor

```sh
npm run dev
```

## Realización de solicitudes HTTP a las API REST expuestas

Una vez inciados ambos servidores ml-shop-back y ml-shop-front en su terminal, se abrira una nueva pestaña en su navegador por defecto.
En la pantalla principal podra realizar las siguiente solicitudes

| ITEM | URL |
| ------ | ------ |
| Inicio | http://localhost:8080/api/items/?search=${query} |
| Lista de procuctos | http://localhost:8080/api/items/${id} |

## Definición de parametros de busqueda

- {query}: Palabra clave por la cual el Api buscara las coincidencias y devolvera una lista de las mismas.
- {id}: Id del procuto que se quiere obtener directamente del Api

