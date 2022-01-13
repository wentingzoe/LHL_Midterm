const axios = require('axios');
const key = process.env.AMZ_API;

const checkProduct = function (taskTitle) {
  taskTitle = taskTitle.toLowerCase().trim();

  const params = {
    api_key: key,
    type: taskTitle,
    amazon_domain: "amazon.com",
    asin: "B073JYC4XM",
    output: "json",
    device: "desktop"
  }

  return new Promise ((resolve,reject) => {
    axios.get('https://api.rainforestapi.com/request', { params })
      .then(response => {
let products = response.data.product.keywords_list;
for (const product of products ){
  let keywords = product.toLowerCase();
  console.log(JSON.stringify(response.data, 0, 2));
if(keywords === taskTitle){
  console.log(`Product found: ${keywords}`);
  return resolve(true);
} else {
  console.log(`No exact match found for:${taskTitle}`);
  return resolve(false);
}
}

      }).catch(error => {
        // catch and print the error
        console.log(`Product cannot found: ${taskTitle}`);
        return resolve(false);
      })

  })
  // make the http GET request to Rainforest API


}

module.exports = {checkProduct};
