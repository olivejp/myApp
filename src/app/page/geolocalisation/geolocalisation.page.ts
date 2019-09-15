import {Component, OnInit} from '@angular/core';
import {GeolocalService} from '../../services/geolocal.service';
import {Geoposition} from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'app-geolocalisation',
    templateUrl: './geolocalisation.page.html',
    styleUrls: ['./geolocalisation.page.scss'],
})
export class GeolocalisationPage implements OnInit {

    position: Geoposition;
    formatedDate: string;

    constructor(private geolocation: GeolocalService) {
    }

    ngOnInit() {
        this.geolocation.getLocalisation().subscribe(position => {
            this.position = position;

            const date = new Date(position.timestamp);
            const hours = date.getHours();
            const minutes = '0' + date.getMinutes();
            const seconds = '0' + date.getSeconds();
            this.formatedDate = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        });
    }
}
