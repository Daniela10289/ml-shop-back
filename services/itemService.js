const axios = require('axios');
const { response } = require('express');

class ItemService {

    buildItem(item) {
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
      let categoryIds = [];

      let response =  {
        "author": 
          { "name": "",
            "lastname": ""
          },
        categories: [],
        items: []
      }
      
    return axios
      .get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
      .then((res) => {
        console.log(res);

        const foundItems = res.data.results.slice(0, 4);
        foundItems.forEach(item => {
          // response.author.name = item.seller.eshop.nick_name; TODO
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

      let mainCategory = null;

      if(categoryIds) {
        let categoryCount = {};

        categoryIds.forEach((c) => {
          if(c in categoryCount) {
            categoryCount[c]++;
          }else {
            categoryCount[c] = 1;
          }
        })
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
   
    let response =  {
      "author": 
        { "name": "",
          "lastname": ""
        },
      categories: [],
      item: {}
    }
    
    debugger
    
    try {
     return axios
      .get(`https://api.mercadolibre.com/items/${id}`)
      .then((res) => {
        const itemDetail = res.data;
        if(itemDetail) {

          response.item = this.buildItem(itemDetail);
          
         return axios
          .get(`https://api.mercadolibre.com/items/${id}/description`)
          .then((res) => {
            const itemDescription = res.data;
            if(itemDescription) {
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
    }catch(error) {
      return response;
    }
    
  }
}

module.exports = ItemService;