import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { EthereumService } from "../ethereum.service";
import { BoxService } from "../box.service";
import { Web3Service } from "../web3.service";
import TripData from "./../../../goodTrip.json";

@Component({
  selector: "app-challenge",
  templateUrl: "./challenge.component.html",
  styleUrls: ["./challenge.component.scss"]
})
export class ChallengeComponent implements OnInit {
  challenge: any;
  alreadyStarted = false;

  constructor(
    params: NavParams,
    private modal: ModalController,
    private ethereum: EthereumService,
    private box: BoxService,
    private web3Service: Web3Service
  ) {
    this.challenge = params.get("challenge");
  }

  ngOnInit() {}

  start() {
    this.alreadyStarted = true;

    this.ethereum.start("0x3840Da83b4EC0CFEcE8acBcf86CA5196B086e605");
    // Push Data to 3Box Thread
  }

  stop() {
    this.ethereum.stop(500);
    this.alreadyStarted = false;
    this.box.pushData(TripData);
    // Push Data to IPFS
    // Save Data in 3Box Storage
    this.modal.dismiss();
  }
}
