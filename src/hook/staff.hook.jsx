import { useQuery } from "@tanstack/react-query"
import { getSingleStaff, getStaffs } from "../api"


//& public
export const useGetStaffs = (params) => {
  return useQuery({
    queryKey: ["staffs", params],
    queryFn: () => getStaffs(params)
  })
}



export const useGetSingleStaff = (id) => {
  return useQuery({
    queryKey: ["staff", id],
    queryFn: () => getSingleStaff(id)
  })
}


