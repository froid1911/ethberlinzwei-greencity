import { Injectable } from "@angular/core";
import Box from "3box";
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: "root"
})
export class BoxService {
  private box;
  private space;
  private channel;

  constructor() {}

  login() {
    return window["ethereum"]
      .enable()
      .then(accounts => {
        return Box.openBox(accounts[0], window["ethereum"]);
      })
      .then(box => {
        this.box = box;
        return box.openSpace("greenberlin");
      })
      .then(async space => {
        this.space = space;
        this.channel = await this.space.joinThread(
          "0x3840Da83b4EC0CFEcE8acBcf86CA5196B086e605"
        );
        return this.box;
      });
  }

  isLoggedIn() {
    if (isNullOrUndefined(this.box)) {
      return false;
    }

    return true;
  }

  copyDataFromThreadToStorage(thread) {}

  pushData(data) {
    console.log(this.channel, data);
    this.channel.post(data);
  }

  getData(index) {}
}
