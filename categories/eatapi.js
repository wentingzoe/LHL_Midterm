'use strict';

const yelp = require('yelp-fusion');
const client = yelp.client('process.env.YELP_API');


const checkFood = function (taskTitle) {
  taskTitle = taskTitle.toLowerCase().trim();

  return new Promise ((resolve,reject) => {

    client.search({
      term: taskTitle,
      location: 'san francisco, ca',
    }).then(response => {
      for (const restaurant of response.jsonBody.businesses){
        const restoName = restaurant.name.toLowerCase();
        if(restoName === taskTitle) {
          console.log(`Restaurant found: ${restaurant.name}`);
          return resolve(true);
        }
      }
      console.log(`No exact match found for: ${taskTitle}`)
      return resolve (false);
    }).catch(e => {
      console.log(`No restaurant found by the name: ${taskTitle}`);
      return resolve(false);
    });
  })
}
module.exports = {checkFood};
