import { io } from "socket.io-client";
import { SOCKET_URL } from "../VARS";

export const socket = io(SOCKET_URL);
