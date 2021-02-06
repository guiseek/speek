import { Subject, Subscription } from "rxjs";

export interface Emitter<T> extends Subject<T> {
  new (isAsync?: boolean): Emitter<T>
  emit(value?: T): void
  subscribe(generatorOrNext?: any, error?: any, complete?: any): Subscription
}
