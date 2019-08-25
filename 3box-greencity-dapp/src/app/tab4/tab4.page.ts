import {
  Component,
  Directive,
  Input,
  ViewChild,
  OnInit,
  ElementRef
} from "@angular/core";
import { BoxService } from "../box.service";
import { EthereumService } from "../ethereum.service";
import { ModalController } from "@ionic/angular";
import * as didJWT from "did-jwt";

declare var google: any;

@Component({
  selector: "app-tab4",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"]
})
export class Tab4Page implements OnInit {
  @ViewChild("gmap", { static: true }) gmapElement: any;
  map: any;

  constructor(
    private box: BoxService,
    private ethereum: EthereumService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(52.494097, 13.446572),
      zoom: 15,
      mapTypeId: "roadmap"
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.addPath();
  }

  async addPath() {
    const data = await this.box.getData(
      "0x3840Da83b4EC0CFEcE8acBcf86CA5196B086e605"
    );
    const coords = [];
    data.forEach(element => {
      const claim: any = didJWT.decodeJWT(element);
      // console.log(claim);
      coords.push({
        lat: claim.payload.latidude,
        lng: claim.payload.longitude
      });
    });

    var bikeplan = new google.maps.Polyline({
      path: coords,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    bikeplan.setMap(this.map);
  }

  async result(valid) {
    await this.ethereum.confirm(
      "0x3840Da83b4EC0CFEcE8acBcf86CA5196B086e605",
      valid
    );
  }
}
