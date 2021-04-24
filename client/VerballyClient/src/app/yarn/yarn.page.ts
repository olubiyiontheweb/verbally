import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { Platform } from "@ionic/angular";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";

import { Media, MediaObject } from "@ionic-native/media/ngx";
import { File, FileEntry } from "@ionic-native/file/ngx";

import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { Router } from "@angular/router";

@Component({
  selector: "app-yarn",
  templateUrl: "./yarn.page.html",
  styleUrls: ["./yarn.page.scss"],
})
export class YarnPage {
  submitted = false;
  redirect = [];
  headerObject = [
    {
      title: "Verbally",
      subTitle: "Create yarns",
    },
  ];

  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  duration: number = 0;
  audioPlaying = false;
  progress: number;
  p_bar_value: number;
  p_bar_buffer: number;
  isPlayingAud: boolean = false;
  @ViewChild("pressBtn") pressBtn: ElementRef;
  selectedIndex: number;

  @ViewChild("button") button: ElementRef;
  tempAudioEditFile = [];

  constructor(
    private media: Media,
    private file: File,
    private androidPermissions: AndroidPermissions,
    private transfer: FileTransfer,
    public platform: Platform,
    private cdf: ChangeDetectorRef,
    private router: Router
  ) {
    this.platform.ready().then(() => {
      this.filePermission();
    });
  }

  onMoveHandler($event) {
    console.log($event);
  }

  ionViewWillEnter() {
    this.checkFileAvailable();
    // this.audioList.push(
    //   { name: "test", url: "../1.3gp" },
    //   { name: "test1", url: "../1.3gp" }
    // );
  }

  filePermission() {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      )
      .then(
        (result) => console.log("Has permission?", result.hasPermission),
        (err) =>
          this.androidPermissions.requestPermission(
            this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
          )
      );

    this.androidPermissions.requestPermissions(
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    );
  }

  record() {
    if (this.platform.is("ios")) {
      this.fileName =
        "verbally" +
        new Date().getDate() +
        new Date().getFullYear() +
        new Date().getSeconds() +
        ".3gp";
      this.filePath =
        this.file.tempDirectory.replace(/file:\/\//g, "") + this.fileName;
    } else if (this.platform.is("android")) {
      this.fileName =
        "verbally" +
        new Date().getDate() +
        new Date().getFullYear() +
        new Date().getSeconds() +
        ".3gp";
      this.filePath =
        this.file.externalDataDirectory.replace(/file:\/\//g, "") +
        this.fileName;
    }

    this.file.createFile(this.filePath, this.fileName, true);
    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
    this.recording = true;
  }

  downloadRecords() {
    //Downloads records from file directory and load it to ionic
    let ft = this.transfer.create();
    const url = encodeURI(this.file.externalDataDirectory + this.fileName);

    let fn = this.file.dataDirectory + this.fileName;
    ft.download(url, fn).then(
      (fe: FileEntry) => {
        this.audio = this.media.create(fe.nativeURL);
        this.audioList.push({
          name: this.fileName,
          url: fe.toURL(),
          audioIsPlaying: false,
          progressBar: 0,
        });
      },
      (err) => {
        console.log(JSON.stringify(err));
      }
    );
  }

  checkFileAvailable() {
    this.file
      .resolveLocalFilesystemUrl(this.file.dataDirectory)
      .then((fileEntry: any) => {
        this.audioList = [];
        const reader = fileEntry.createReader();
        reader.readEntries(
          (enteries) => {
            enteries.forEach((element) => {
              if (element.isFile === true) {
                this.audioList.push({
                  name: element.name,
                  url: element.toURL(),
                  audioIsPlaying: false,
                  progressBar: 0,
                });
              }
            });
            this.cdf.detectChanges();
          },
          (err) => {
            console.log(err);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  stopRecord() {
    this.audio.stopRecord();
    this.audio.release();
    this.recording = false;
    this.audioPlaying = false;
    this.downloadRecords();
    this.audioList.map((ele, index) => {
      ele.audioIsPlaying = false;
    });
    this.cdf.detectChanges();
  }

  playAudio(index, audio) {
    if (this.isPlayingAud == true) {
      this.isPlayingAud = false;
      this.audio.setVolume(0);
      this.audio.pause();
      this.audio.release();
      this.audioList.map((ele, indx) => {
        ele.audioIsPlaying = false;
        ele.progressBar = 0;
        // this.cdf.detectChanges();
      });
    }
    this.audio = this.media.create(audio.url);

    this.audio.play();
    this.isPlayingAud = true;
    audio.audioIsPlaying = true;
    this.cdf.detectChanges();
    // Update media position every second
    var mediaTimer = setInterval(() => {
      // get media position
      this.audio
        .getCurrentPosition()
        .then((response) => {
          // success callback
          console.log(audio);
          console.log(response);
          audio.progressBar++;
          this.cdf.detectChanges();
          console.log(audio.progressBar);
          if (audio.progressBar > 10) {
            audio.progressBar = 0;
            clearInterval(mediaTimer);
            this.cdf.detectChanges();
          }

          if (Math.sign(response) == -1) {
            audio.audioIsPlaying = false;
            audio.progressBar = 0;
            // clear interval
            clearInterval(mediaTimer);
            this.cdf.detectChanges();
          }
        })
        .catch((error) => {
          // error callback
          console.error("Error getting pos= " + error);
        });
    }, 1000);
  }

  pauseAudio(i, audio) {
    this.audio.pause();
    this.cdf.detectChanges();
    this.audio.release();
  }

  checkedYarnsForEdit($event, audio, index) {
    if ($event.detail.checked && this.tempAudioEditFile.length == 0) {
      this.tempAudioEditFile.push(audio);
    }
    if (!$event.detail.checked) {
      this.tempAudioEditFile.splice(index, 1);
      return;
    }
    this.tempAudioEditFile.map((aud) => {
      if (aud.name == audio.name) {
        return;
      } else {
        this.tempAudioEditFile.push(audio);
      }
    });
  }

  gotoYarnEdit(event: Event) {
    event.preventDefault();

    this.router.navigate([
      "/tabs/edityarn",
      {
        queryParams: JSON.stringify(this.tempAudioEditFile),
      },
    ]);
  }

  ionViewWillLeave() {
    this.audioList = [];
    this.tempAudioEditFile = [];
  }
}
