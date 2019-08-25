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

  constructor(private web3service: Web3Service) {}

  async init(web3) {
    this.web3 = web3;
    console.log(this.web3);
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
    console.log(await this.web3.eth.getAccounts());
    const receipt = await this.contract.methods
      .startChallenge()
      .send({ from: "0x3840Da83b4EC0CFEcE8acBcf86CA5196B086e605" });
    return receipt;
  }

  async stop(price) {
    const receipt = await this.contract.methods
      .stopChallenge(price)
      .send({ from: "0x3840Da83b4EC0CFEcE8acBcf86CA5196B086e605" });
  }

  async confirm(ethereumAddress, declined) {
    if (declined) {
      return await this.contract.methods
        .confirmChallange()
        .send({ from: "0x3840Da83b4EC0CFEcE8acBcf86CA5196B086e605" });
    }

    return await this.contract.methods
      .confirmChallange()
      .send({ from: "0x3840Da83b4EC0CFEcE8acBcf86CA5196B086e605" });
  }

  async burn(amount) {
    const receipt = await this.tokenContract.methods
      .burn(amount)
      .send({ from: "0x3840Da83b4EC0CFEcE8acBcf86CA5196B086e605" });
  }
}
