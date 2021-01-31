import { FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'
import { RemoteTodoStore, Todo } from './store'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'speek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'client'

  peer: RTCPeerConnection

  localStream: MediaStream
  localVideoTrack: MediaStreamTrack
  localAudioTrack: MediaStreamTrack

  @ViewChild('localVideo')
  localVideoRef: ElementRef<HTMLVideoElement>
  localVideo: HTMLVideoElement

  private _call = new BehaviorSubject<boolean>(false)
  call$ = this._call.asObservable()

  todoStore: RemoteTodoStore
  newTodoText = ''

  constructor(todoStore: RemoteTodoStore) {
    this.todoStore = todoStore
  }

  ngOnInit() {
    try {
      this.peer = new RTCPeerConnection()
    } catch (err) {
      this.peer = new RTCPeerConnection()
    }

    this.peer.createOffer().then((o) => this.peer.setLocalDescription(o))
  }

  ngAfterViewInit(): void {
    this.localVideo = this.localVideoRef.nativeElement
    // this.play()
  }

  play() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        this.localStream = stream
        this.localVideo.muted = true
        this.localVideo.srcObject = stream
        this.localAudioTrack = stream.getAudioTracks().shift()
        this.localVideoTrack = stream.getVideoTracks().shift()
        this._call.next(true)
      })
  }

  stopEditing(todo: Todo, editedTitle: string) {
    todo.title = editedTitle
    todo.editing = false
  }

  cancelEditingTodo(todo: Todo) {
    todo.editing = false
  }

  updateEditingTodo(todo: Todo, editedTitle: string) {
    editedTitle = editedTitle.trim()
    todo.editing = false

    if (editedTitle.length === 0) {
      return this.todoStore.remove(todo)
    }

    todo.title = editedTitle
  }

  editTodo(todo: Todo) {
    todo.editing = true
  }

  removeCompleted() {
    this.todoStore.removeCompleted()
  }

  toggleCompletion(todo: Todo) {
    this.todoStore.toggleCompletion(todo)
  }

  remove(todo: Todo) {
    this.todoStore.remove(todo)
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      this.todoStore.add(this.newTodoText)
      this.newTodoText = ''
    }
  }
}
