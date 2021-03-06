import 'jest-preset-angular'


const EventSourceInstance = {
  addEventListener: jest.fn(),
};
const EventSource = jest.fn(() => EventSourceInstance);

(window as any).EventSource = EventSource


Object.defineProperty(window, 'RTCPeerConnection', () => ({
  writable: true,
  value: () => class {
    constructor(private config: RTCConfiguration) {}
    canTrickleIceCandidates = true
    connectionState = jest.fn()
    currentLocalDescription = new RTCSessionDescription()
    currentRemoteDescription = new RTCSessionDescription()
    iceConnectionState: ''
    iceGatheringState: null
    idpErrorInfo: 'string'
    idpLoginUrl: 'string'
    localDescription = new RTCSessionDescription()
    onconnectionstatechange = jest.fn()
    ondatachannel = jest.fn()
    onicecandidate = jest.fn()
    oniceconnectionstatechange = jest.fn()
    onicegatheringstatechange = jest.fn()
    onnegotiationneeded = jest.fn()
    onsignalingstatechange = jest.fn()
    onstatsended = jest.fn()
    ontrack = jest.fn()
    peerIdentity = jest.fn().mockResolvedValue('')
    pendingLocalDescription = new RTCSessionDescription()
    pendingRemoteDescription = new RTCSessionDescription()
    remoteDescription = RTCSessionDescription
    sctp = null
    signalingState = 'connecting'
    addIceCandidate = jest.fn()
    addTrack = jest.fn()
    addTransceiver = jest.fn()
    close = jest.fn()
    createAnswer = jest.fn()
    createDataChannel = jest.fn()
    createOffer = jest.fn()
    getConfiguration = jest.fn()
    getIdentityAssertion = jest.fn()
    getReceivers = jest.fn()
    getSenders = jest.fn()
    getStats = jest.fn()
    getTransceivers = jest.fn()
    removeTrack = jest.fn()
    setConfiguration = jest.fn()
    setIdentityProvider = jest.fn()
    setLocalDescription = jest.fn()
    setRemoteDescription = jest.fn()
    addEventListener = jest.fn()
    removeEventListener = jest.fn()
    dispatchEvent = jest.fn()
  },
}))

Object.defineProperty(window, 'MediaStreamTrack', () => ({
  writable: true,
  value: {
    enabled: true,
    id: 'string',
    isolated: false,
    kind: 'kind',
    label: 'label',
    muted: false,
    onended: (ev: Event) => ev,
    onisolationchange: (ev: Event) => ev,
    onmute: (ev: Event) => ev,
    onunmute: (ev: Event) => ev,
    readyState: {},
    applyConstraints: jest.fn(),
    clone: jest.fn(),
    getCapabilities: jest.fn(),
    getConstraints: jest.fn(),
    getSettings: jest.fn(),
    stop: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  },
}))

export function utilTesting(): string {
  return 'util-testing'
}
