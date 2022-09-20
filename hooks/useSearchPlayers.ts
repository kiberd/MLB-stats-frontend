import { useQuery } from "react-query";
import { getPlayersInfo } from "../apis/api";


export default function useSearchPlayers(name: string) {
  
  return useQuery<any[]>(["getAddressByQuery", name], () => getPlayersInfo(name), {
      enabled: !!name,
      suspense: false,
  })
  
}
