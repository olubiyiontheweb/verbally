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
    this.soundUrl = [];
    if (this.soundList.playing()) this.soundList.stop();
  }

  playAudio(audioUrl): void {
    if (this.soundList.length > 0 && this.soundList.playing())
      this.soundList.stop();
    this.setHowl(Capacitor.convertFileSrc(audioUrl));
    this.soundList.play();
  }

  pauseAudio(): void {
    this.soundList.pause();
  }
}
