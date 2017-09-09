import { Observable } from 'rxjs';

declare type Resolution = {
  width: number, height: number
}

const observable: Observable<Resolution> = Observable.create((observer) => {
  window.onresize = () => {
    observer.next({ width: window.innerWidth, height: window.innerHeight });
  }
}).share();

export function OnScreenResize(): Observable<Resolution> {
  return observable;
}
