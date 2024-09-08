import axios from "axios";
import { SearchPlayersParams } from "params";

export const getPlayersInfo = async (params: SearchPlayersParams | null) => {
  const { data } = await axios.post<any>(
    process.env.NEXT_PUBLIC_ENDPOINT + `/search`,
    {
      name_input: params?.name,
      result_size: params?.resultSize,
      starting_index: params?.startingIndex,
    }
  );

  return data;
};

export const getPlayersBattingInfo = async (playerid: string | null) => {
  const { data } = await axios.get<any>(
    process.env.NEXT_PUBLIC_ENDPOINT + `/batting/` + playerid
  );

  return data;
};
