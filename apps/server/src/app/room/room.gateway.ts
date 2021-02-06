import { Server, Socket } from 'socket.io'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { SpeekPayload } from '@speek/core/entity'

@WebSocketGateway()
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: SpeekPayload
  ): string {
    return 'Hello world!'
  }
  handleConnection(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: SpeekPayload
  ) {
    console.log(this.server.clients())

    this.server.sockets.emit('user-joined', socket.id, this.server.clients())
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.server.sockets.emit('user-left', socket.id)
  }
}
