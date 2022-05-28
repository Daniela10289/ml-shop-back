
class ItemService {

    async find() {
        const rta = [
            {
              "author": 
                { "name": "Daniela",
                  "lastname": "Palacio"
                },
              categories: ["Niños", "Jovenes", "Adultos"],
              items: [
                {
                "id": '1',
                "title": "Primer Item",
                "price": 
                  { "currency": "200", 
                    "amount": 200,
                    "decimals": 2
                  },
                "picture": String,
                "condition": String,
                "free_shipping": Boolean
                }
              ]
            }
          ];
        console.log(rta);
        return rta;
      }
      
  async findOne(id) {
    const rta = [
      {
        "author": 
        { 
          "name":String,
          "lastname":String
        },
        "item": {
        "id": 1,
        "title": "articulo primero",
        "price": {
        "currency": String,
        "amount": Number,
        "decimals": Number,
        },
        "picture": String,
        "condition": String,
        "free_shipping": Boolean,
        "sold_quantity": Number,
        "description": String
        },
        "item": {
          "id": 2,
          "title": "articulo segundo",
          "price": {
          "currency": String,
          "amount": Number,
          "decimals": Number,
          },
          "picture": String,
          "condition": String,
          "free_shipping": Boolean,
          "sold_quantity": Number,
          "description": String
          }
      }
    ];

    return rta;
  }   

}

module.exports = ItemService;