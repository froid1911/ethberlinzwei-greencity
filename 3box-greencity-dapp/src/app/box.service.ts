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
  private accounts;

  constructor() {}

  login() {
    return window["ethereum"]
      .enable()
      .then(accounts => {
        this.accounts = accounts;
        return Box.openBox(accounts[0], window["ethereum"]);
      })
      .then(box => {
        this.box = box;
        return box.openSpace("greenberlin");
      })
      .then(async space => {
        this.space = space;
        this.profile = await Box.getProfile(this.accounts[0]);
        this.channel = await this.space.joinThread(this.accounts[0]);
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
      this.profile = await Box.getProfile(this.accounts[0]);
    }

    return this.profile;
  }
}
