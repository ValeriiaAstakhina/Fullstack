import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const create = createNew => {
    const request = axios.post(baseUrl, createNew)
    return request.then(response => response.data)
  }

const deleteObject = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, createNew) => {
  const request =  axios.put(`${baseUrl}/${id}`, createNew)
  return request.then(response => response.data)
}

export default { getAll, create, deleteObject, update } 
