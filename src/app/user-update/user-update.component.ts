import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateUserService } from '../services/update-user.service';
import { LanguageService } from '../services/language.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DashboardService } from '../services/dashboard.service';
import { SharedDataService } from '../services/shared.data.service';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  public updateForm: FormGroup;
  public language: any;
  public header: any;
  public imageLoaded = false;
  public imageSrc = '';
  public filesToUpload: Array<File> = [];
  public userData: any;
  public alerts: any;

  private username: string;
  private firstName: string;
  private lastName: string;
  private loaded: boolean;
  private _canvas: any;
  private _blank: any;
  private _img: any;
  private _newImg: any;
  private _stage: any;
  private _source: string;
  private defaultImage = 'assets/img/profilepic.png';
  private frameSize = 150;

  constructor(private _updateUserService: UpdateUserService, private _router: Router, fb: FormBuilder, private _langService: LanguageService,
              public toastr: ToastrService, public _dashboardService: DashboardService, @Inject(MAT_DIALOG_DATA) data, private _sharedData: SharedDataService,
              private _renderer: Renderer2, private dialogRef: MatDialogRef<UserUpdateComponent>) {
    this._source = data.profilePicture;
    this.username = data.username;
    this.firstName = this.username.split(' ')[0];
    this.lastName = this.username.split(' ')[1];
    this.updateForm = fb.group({
      firstName: [this.firstName, Validators.compose([Validators.required])],
      lastName: [this.lastName],
    });
  }


  onSubmit(form: any): void {
    if (!this.updateForm.controls['firstName'].hasError('required')) {
      this._updateUserService.updateUserDetails(form).subscribe((successful: boolean): void => {
        const alert = this.alerts.fail;
        if (!successful) {
          this.toastr.error(alert.body, alert.title);
        }
      });
      this.changeProfile();
    }
  }

  close() {
    this.dialogRef.close();
  }

  upload(): void {
    document.getElementById('file').click();
  }

  changeProfile(): void {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    formData.append('uploads[]', files, this.userData);
    const alert = this.alerts.success;
    this._dashboardService.uploadPic(formData).subscribe(response => {
      this._sharedData.customSuccessAlert(alert.body, alert.title);
    });
    this.close();
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      return;
    }

    this.filesToUpload = <Array<File>> file;
    this.loaded = false;
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
    this._newImg = new Image();
    this._newImg.src = this.imageSrc;
    this.imageLoaded = true;
    this._renderer.listen(this._newImg, 'load', (event) => this.drawImage(this._newImg));
  }

  drawImage(image): void {
    this._stage.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.frameSize, this.frameSize);
  }

  displayProfile(source): void {
    const image = new Image();
    image.src = source;
    this.drawImage(image);
  }

  // UI handlers for changing Profile
  hoverDisplay(): void {
    document.getElementById('overlay').setAttribute(
      'style', 'display: block; opacity: 1; z-index:1000;');
    document.getElementById('canvas').setAttribute(
      'style', 'opacity: 0.5; cursor:pointer');
  }

  hoverHide(): void {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('canvas').style.opacity = '1';
  }

  hoverText(): void {
    document.getElementById('canvas').style.opacity = '0.5';
    document.getElementById('overlay').setAttribute(
      'style', 'display: block; opacity: 1; z-index:1000; cursor:pointer');
  }

  ngOnInit() {
    this._langService.loadLanguage().subscribe(response => {
      this.language = response.pcprepkit.userUpdate;
      this.alerts = this.language.alerts;
      this.header = response.pcprepkit.common.header;
    });
    this._dashboardService.getUserInfo().subscribe(response => {
      this.userData = btoa(response.user.email) + '.jpeg';
    });

    this._canvas = document.getElementById('canvas');
    this._blank = document.getElementById('blank'); // A dummy canvas to compare with the real canvas whether it is having image or not
    this._stage = this._canvas.getContext('2d');
    this._canvas.width = this._canvas.height = this._blank.width = this._blank.height = this.frameSize;

    this._img = new Image();
    this._img.src = this._source;
    this.drawImage(this._img);
    if (!(this._canvas.toDataURL() === this._blank.toDataURL())) {
    } else {
      this.displayProfile(this.defaultImage); // That is, User is not having a profile previously
    }
  }
}

