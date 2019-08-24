import { Injectable } from "@angular/core";
import Box from "3box";
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: "root"
})
export class BoxService {
  private box;

  constructor() {}

  login() {
    return window["ethereum"]
      .enable()
      .then(accounts => {
        return Box.openBox(accounts, window["ethereum"]);
      })
      .then(box => {
        this.box = box;
        return this.box;
      });
  }

  isLoggedIn() {
    if (isNullOrUndefined(this.box)) {
      return false;
    }

    return true;
  }
}
