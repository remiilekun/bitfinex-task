import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Socket from "@/services/socket";
import { updateOrderbookItem } from "@/store/actions/orderbook";
import CONFIG from "@/utils/config";

export const useOrderbookSocket = () => {
  const dispatch = useDispatch();
  const precision = useSelector((state) => state.orderbook.precision);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new Socket(CONFIG.SOCKET_URL);

    const handleSocketMessage = (data) => {
      if (
        Array.isArray(data) &&
        Array.isArray(data[1]) &&
        data[1].length === 3
      ) {
        const payload = data[1];
        const [key] = payload;
        dispatch(updateOrderbookItem(key, payload));
      }
    };

    const handleSocketOpen = () => {
      setIsConnected(true);
      socket.send({
        channel: "book",
        event: "subscribe",
        freq: "F1",
        prec: `P${precision}`,
        symbol: "tBTCUSD",
      });
    };

    const handleSocketClose = () => {
      setIsConnected(false);
      socket.send({
        event: "unsubscribe",
        channel: "book",
        freq: "F1",
        prec: `P${precision}`,
        symbol: "tBTCUSD",
      });
    };

    const handleSocketError = (error) => {
      console.error("Socket error:", error);
    };

    const handleSocketMessageEvent = (data) => {
      handleSocketMessage(data);
    };

    socket.on("open", handleSocketOpen);
    socket.on("close", handleSocketClose);
    socket.on("error", handleSocketError);
    socket.on("message", handleSocketMessageEvent);

    return () => {
      socket.close();
    };
  }, [dispatch, precision]);

  return isConnected;
};

export default useOrderbookSocket;
