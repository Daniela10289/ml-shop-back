const axios = require('axios');
const { response } = require('express');

class ItemService {

  buildItem(item) {
    // Formato de los atributos del item
    // Se asigna valor a cada campo
    return {
      "id": item.id,
      "title": item.title,
      "price": {
        "currency": item.currency_id,
        "amount": item.price,
        "decimals": Number, // TODO: este campo no se encontró en la estructura original
      },
      "picture": item.thumbnail,
      "condition": item.condition,
      "free_shipping": item.shipping.free_shipping,
      "sold_quantity": item.sold_quantity,
      "city_name": item.seller_address.city.name
    }
  }

  async find(query) {
    // Solicitar la información de los items en la API original
    // según el parametro de busqueda.
    
    let categoryIds = [];

    let response = {
      "author":
      {
        "name": "Daniela",
        "lastname": "Palacio Perez"
      },
      categories: [],
      items: []
    }

    return axios
      .get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
      .then((res) => {

        // Mostrar solo cuatro resultados
        const foundItems = res.data.results.slice(0, 4);
        foundItems.forEach(item => {
          response.items.push(this.buildItem(item));
          categoryIds.push(item.category_id);
        });

        return this.processCategories(categoryIds)
          .then((categories) => {
            response.categories = categories;
            return response
          })

      })
      .catch((error) => {
        console.log("error!!! " + error);
        return response;
      });
  };

  processCategories(categoryIds) {
    // Método para obtener las categorias del item

    let mainCategory = null;

    if (categoryIds) {
      let categoryCount = {};

      categoryIds.forEach((c) => {
        if (c in categoryCount) {
          categoryCount[c]++;
        } else {
          categoryCount[c] = 1;
        }
      })

      // En mainCategory se pretende obtener la categoria que mas repite
      let uniqueCategories = Object.keys(categoryCount)
      let countValues = uniqueCategories.map(k => categoryCount[k]);
      mainCategory = uniqueCategories.filter(c => categoryCount[c] === Math.max(countValues))[0];
    }

    const promise = axios.get(`https://api.mercadolibre.com/categories/${mainCategory}`);

    return promise.then((res) => {
      return res.data.path_from_root.map(c => c.name);
    }).catch((error) => {
      console.log("error!!! " + error);
      throw error;
    });
  }

  async findOne(id) {
    // Solicitar la información de los items en la API original
    // según el id.

    let response = {
      "author":
      {
        "name": "Daniela",
        "lastname": "Palacio Perez"
      },
      categories: [],
      item: {}
    }

    try {
      return axios
        .get(`https://api.mercadolibre.com/items/${id}`)
        .then((res) => {
          const itemDetail = res.data;
          if (itemDetail) {

            response.item = this.buildItem(itemDetail);

            // Petición al API original para obtenr la descripción del item
            // según su id
            return axios
              .get(`https://api.mercadolibre.com/items/${id}/description`)
              .then((res) => {
                const itemDescription = res.data;
                if (itemDescription) {
                  response.item.description = itemDescription.plain_text;
                }

                return this.processCategories([itemDetail.category_id])
                  .then((categories) => {
                    response.categories = categories;
                    return response;
                  });
              });
          }
        });
    } catch (error) {
      return response;
    }

  }
}

module.exports = ItemService;