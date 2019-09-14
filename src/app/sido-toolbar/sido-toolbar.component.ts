import {Component, NgZone, OnInit} from '@angular/core';
import {Events} from '@ionic/angular';
import {NetworkService} from '../services/core/network.service';
import {interval} from 'rxjs';
import {flatMap} from 'rxjs/operators';

@Component({
    selector: 'app-sido-toolbar',
    templateUrl: './sido-toolbar.component.html',
    styleUrls: ['./sido-toolbar.component.scss'],
})
export class SidoToolbarComponent implements OnInit {

    UPDATE_SIDO_TOOLBAR = 'UPDATE_SIDO_TOOLBAR';
    isConnected: boolean;

    constructor(private events: Events,
                private zone: NgZone,
                private network: NetworkService) {
    }

    ngOnInit() {
        this.network.isConnected().subscribe(isConnected => {
            this.isConnected = isConnected;
            this.events.publish(this.UPDATE_SIDO_TOOLBAR);
        });

        this.events.subscribe(this.UPDATE_SIDO_TOOLBAR, () => {
            this.zone.run(() => {
            });
        });
    }

}
