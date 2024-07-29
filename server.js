import { createServer } from 'http';
import next from 'next';
import { Server as SocketIOServer } from 'socket.io';
// import { getEveryTable } from './actions/fetchData/dataRequests';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new SocketIOServer(httpServer);

  io.on('connection', async (socket) => {
    console.log('Socket connected:', socket.id);

    // try {
    //   const tables = await getEveryTable();
    //   socket.emit('tables', tables);
    // } catch (error) {
    //   console.error('Error emitting tables:', error);
    // }

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
