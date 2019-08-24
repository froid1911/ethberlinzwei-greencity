import { Component, OnInit } from "@angular/core";
import { BoxService } from "../box.service";
import { NavController, ModalController } from "@ionic/angular";
import { TabsPage } from "../tabs/tabs.page";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  constructor(
    private service: BoxService,
    private nav: NavController,
    private modal: ModalController
  ) {}

  ngOnInit() {}

  login() {
    this.service.login().then(box => {
      this.modal.dismiss();
    });
  }
}
