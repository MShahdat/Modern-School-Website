import apiClient from "../lib/apiClient"


export const getChairman = () => {
  return apiClient('/committee/chairman')
}

//& public
export const getComittee = (params) => {
  return apiClient('/committee', {
    params
  })
}



export const getSingleCommittee = (id) => {
  return apiClient(`/committee/${id}`)
}