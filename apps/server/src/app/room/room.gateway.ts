import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { UseGuards } from '@nestjs/common'
import { SpeekPayload, SpeekAction } from '@speek/core/entity'
// import { MeetGuard } from './meet.guard'

@WebSocketGateway()
export class RoomGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  // @UseGuards(MeetGuard)
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

  // @UseGuards(MeetGuard)
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
  message(
    @ConnectedSocket() contact: Socket,
    @MessageBody() payload: SpeekPayload
  ) {
    contact.emit('message', payload)
    contact.broadcast.emit('message', payload)
  }
}

// import { Server, Socket } from 'socket.io'
// import {
//   ConnectedSocket,
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets'
// import { SpeekPayload } from '@speek/core/entity'

// @WebSocketGateway()
// export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server

//   @SubscribeMessage('message')
//   handleMessage(
//     @ConnectedSocket() socket: Socket,
//     @MessageBody() payload: SpeekPayload
//   ): string {
//     return 'Hello world!'
//   }

//   handleConnection(
//     @ConnectedSocket() socket: Socket,
//     @MessageBody() payload: SpeekPayload
//   ) {
//     // this.server.sockets.emit('user-joined', socket.id, this.server.clients())
//   }

//   handleDisconnect(@ConnectedSocket() socket: Socket) {
//     // this.server.sockets.emit('user-left', socket.id)
//   }
// }
