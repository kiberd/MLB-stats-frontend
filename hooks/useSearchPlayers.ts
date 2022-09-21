import { useQuery } from "react-query";
import { getPlayersInfo } from "../apis/api";
import { SearchPlayersParams } from "params";


export default function useSearchPlayers(params: SearchPlayersParams | null) {

  return useQuery<any[]>(
    ["getAddressByQuery", params?.name],
    () => getPlayersInfo(params),
    {
      enabled: !!params,
      suspense: false,
    }
  );
}
