import { Injectable } from "@angular/core";
import Web3 from "web3";

@Injectable({
  providedIn: "root"
})
export class Web3Service {
  web3: Web3;
  chainId: any;
  accounts: any;
  constructor() {}

  init() {
    return new Promise(resolve => {
      window["ethereum"].enable().then(async accounts => {
        this.accounts = accounts;
        this.web3 = new Web3(window["ethereum"]);
        console.log(this.web3);
        this.chainId = await this.web3.eth.net.getId();
        resolve(true);
      });
    });
  }

  getWeb3() {
    return this.web3;
  }

  getChainId() {
    return this.chainId;
  }

  getAccount() {
    return this.accounts[0];
  }
}
