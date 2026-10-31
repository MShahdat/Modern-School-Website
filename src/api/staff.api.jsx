import apiClient from "../lib/apiClient"


//& public
export const getStaffs = (params) => {
  return apiClient('/staff', {
    params
  })
}



export const getSingleStaff = (id) => {
  return apiClient(`/staff/${id}`)
}