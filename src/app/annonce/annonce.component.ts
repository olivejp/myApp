import { Component, OnInit, Input } from '@angular/core';

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
