import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { BehaviorSubject } from "rxjs";

import { Platform } from "@ionic/angular";

import { Howl, Howler } from "howler";

@Component({
  selector: "app-edityarn",
  templateUrl: "./edityarn.page.html",
  styleUrls: ["./edityarn.page.scss"],
})
export class EdityarnPage {
  soundUrl: Array<{}> = [];
  fileName: string;
  win: any = window;
  soundList: any = [];
  soundDuration: number = 0;
  buildSoundObject = [];

  togglePlay: BehaviorSubject<boolean> = new BehaviorSubject(false);

  @ViewChild("canvas", { static: false }) canvas: ElementRef;
  @ViewChild("audio", { static: false }) audio: ElementRef;

  constructor(
    private router: ActivatedRoute,
    private cdf: ChangeDetectorRef,
    public platform: Platform
  ) {
    this.router.params.subscribe((params) => {
      //Remember to add some checks so that that double push is not done.
      this.soundUrl.push(JSON.parse(params.queryParams));
    });
  }

  setHowl(sound) {
    this.soundList = new Howl({
      src: [sound],
      loop: false,
      html5: true,
      onload: function () {
        this.soundDuration = this._duration;
      },
      onend: function () {
        console.log("Finished!");
        console.log(this);
      },
    });
  }

  ionViewDidEnter() {
    this.buildSoundObject = [];
    this.soundUrl.map((value) => {
      if (<any>value) {
        const soundLength = (<any>value).length;
        for (let i = 0; i < soundLength; i++) {
          this.buildSoundObject.push({
            sequences: [
              [0, 20],
              [20, 40],
              [40, 60],
            ],
            sound: {
              name: value[i].name,
              url: value[i].url,
              audioIsPlaying: value[i].audioIsPlaying,
              progressBar: value[i].progressBar,
            },
          });
        }
      }
    });
  }

  ionViewWillLeave() {
    if (this.soundList.length > 0) this.soundList.stop();
    this.soundUrl = [];
  }

  playAudio(audioUrl): void {
    if (this.soundList.length > 0 && this.soundList.playing()) {
      audioUrl.audioIsPlaying = false;
      this.soundList.stop();
    } else {
      audioUrl.audioIsPlaying = true;
      this.setHowl(Capacitor.convertFileSrc(audioUrl.url));
      this.soundList.play();
    }
  }

  playSequences(event, url): void {
    var sList = new Howl({
      src: [Capacitor.convertFileSrc(url)],
      html5: true,
      sprite: {
        sq: [event.detail.value],
      },
      spriteMap: {
        sprite0: "sq",
      },
    });
    console.log(event.detail.value);
    console.log(url);
    // sList.play("sq");
    // Clear listener after first call.
    sList.once("play", function () {
      sList.play("sq");
    });
  }

  pauseAudio(index, audioUrl): void {
    audioUrl.map((audio, idx) => {
      if (audio[index].audioIsPlaying == true) {
        audio[index].audioIsPlaying = false;
        this.soundList.pause();
      }
    });
  }

  segmentChanged() {
    console.log();
  }
}
