import { useQuery } from "@tanstack/react-query"
import { getChairman, getComittee, getSingleCommittee } from "../api"


export const useGetChairman = () => {
  return useQuery({
    queryKey: ["chairman"],
    queryFn: getChairman
  })
}

//& public
export const useGetCommittee = (params) => {
  return useQuery({
    queryKey: ["all-committee", params],
    queryFn: () => getComittee(params)
  })
}



export const useGetSingleCommittee = (id) => {
  return useQuery({
    queryKey: ["committee", id],
    queryFn: () => getSingleCommittee(id)
  })
}


