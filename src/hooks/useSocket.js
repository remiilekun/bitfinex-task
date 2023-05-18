import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Socket from "@/services/socket";
import { updateOrderbookItem } from "@/store/actions/orderbook";
import CONFIG from "@/utils/config";

export const useSocket = () => {
  const dispatch = useDispatch();
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
        event: "subscribe",
        channel: "book",
        symbol: "tBTCUSD",
        freq: "F1",
      });
    };

    const handleSocketClose = () => {
      setIsConnected(false);
      socket.send({
        event: "unsubscribe",
        channel: "book",
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
  }, [dispatch]);

  return isConnected;
};

export default useSocket;
