import { Injectable } from "@angular/core";
import Box from "3box";
import { isNullOrUndefined } from "util";
import { ThrowStmt } from "@angular/compiler";

@Injectable({
  providedIn: "root"
})
export class BoxService {
  private box;
  private space;
  private channel;
  private profile;

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
        this.profile = await Box.getProfile(
          "0x3840Da83b4EC0CFEcE8acBcf86CA5196B086e605"
        );
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

  copyDataFromThreadToStorage(thread) {
    this.channel.getPosts();
  }

  pushData(data) {
    this.space.public.set("pending", data);
  }

  async getData(address) {
    const data = await Box.getSpace(address, "greenberlin");
    // const data = await this.channel.getPosts();
    return data.pending;
  }

  async getProfile() {
    if (isNullOrUndefined(this.profile)) {
      this.profile = await Box.getProfile(
        "0x3840Da83b4EC0CFEcE8acBcf86CA5196B086e605"
      );
    }

    return this.profile;
  }
}
