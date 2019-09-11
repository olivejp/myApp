import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
let TextToSpeechPage = class TextToSpeechPage {
    constructor(tts) {
        this.tts = tts;
    }
    ngOnInit() {
    }
    parle() {
        if (this.textToSpeech) {
            this.tts.speak(this.textToSpeech)
                .then(() => console.log('Success'))
                .catch((reason) => console.log(reason));
        }
    }
};
TextToSpeechPage = tslib_1.__decorate([
    Component({
        selector: 'app-text-to-speech',
        templateUrl: './text-to-speech.page.html',
        styleUrls: ['./text-to-speech.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [TextToSpeech])
], TextToSpeechPage);
export { TextToSpeechPage };
//# sourceMappingURL=text-to-speech.page.js.map