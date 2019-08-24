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
    {
      title: "Factory Berlin",
      text: "Discount 10%",
      geo: { lat: 50, lng: 10 }
    },
    {
      title: "Schwimmbad at Goerli",
      text: "Go swim for free",
      geo: { lat: 50, lng: 10 }
    },
    {
      title: "Free Entry at Naturkundemuseum",
      text: "Visit the Dinosaurs",
      geo: { lat: 50, lng: 10 }
    },
    {
      title: "Free Entry at Naturkundemuseum",
      text: "Visit the Dinosaurs",
      geo: { lat: 50, lng: 10 }
    }
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
    var marker = new google.maps.Marker({
      position: { lat: 18.5793, lng: 73.8143 },
      map: this.map,
      title: "Hello World!"
    });
    marker.addListener("click", event => {
      this.openGoddie(this.cards[0]);
    });
  }

  constructor(private modal: ModalController) {}

  async openGoddie(goodie) {
    const modal = await this.modal.create({
      component: GoddieComponent,
      componentProps: { goodie }
    });
    modal.present();
  }
}
