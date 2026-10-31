import { useQuery } from "@tanstack/react-query"
import { getPrincipal, getSingleTeacher, getTeachers } from "../api"


export const useGetPrincipal = () => {
  return useQuery({
    queryKey: ["principal"],
    queryFn: getPrincipal
  })
}

//& public
export const useGetTeachers = (params) => {
  return useQuery({
    queryKey: ["teachers", params],
    queryFn: () => getTeachers(params)
  })
}



export const useGetSingleTeacher = (id) => {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: () => getSingleTeacher(id)
  })
}


