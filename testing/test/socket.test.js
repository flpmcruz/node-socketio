const { Server } = require("socket.io");
const http = require("http");
const Client = require("socket.io-client");

describe("Testing socket.io volatiles", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = http.createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });

      clientSocket.on("connect", done);
    });
  });

  test("Testing event", (done) => {
    clientSocket.on("greeting", (greet) => {
      expect(greet).toBe("Hello");
      done();
    });

    serverSocket.emit("greeting", "Hello");
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });
});
