import axios from "axios";

const axioss = axios.create({
  baseURL: "https://65285dac931d71583df23375.mockapi.io/",
  timeout: 10000,

})

export default axioss;