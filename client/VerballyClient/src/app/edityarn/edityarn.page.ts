import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { XSound, X } from "xsound";
import { Capacitor } from "@capacitor/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-edityarn",
  templateUrl: "./edityarn.page.html",
  styleUrls: ["./edityarn.page.scss"],
})
export class EdityarnPage implements OnInit {
  private soundUrl: string;
  private win: any = window;
  public playClicked: boolean = false;
  private togglePlay: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  outputStartTime: string;
  outputEndTime: string;

  constructor(private router: ActivatedRoute, private cdf: ChangeDetectorRef) {
    this.router.params.subscribe((params) => {
      let parseSound = JSON.parse(params.queryParams);
      this.soundUrl = Capacitor.convertFileSrc(parseSound[0].url);
      X.ajax({
        url: this.soundUrl,
        timeout: 60000,
        success: (event, arrayBuffer) => {
          // ArrayBuffer -> AudioBuffer
          X("audio").ready.call(X("audio"), arrayBuffer);
        },
      });
    });
  }

  ngOnInit() {
    X("audio").setup({
      ready: (buffer) => {
        this.togglePlay.subscribe((res) => {
          console.log(res);
          if (res && X("audio").isPaused()) {
            X("audio").start(X("audio").param("currentTime"));
          } else {
            X("audio").stop();
          }
        });
      },
      start: (source, currentTime) => {
        console.log("start");
        console.dir(source);
        console.dir(currentTime);
      },
      stop: (source, currentTime) => {
        console.log("stop");
        console.dir(source);
        console.dir(currentTime);
      },
      update: (source, currentTime) => {
        const index = Math.floor(currentTime * source.buffer.sampleRate);
        const n100msec = 0.1 * source.buffer.sampleRate;

        if (index % n100msec !== 0) {
          return;
        }

        console.log("update");
        console.dir(source);
        console.dir(currentTime);
      },
      ended: (source, currentTime) => {
        console.log("ended");
        console.dir(source);
        console.dir(currentTime);
        this.playClicked = false;
      },
      error: (error) => {
        if (error instanceof Error) {
          window.alert(error.message);
        } else {
          window.alert("Error : decodeAudioData");
        }
      },
    });
  }

  ngAfterViewInit() {
    X("audio")
      .module("analyser")
      .domain("timeoverview", 0)
      .setup(this.canvas.nativeElement)
      .state(true);

    X("audio")
      .module("analyser")
      .domain("timeoverview", 0)
      .param("mode", "sprite");
  }

  playAudio() {
    this.playClicked = !this.playClicked;
    this.togglePlay.next(this.playClicked);
  }

  pauseAudio() {
    console.log("pause");
    this.playClicked = !this.playClicked;
    this.togglePlay.next(this.playClicked);
  }

  drawAudio() {}
}
