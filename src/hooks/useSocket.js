import { useEffect, useState } from "react";
import Socket from "@/services/socket";

const socket = new Socket();

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  //   useEffect(() => {
  //     if (isConnected) {
  //       socket.send({
  //         event: "subscribe",
  //         channel: "book",
  //         symbol: "tBTCUSD",
  //       });
  //     }

  //     return () => {
  //       socket.send({
  //         event: "unsubscribe",
  //         channel: "book",
  //         symbol: "tBTCUSD",
  //       });
  //     };
  //   }, [isConnected]);

  socket.onOpen(() => {
    setIsConnected(true);
  });

  socket.onClose(() => {
    setIsConnected(false);
  });

  socket.onMessage(({ data }) => {
    console.log("Socket message", data);
  });
};

export default useSocket;
