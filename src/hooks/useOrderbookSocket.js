import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import Socket from "@/services/socket";
import { updateOrderbookItem } from "@/store/actions/orderbook";
import CONFIG from "@/utils/config";

export const useOrderbookSocket = () => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const [isNetworkAvailable, setIsNetworkAvailable] = useState(true);
  const [isSocketEnabled, setIsSocketEnabled] = useState(true);
  const precision = useSelector((state) => state.orderbook.precision);

  const handleSocketMessage = (data) => {
    if (Array.isArray(data) && Array.isArray(data[1]) && data[1].length === 3) {
      const payload = data[1];
      const [key] = payload;
      dispatch(updateOrderbookItem(key, payload));
    }
  };

  const handleSocketOpen = () => {
    socketRef.current.send({
      channel: "book",
      event: "subscribe",
      freq: "F1",
      prec: `P${precision}`,
      symbol: "tBTCUSD",
    });
  };

  const handleSocketClose = () => {
    console.log("Socket closed");
  };

  const handleSocketError = (error) => {
    console.error("Socket error:", error);
  };

  const handleSocketMessageEvent = (data) => {
    handleSocketMessage(data);
  };

  const connectSocket = () => {
    socketRef.current = new Socket(CONFIG.SOCKET_URL);
    socketRef.current.on("open", handleSocketOpen);
    socketRef.current.on("close", handleSocketClose);
    socketRef.current.on("error", handleSocketError);
    socketRef.current.on("message", handleSocketMessageEvent);
  };

  useEffect(() => {
    const unsubscribeNetworkListener = NetInfo.addEventListener((state) => {
      setIsNetworkAvailable(state.isConnected);
    });

    if (
      isNetworkAvailable &&
      isSocketEnabled &&
      !socketRef.current?.isConnected()
    ) {
      connectSocket();
    } else if (
      (!isNetworkAvailable || !isSocketEnabled) &&
      socketRef.current?.isConnected()
    ) {
      socketRef.current.close();
    }

    return () => {
      socketRef.current.close();
      unsubscribeNetworkListener();
    };
  }, [dispatch, precision, isNetworkAvailable, isSocketEnabled]);

  const toggleSocket = () => {
    setIsSocketEnabled((prevEnabled) => !prevEnabled);
  };

  return { toggleSocket, isEnabled: isSocketEnabled };
};

export default useOrderbookSocket;
