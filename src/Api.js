import axios from 'axios'

export default {
  getRetailers(value) {
    let result = []
    axios
      .get('https://tomhemps.hkvlaanderen.com/wp-json/wp/v2/retailer', {
        params: {
          id: value,
        },
      })
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
