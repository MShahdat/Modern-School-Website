import apiClient from "../lib/apiClient"


export const getPrincipal = () => {
  return apiClient('/teacher/principal')
}

//& public
export const getTeachers = (params) => {
  return apiClient('/teacher', {
    params
  })
}



export const getSingleTeacher = (id) => {
  return apiClient(`/teacher/${id}`)
}