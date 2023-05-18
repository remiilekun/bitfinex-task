class Socket {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.eventListeners = {
      open: [],
      message: [],
      close: [],
      error: [],
    };

    this.socket.addEventListener("open", this.handleOpen.bind(this));
    this.socket.addEventListener("message", this.handleMessage.bind(this));
    this.socket.addEventListener("close", this.handleClose.bind(this));
    this.socket.addEventListener("error", this.handleError.bind(this));
  }

  handleOpen(event) {
    this.eventListeners.open.forEach((callback) => callback(event));
  }

  handleMessage(event) {
    const data = JSON.parse(event.data);
    this.eventListeners.message.forEach((callback) => callback(data));
  }

  handleClose(event) {
    this.eventListeners.close.forEach((callback) => callback(event));
  }

  handleError(event) {
    this.eventListeners.error.forEach((callback) => callback(event));
  }

  on(event, callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function.");
    }

    if (!this.eventListeners[event]) {
      throw new Error(`Unsupported event: ${event}`);
    }

    this.eventListeners[event].push(callback);
  }

  off(event, callback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(
        (cb) => cb !== callback
      );
    }
  }

  send(data) {
    this.socket.send(JSON.stringify(data));
  }

  close() {
    this.socket.close();
  }
}

export default Socket;
