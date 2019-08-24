import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { EthereumService } from "../ethereum.service";

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
    private ethereum: EthereumService
  ) {
    this.challenge = params.get("challenge");
  }

  ngOnInit() {}

  start() {
    this.alreadyStarted = true;
    this.ethereum.start();
    // Push Data to 3Box Thread
  }

  stop() {
    this.alreadyStarted = false;
    // Push Data to IPFS
    // Save Data in 3Box Storage
    this.modal.dismiss();
  }
}
