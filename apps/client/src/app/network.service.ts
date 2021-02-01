import { SpeedResponse } from '@speek/core/entity'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

const initialState: SpeedResponse = { bps: 0, kbps: 0, mbps: 0 }

@Injectable()
export class NetworkService {
  private _api = '/api/network'

  private _error = new Subject()
  error$ = this._error.asObservable()

  private _connection = new BehaviorSubject<boolean>(true)
  connection$ = this._connection.asObservable()

  private _upload = new BehaviorSubject<SpeedResponse>(initialState)
  upload$ = this._upload.asObservable()

  private _download = new BehaviorSubject<SpeedResponse>(initialState)
  download$ = this._download.asObservable()

  constructor(readonly http: HttpClient) {}

  loadConnection() {
    this._connection.next(true)
    ononline = () => this._connection.next(true)
    onoffline = () => this._connection.next(false)
  }

  loadUp(bytes = 500000) {
    this.http.get<SpeedResponse>(`${this._api}/upload/${bytes}`).subscribe(
      (response) => this._upload.next(response),
      ({ message }) => this._error.next(message)
    )
  }

  loadDown(bytes = 500000) {
    this.http.get<SpeedResponse>(`${this._api}/download/${bytes}`).subscribe(
      (response) => this._download.next(response),
      ({ message }) => this._error.next(message)
    )
  }
}
