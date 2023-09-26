import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  // getters and setters
  // get roles
  public getRolesFromStore() {
    return this.role$.asObservable();
  }

  // set roles
  public setRolesInStore(role: string) {
    this.role$.next(role);
  }

  // get full name
  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }

  // set full name
  public setFullNameInStore(fullName: string) {
    this.fullName$.next(fullName);
  }
}
