import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ParentService } from 'src/app/shared/services/parent/parent.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  fileImage: any;
  fileBanner: any;
  imagePreview: string | ArrayBuffer | null = null;
  bannerPreview: string | ArrayBuffer | null = null;

  parent: any = {};

  constructor(
    private parentService: ParentService,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getParent();
  }

  getParent = () => {
    this.parentService
      .getParentById(this.authService.getUserId())
      .subscribe((data: any) => {
        this.parent = data;
        this.imagePreview = data.image;
        this.bannerPreview = data.banner;
      });
  };

  onImageChange = (event: any) => {
    this.fileImage = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };

    reader.readAsDataURL(this.fileImage);

    const formData = new FormData();
    formData.append('image', this.fileImage);
    this.parentService
      .updateImage(this.authService.getUserId(), formData)
      .subscribe((res: any) => {
        const userPic = res.message;
        this.profileService.setUserPic(userPic);
      });
  };

  onBannerChange = (event: any) => {
    this.fileBanner = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.bannerPreview = e.target.result;
    };

    reader.readAsDataURL(this.fileBanner);
    const formData = new FormData();
    formData.append('banner', this.fileBanner);
    this.parentService
      .updateBanner(this.authService.getUserId(), formData)
      .subscribe();
  };
}
