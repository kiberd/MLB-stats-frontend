import axios from "axios";

type CreatePlayersInfo = {
  name_input: string;
  result_size: number;
  starting_index: number;
};

console.log(process.env.NEXT_PUBLIC_ENDPOINT);

export const getPlayersInfo = async (name: string) => {
  const { data } = await axios.post<CreatePlayersInfo>(
    process.env.NEXT_PUBLIC_ENDPOINT + `/search`,
    {
      name_input: name,
      result_size: 20,
      starting_index: 0,
    }
  );

  console.log(data);

  return 1;
};
