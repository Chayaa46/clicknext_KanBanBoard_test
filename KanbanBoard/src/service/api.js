import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/'

export const apiService = {
  async getData() {
    const response = await axios.get(`${API_URL}/api/data`)
    return response.data
  },

  async createData(data) {
    const response = await axios.post(`${API_URL}/api/create`, data)
    return response.data
  }
}