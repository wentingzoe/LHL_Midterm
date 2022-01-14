const { fetchData } = require('../categories/wolfapi');

const addCategory = (taskTitle,taskDes,callback) => {
  taskTitle = taskTitle.toLowerCase().trim();
  taskDes = taskDes.toLowerCase().trim();
   fetchData(taskTitle, (err, data) => {
    if (err) {
      console.log(err)
    }
    else {
      let auto_category = 4;
      if (taskTitle.includes('watch') || taskDes.includes('watch') ){
        auto_category = 1;
      } else if (taskTitle.includes('eat') || taskDes.includes('eat')){
        auto_category = 2;
      } else if (taskTitle.includes('read') || taskDes.includes('read')){
        auto_category = 3;
      } else if (taskTitle.includes('buy') || taskDes.includes('buy')){
        auto_category = 4;
      } else if (data === 'watch') {
        auto_category = 1;
      } else if (data === 'eat') {
        auto_category = 2;
      } else if (data === 'read') {
        auto_category = 3;
      } else if (data === 'buy') {
        auto_category = 4;
      }
      callback(null, auto_category);
    }
  });

}
module.exports = {addCategory};
