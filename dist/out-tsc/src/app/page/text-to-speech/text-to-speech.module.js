import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { TextToSpeechPage } from './text-to-speech.page';
const routes = [
    {
        path: '',
        component: TextToSpeechPage
    }
];
let TextToSpeechPageModule = class TextToSpeechPageModule {
};
TextToSpeechPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        providers: [TextToSpeech],
        declarations: [TextToSpeechPage]
    })
], TextToSpeechPageModule);
export { TextToSpeechPageModule };
//# sourceMappingURL=text-to-speech.module.js.map