import { Component, OnInit, Input } from '@angular/core';
import { Annonce } from 'src/app/domain/annonce.entity';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss'],
})
export class AnnonceComponent implements OnInit {

  @Input()
  annonce: Annonce;

  constructor() { }

  ngOnInit() { }

}
