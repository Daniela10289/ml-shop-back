const axios = require('axios');

class ItemService {

      buildItem(item) {
        return {
          "id": 1,
          "title": item.title,
          "price": {
            "currency": item.prices.prices[0].currency_id,
            "amount": item.prices.prices[0].amount,
            "decimals": Number, // TODO: este campo no se encontró en la estructura original
          },
          "picture": item.thumbnail,
          "condition": item.condition,
          "free_shipping": item.shipping.free_shipping,
          "sold_quantity": item.sold_quantity
          } 
      }

      async find(query) {
        debugger
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
            return response
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
        const promise = axios.get(`https://api.mercadolibre.com/categories/${mainCategory}`)
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
        { "name": "Daniela",
          "lastname": "Palacio"
        },
      categories: ["Niños", "Jovenes", "Adultos"],
      items: []
    }
    
    try {
      const itemDetail = await axios
      .get(`http://localhost:8080/api/items/${id}`)

    }catch(error) {
      console.log("error!!! " + error);
      const itemDetail = {};
    }

    try {
      const itemDescription = await axios
      .get(`http://localhost:8080/api/items/${id}`)

    }catch(error) {
      console.log("error!!! " + error);
      const itemDescription = {};
    }

    return axios
      .get(`http://localhost:8080/api/items/${id}`)
      .then((res) => {
        console.log(res);

        const foundItems = res.data.results.slice(0, 4);
        foundItems.map(item => {
          let itemBody =  this.buildItem(item);
          response.items.push(itemBody);
        })
        return response
      })
      .catch((error) => {
        console.log("error!!! " + error);
        return response
      });
    
  }   

}

module.exports = ItemService;