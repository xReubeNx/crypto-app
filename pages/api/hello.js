import axios from "axios";

export function getCoins() {
  return axios
    .get("https://api.coingecko.com/api/v3/coins/list")
    .then((res) => res)
    .catch((err) => {
      return { data: "Error", details: err };
    });
}
