import { useQuery } from "react-query";
import { getPlayersBattingInfo } from "../apis/api";

export default function useSearchPlayerBatting(playerid: string | null) {
  return useQuery<any[]>(
    ["getPlayerBatting", playerid],
    () => getPlayersBattingInfo(playerid),
    {
      enabled: !!playerid,
      suspense: false,
    }
  );
}
