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
export class EdityarnPage implements OnInit {
  soundUrl: Array<{ name: number; url: string }> = [];
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
    this.soundUrl = [];
    this.router.params.subscribe((params) => {
      let parseSound = JSON.parse(params.queryParams);
      this.soundUrl.push(parseSound);
      this.setHowl(this.soundUrl);
    });
  }

  setHowl(sound) {
    let audioLst: any,
      audioLstArray: any = [];

    this.soundList = new Howl({
      src: [audioLstArray],
      autoplay: true,
      loop: true,
      html5: true,
      volume: 0.5,
      onend: function () {
        console.log("Finished!");
      },
    });
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.soundUrl = [];
    this.soundList.stop();
  }

  playAudio(): void {
    this.soundList.play();
    // this.playClicked = !this.playClicked;
    // this.togglePlay.next(this.playClicked);
  }

  pauseAudio(): void {
    this.playClicked = !this.playClicked;
    this.togglePlay.next(this.playClicked);
  }
}
