import { Server as HttpServer } from 'http'
import { Server, Socket } from 'socket.io'
import { setupListeners } from './listeners'
import { IRequestedUser } from '../utils/interfaces'
import { decodeJwtToken } from '../utils/helpers'

let io: Server | null = null

export const initializeSocketIO = (server: HttpServer): Server => {
  if (io) return io

  io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', handleConnection)

  return io
}

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.IO has not been initialised')
  }
  return io
}

export const emitSocketEvent = (rooms: string | string[], event: string, payload: unknown): void => {
  const socketServer = getIO()
  socketServer.in(rooms).emit(event, payload)
}
const handleConnection = async (socket: Socket): Promise<void> => {
  const Socket = socket as Socket;

  try {
    const token = Socket.handshake.auth?.token || Socket.handshake.query?.token;
    const decoded = decodeJwtToken(token as string);
    if (!decoded) {
      Socket.emit('socket-error', 'Invalid token provided.');
      Socket.disconnect();
      return;
    }

    const { sub } = decoded as IRequestedUser;
    Socket.userId = sub;

    console.info('[socket] Connected:', sub);

    Socket.join(sub);
    console.info('[socket] Joined rooms:', sub);

    setupListeners(Socket, io!);

    Socket.on('disconnect', async () => {
      console.info('[socket] Disconnected:', sub);
    });
  } catch (err: any) {
    Socket.emit('socket-error', err?.message ?? 'Unexpected socket error.');
  }
};
