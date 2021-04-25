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
  //soundUrl: Array<{ name: number; url: string }> = [];
  soundUrl: Array<{}> = [];
  fileName: string;
  win: any = window;
  soundList: any = [];
  public playClicked: boolean = false;

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
      onend: function () {
        console.log("Finished!");
      },
    });
  }

  ionViewDidEnter() {}

  ionViewWillLeave() {
    if (this.soundList.playing()) this.soundList.stop();
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

  pauseAudio(index, audioUrl): void {
    audioUrl.map((audio, idx) => {
      if (audio[index].audioIsPlaying == true) {
        audio[index].audioIsPlaying = false;
        this.soundList.pause();
      }
    });
  }

  segmentChanged(event) {
    console.log(event);
  }
}
