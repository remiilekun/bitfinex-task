import CONFIG from "@/utils/config";

class Socket {
  constructor() {
    this.socket = new WebSocket(CONFIG.SOCKET_URL);
  }

  onOpen(callback) {
    this.socket.addEventListener("open", callback);
  }

  onMessage(callback) {
    this.socket.addEventListener("message", callback);
  }

  onClose(callback) {
    this.socket.addEventListener("close", callback);
  }

  onError(callback) {
    this.socket.addEventListener("error", callback);
  }

  send(data) {
    this.socket.send(JSON.stringify(data));
  }

  close() {
    this.socket.close();
  }
}

export default Socket;
