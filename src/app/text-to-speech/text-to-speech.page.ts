import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.page.html',
  styleUrls: ['./text-to-speech.page.scss'],
})
export class TextToSpeechPage implements OnInit {

    private textToSpeech: string;

    constructor(private tts: TextToSpeech) { }

    ngOnInit() {
    }

    parle() {
        if (this.textToSpeech){
            this.tts.speak(this.textToSpeech)
              .then(() => console.log('Success'))
              .catch((reason: any) => console.log(reason));
         }
    }
}
