
import { useQuery } from '@tanstack/react-query'
import { getSiteConfig } from '../api'


export const useGetSiteConfig = () => {
  return useQuery({
    queryKey: ["site-config"],
    queryFn: getSiteConfig,
  })
}