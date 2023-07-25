import axios from "axios";

export interface IApiResponse {
  result: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  rates: {};
};

const getRates = async (): Promise<IApiResponse | null> => {
  
  const response = await axios.get(
    "https://open.er-api.com/v6/latest/USD"
  );

    return response.data;
};

export default getRates;