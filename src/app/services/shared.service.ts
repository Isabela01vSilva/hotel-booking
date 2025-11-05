// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private initializedSource = new BehaviorSubject<boolean>(false);
  initialized$ = this.initializedSource.asObservable() as Observable<boolean>;

  setInitialized(value: boolean) {
    this.initializedSource.next(value);
  }
}
