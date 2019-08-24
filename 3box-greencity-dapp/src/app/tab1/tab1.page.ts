import { Component, ViewChild, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { GoddieComponent } from "../goddie/goddie.component";
import { isNullOrUndefined } from "util";

declare var google: any;
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  cards = [
    { title: "Factory Berlin", text: "Discount 10%" },
    { title: "Schwimmbad at Goerli", text: "Go swim for free" }
  ];

  @ViewChild("gmap", { static: true }) gmapElement: any;
  map: any;

  ngOnInit() {
    if (!isNullOrUndefined(this.map)) {
      return;
    }
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: "roadmap"
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  constructor(private modal: ModalController) {}

  async openGoddie(card) {
    const modal = await this.modal.create({
      component: GoddieComponent,
      componentProps: { card }
    });
    modal.present();
  }
}
