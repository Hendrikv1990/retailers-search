import axios from 'axios'

export default {
  async getRetailers(value) {
    let result = []
    const rs_global = window.rs_global
    await axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        console.log(response.data)
        result.push(...response.data)
      }
      )
      .catch((error) => {
        console.log(error)
      })

    return result
  },
}
