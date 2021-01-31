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
    @ConnectedSocket() contact: Socket,
    @MessageBody() payload: SpeekPayload
  ) {
    const room = this._room(payload)
    if (room.length === 0) {
      contact.join(payload.code)
      contact.emit(SpeekAction.Created)
    } else if (room.length > 0 && room.length < 5) {
      contact.join(payload.code)
      contact.emit(SpeekAction.Joined)
    } else {
      contact.emit(SpeekAction.Full)
    }
  }

  @SubscribeMessage(SpeekAction.Offer)
  restart(
    @ConnectedSocket() contact: Socket,
    @MessageBody() payload: SpeekPayload
  ) {
    const room = contact.to(payload.code)
    room.broadcast.emit(SpeekAction.Offer, payload)
  }

  private _room({ code }) {
    const adapter = this.server.sockets.adapter
    return adapter.rooms[code] ?? { length: 0 }
  }

  handleDisconnect(contact: Socket) {
    contact.broadcast.emit(SpeekAction.Exited, contact.id)
    contact.leaveAll()
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!'
  }
}
