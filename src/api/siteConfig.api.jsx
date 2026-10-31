import apiClient from "../lib/apiClient"



export const getSiteConfig = () => {
  return apiClient("/")
}