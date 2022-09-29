import axios from "axios"

const AXIOS=axios.create({
    baseURL:"http://localhost:8800"
})
export default AXIOS