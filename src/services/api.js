import axios from "axios";
import AppConfig from "@/utils/config";

export const client = axios.create({
  baseURL: AppConfig.API_URL,
  headers: { "Content-Type": "application/json" },
});

export const api = {
  getOrderBook: (
    { len, pair, precision } = { len: "25", pair: "tBTCUSD", precision: "P0" }
  ) =>
    client
      .get(`/book/${pair}/${precision}`, { params: { len } })
      .then(({ data }) => data),
};
