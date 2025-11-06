import { Server, Socket } from 'socket.io'
import { HttpError } from '../utils/HttpError';
import { CHAT_ERROR, CHAT_SOCKET_EMITTERS as EMIT, CHAT_SOCKET_LISTENERS as ON } from '../constants';

const assert = (condition: any, sock: Socket, err: CHAT_ERROR) => {
  if (!condition) {
    sock.emit(EMIT.ERROR, err);
    throw new HttpError(err, 400);
  }
};

const buildRoomId = (chatId: string) => chatId.toString();

type Listener<T = any> = (payload: T) => Promise<void>;

const wrap = (fn: Listener): Listener => async (payload) => {
  try {
    await fn(payload);
  } catch (err) {
    console.error("[socket] chat error:", err);
  }
};


export const setupListeners = (_socket: Socket, _io: Server): void => {
  // Example listener setup

  // _socket.on(ON.SEND_MESSAGE, wrap(async (payload) => {
  // console.log('Received message:', payload);
  // Handle sending message logic here
  // }));
}
