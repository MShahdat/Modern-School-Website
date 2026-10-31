import { ofetch } from 'ofetch'


const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
  onResponseError({ response }) {
    const errorData = response._data;

    if (errorData?.message) {
      throw new Error(errorData.message)
    }
  }
})

export default apiClient