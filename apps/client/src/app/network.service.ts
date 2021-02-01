import { SpeedResponse } from '@speek/core/entity'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable()
export class NetworkService {
  private _error = new Subject()
  error$ = this._error.asObservable()

  private _connection = new Subject<boolean>()
  connection$ = this._connection.asObservable()

  private _upload = new Subject()
  upload$ = this._upload.asObservable()

  private _download = new Subject()
  download$ = this._download.asObservable()

  constructor(readonly http: HttpClient) {
    this._connection.next(window.navigator.onLine)
    window.addEventListener('online', () => this._connection.next(true))
    window.addEventListener('offline', () => this._connection.next(false))
  }

  loadUp(bytes = 500000) {
    this.http.get<SpeedResponse>(`/api/network/upload/${bytes}`).subscribe(
      (response) => this._upload.next(response),
      ({ message }) => this._error.next(message)
    )
  }

  loadDown(bytes = 500000) {
    this.http.get<SpeedResponse>(`/api/network/download/${bytes}`).subscribe(
      (response) => this._download.next(response),
      ({ message }) => this._error.next(message)
    )
  }
}
