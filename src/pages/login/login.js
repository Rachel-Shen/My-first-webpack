

import axios from'@/api/index.js'

(function () {

  getDate();

  async function getDate() {
    let a = await axios.getRequest('/web/article/getNotic.do');
    console.log(a)
  }

})();





