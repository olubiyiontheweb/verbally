import { Component, ChangeDetectorRef } from '@angular/core';
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
    private cdf: ChangeDetectorRef
  ) {

    this.platform.ready().then(() => {
      this.filePermission();
    });

  }

  ionViewWillEnter() {
    this.checkFileAvailable();
  }

  filePermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );

    this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
  }


  record() {
    if (this.platform.is('ios')) {
      this.fileName = 'verbally' + new Date().getDate() + new Date().getFullYear() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.tempDirectory.replace(/file:\/\//g, '') + this.fileName;
    } else if (this.platform.is('android')) {
      this.fileName = 'verbally' + new Date().getDate() + new Date().getFullYear() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
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
        this.audioList.push({ name: this.fileName, url: fe.toURL() });
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  checkFileAvailable() {
    this.file.resolveLocalFilesystemUrl(this.file.dataDirectory)
      .then((fileEntry: any) => {
        this.audioList = [];
        const reader = fileEntry.createReader();
        reader.readEntries((enteries) => {

          enteries.forEach(element => {
            if (element.isFile === true) {
              this.audioList.push({ name: element.name, url: element.toURL() });
            }
          });
          this.cdf.detectChanges();
        },
          (err) => {
            console.log(err)
          }
        )
      })
      .catch((err) => {
        console.log(err)
      });

  }

  stopRecord() {
    this.audio.stopRecord();
    this.audio.release();
    this.recording = false;
    this.downloadRecords();
  }

  playAudio(index) {
    this.audio = this.media.create(this.audioList[index].url);
    this.audio.stop();
    this.audio.release();
    setTimeout(() => {
      this.audio.play();
    }, 300);

  }
}

