export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
} as const

export type Role = typeof ROLES[keyof typeof ROLES]

export enum STATUS_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500
}
export enum CHAT_SOCKET_LISTENERS {
  SEND_MESSAGE = 'send-message',
  CREATE_CHAT = 'create-chat',
  JOIN_CHAT = 'join-chat',
  NEW_MESSAGE = 'new-message',
  PARTICIPANT_ADDED = 'participant-added',
  MESSAGE_DELIVERED = 'message-delivered',
  MESSAGE_READ = 'message-read',
  TYPING = 'typing',
  GET_CHATS = 'get-chats',
  READ_MESSAGES = 'read-messages',
}
export enum CHAT_SOCKET_EMITTERS {
  CHAT_CREATED = 'chat-created',
  CHAT_JOINED = 'chat-joined',
  NEW_CHAT = 'new-chat',
  ERROR = 'socket-error',
  CHAT_EXISTS = 'chat-exists',
  NEW_MESSAGE = 'new-message',
  JOIN_CHAT_ROOM = 'join-chat-room',
  CHAT_LIST_UPDATED = 'chat-list-updated',
  MESSAGES_READ = 'messages-read',
}
export enum CHAT_ERROR {
  NEED_RECEIVER_ID = "Receiver ID is required",
  NEED_PARTICIPANTS = "Participants array is required",
  NEED_CHAT_ID = "Chat ID not provided",
  CHAT_NOT_FOUND = "Chat not found",
  NOT_PARTICIPANT = "You are not a participant in this chat",
  USER_NOT_FOUND = "User to add not found",
  CHAT_BLOCKED = "Chat is blocked",
  CANNOT_ADD_SELF = "You cannot add yourself to the chat",
}
