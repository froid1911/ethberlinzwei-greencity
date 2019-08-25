import { Injectable } from "@angular/core";
import { convertActionBinding } from "@angular/compiler/src/compiler_util/expression_converter";
import artifact from "./../../artifacts/goerli/Greencity.json";
import artifactToken from "./../../artifacts/goerli/ECOin.json";
import { Web3Service } from "./web3.service.js";

@Injectable({
  providedIn: "root"
})
export class EthereumService {
  web3;
  contract;
  tokenContract;
  account;

  constructor(private web3service: Web3Service) {}

  async init(web3) {
    this.web3 = web3;
    const accounts = await this.web3.eth.getAccounts();
    this.account = accounts[0];
    const networkId = await this.web3.eth.net.getId();
    this.contract = new this.web3.eth.Contract(
      artifact.abi,
      artifact.networks[networkId].address
    );

    this.tokenContract = new this.web3.eth.Contract(
      artifactToken.abi,
      artifactToken.networks[networkId].address
    );
  }

  async start(from) {
    const receipt = await this.contract.methods
      .startChallenge()
      .send({ from: this.account });
    return receipt;
  }

  async stop(price) {
    const receipt = await this.contract.methods
      .stopChallenge(price)
      .send({ from: this.account });
  }

  async confirm(ethereumAddress, declined) {
    if (declined) {
      return await this.contract.methods
        .rejectChallenge(this.account)
        .send({ from: this.account });
    }

    return await this.contract.methods
      .confirmChallange(this.account)
      .send({ from: this.account });
  }

  async burn(amount) {
    const receipt = await this.tokenContract.methods
      .transfer("0x0000000000000000000000000000000000000000", amount)
      .send({ from: this.account });
  }
}
