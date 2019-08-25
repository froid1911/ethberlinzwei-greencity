import { Component, OnInit } from "@angular/core";
import { BoxService } from "../box.service";
import {
  NavController,
  ModalController,
  AlertController
} from "@ionic/angular";
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
    private modal: ModalController,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.showAlert();
  }

  async showAlert() {
    const alert = await this.alert.create({
      subHeader: "Please open devtools and select iphone layout"
    });

    alert.present();
  }

  login() {
    this.service.login().then(box => {
      console.log(box);
      this.modal.dismiss();
    });
  }
}
