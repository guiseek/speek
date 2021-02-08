export const environment = {
  production: true,
  signaling: {
    url: 'ws://localhost:3000',
  },
  connection: {
    iceServers: [{ urls: 'stun:stun.stunprotocol.org:3478' }],
  }
}
