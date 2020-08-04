import axios from 'axios'

export default {
  async getRetailers(value) {
    let result = []
    const rs_global = window.rs_global
    await axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        result.push(...response.data)
      }
      )
      .catch((error) => {
        console.log(error)
      })
      .then(() => {
        // always executed
      })
    return result
  },
}
