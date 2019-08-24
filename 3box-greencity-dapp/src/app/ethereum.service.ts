import { Injectable } from "@angular/core";
import { convertActionBinding } from "@angular/compiler/src/compiler_util/expression_converter";
import artifact from "./../../artifacts/goerli/Greencity.json";
import { Web3Service } from "./web3.service.js";

@Injectable({
  providedIn: "root"
})
export class EthereumService {
  web3;
  contract;

  constructor(private web3service: Web3Service) {}

  async init(web3) {
    this.web3 = web3;
    console.log(this.web3);
    const networkId = await this.web3.eth.net.getId();
    this.contract = new this.web3.eth.Contract(
      artifact.abi,
      artifact.networks[networkId].address
    );
  }

  async start() {
    const receipt = await this.contract.methods.start().send();
    return receipt;
  }

  stop(price) {}

  confirm(ethereumAddress, declined) {
    if (declined) {
      //contract declince
    }

    //contract confirm
  }

  burn() {}
}
