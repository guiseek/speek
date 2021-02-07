import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, Subject, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'
import { SpeedResponse } from '@speek/core/entity'
import { Injectable } from '@angular/core'

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
  private _upLoader = new BehaviorSubject<boolean>(true)
  upLoader$ = this._upLoader.asObservable()

  private _download = new BehaviorSubject<SpeedResponse>(initialState)
  download$ = this._download.asObservable()
  private _downLoader = new BehaviorSubject<boolean>(true)
  downLoader$ = this._downLoader.asObservable()

  constructor(readonly http: HttpClient) {}

  loadConnection() {
    this._connection.next(true)
    ononline = () => this._connection.next(true)
    onoffline = () => this._connection.next(false)
  }

  loadUp(bytes = 500000) {
    this._upload.next(initialState)
    this.http
      .get<SpeedResponse>(`${this._api}/upload/${bytes}`)
      .pipe(retry(3), catchError(this._handleError))
      .subscribe(
        (response) => this._setUp(response),
        (message) => this._error.next(message)
      )
  }

  loadDown(bytes = 500000) {
    this._downLoader.next(true)
    this.http
      .get<SpeedResponse>(`${this._api}/download/${bytes}`)
      .pipe(retry(3), catchError(this._handleError))
      .subscribe(
        (response) => this._setDown(response),
        (message) => this._error.next(message)
      )
  }

  private _setUp(response: SpeedResponse) {
    this._upload.next(response)
    this._upLoader.next(false)
  }

  private _setDown(response: SpeedResponse) {
    this._download.next(response)
    this._downLoader.next(false)
  }

  private _handleError(error: HttpErrorResponse) {
    let errorMessage: string
    if (typeof error === 'string') {
      errorMessage = error
    } else {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${error.error.message}`
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${error.status}, with body ${error.message}`
      }
    }
    // return an ErrorObservable with a user-facing error message
    return throwError(errorMessage)
  }
}
