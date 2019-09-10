import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {TextToSpeech} from '@ionic-native/text-to-speech/ngx';
import { TextToSpeechPage } from './text-to-speech.page';

const routes: Routes = [
  {
    path: '',
    component: TextToSpeechPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [TextToSpeech],
  declarations: [TextToSpeechPage]
})
export class TextToSpeechPageModule {}
