import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


@Component({
  selector: 'app-yarn',
  templateUrl: './yarn.page.html',
  styleUrls: ['./yarn.page.scss'],
})
export class YarnPage {

  submitted = false;
  redirect = [];
  headerObject = [{
    'title': 'Verbally',
    'subTitle': 'Create yarns'
  }];

  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  //folderPath = 'cdvfile://localhost/assets/voice'

  stringToWrite: string;
  blob: Blob;
  current_file_playing: any;
  storageDirectory: any;
  private win: any = window

  constructor(private media: Media,
    private file: File,
    private androidPermissions: AndroidPermissions,
    private transfer: FileTransfer,
    public platform: Platform,
  ) {

    this.platform.ready().then(() => {
      this.filePermission();
      if (this.platform.is('ios')) {
        console.log("ios");
        this.filePath = this.file.tempDirectory.replace(/file:\/\//, '') + 'record.mp3';
      } else if (this.platform.is('android')) {
        this.filePath = this.file.externalDataDirectory.replace(/file:\/\//, '') + "record.mp3";
        console.log("android");
      }
    });

  }

  ionViewWillEnter() {
    //this.displayRecords();
  }

  filePermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );

    this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
  }


  record() {
    this.fileName = "records.mp3";
    this.file.createFile(this.filePath, this.fileName, true);
    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
    this.recording = true;
  }

  displayRecords() {

    let ft = this.transfer.create();
    const url = encodeURI(this.file.externalDataDirectory + 'record.mp3');

    let fn = this.file.dataDirectory + this.fileName;
    ft.download(url, fn).then(
      (fe: FileEntry) => {
        this.audio = this.media.create(fe.nativeURL);
        this.audioList.push({ name: this.fileName, url: fe.toURL() });
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  stopRecord() {
    this.audio.stopRecord();
    this.audio.release();
    this.recording = false;
    this.displayRecords();
  }

  playAudio(index) {
    this.audio = this.media.create(this.audioList[index].url);
    this.audio.play();
  }
}

