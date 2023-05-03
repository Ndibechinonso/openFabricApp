export interface Product {
    _id: string;
    name: string;
    description: {value: string}[];
    price: number;
    img_link: string;
    weight: number;
    vendor: string;
    // specification: string[],
  }

  // export const products = [
  //   {
  //     id: 1,
  //     name: 'Phone XL',
  //     price: 799,
  //     description: ['A large phone with one of the best screens'],
  //     weight: 10,
  //     vendor: "Samsung",
  //     // specification: ["Welcome to the shop", "100% new products", "Dress slim and sexy", "Fashionable and sexy comfort", "Please note the size when purchasing"],
  //     img_link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHITvFO2ukPgpPsNc63b9E7CzK2PDP2BiXeQ&usqp=CAU"
  //   },
  //   {
  //     id: 2,
  //     name: 'Phone Mini',
  //     price: 699,
  //     description: ['A great phone with one of the best cameras'],
  //     weight: 10,
  //     vendor: "Samsung",
  //     // specification: ["Welcome to the shop", "100% new products", "Dress slim and sexy", "Fashionable and sexy comfort", "Please note the size when purchasing"],
  //     img_link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6yqAlfUEX87Myz169ufO9lmmz87sDZwryA&usqp=CAU"
  //   },
  //   {
  //     id: 3,
  //     name: 'Phone Standard',
  //     price: 299,
  //     description: ['A great phone with one of the best cameras'],
  //     weight: 10,
  //     vendor: "Samsung",
  //     // specification: ["Welcome to the shop", "100% new products", "Dress slim and sexy", "Fashionable and sexy comfort", "Please note the size when purchasing"],
  //     img_link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3On97zjMJ_19HaxmPVgNE_7KxcWarBlr51Q&usqp=CAU"
  //   }
  // ];
