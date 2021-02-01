import { SpeekAction, SpeekPayload } from '@speek/core/entity'
import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class SignalingGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  @SubscribeMessage(SpeekAction.CreateOrJoin)
  create(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: SpeekPayload
  ) {
    const room = this._room(payload)
    if (room.length === 0) {
      socket.join(payload.code)
      socket.emit(SpeekAction.Created)
    } else if (room.length > 0 && room.length < 5) {
      socket.join(payload.code)
      socket.emit(SpeekAction.Joined)
    } else {
      socket.emit(SpeekAction.Full)
    }
  }

  @SubscribeMessage(SpeekAction.Offer)
  restart(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: SpeekPayload
  ) {
    const room = socket.to(payload.code)
    room.broadcast.emit(SpeekAction.Offer, payload)
  }

  private _room({ code }) {
    const adapter = this.server.sockets.adapter
    return adapter.rooms[code] ?? { length: 0 }
  }

  handleDisconnect(socket: Socket) {
    socket.broadcast.emit(SpeekAction.Exited, socket.id)
    socket.leaveAll()
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!'
  }
}
