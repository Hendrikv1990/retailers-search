import axios from 'axios'

export default {
  getRetailers(value) {
    let result = []
    const rs_global = window.rs_global
    axios
      .get(rs_global.url + '/wp-json/wp/v2/retailer?per_page=100', {
        params: {
          id: value,
        },
      }
      )
      .then(response => {
        result.push(...response.data)
      })
      .catch(error => {
        console.log(error)
      })
      .then(() => {
        // always executed
      })
    return result
  },
}
