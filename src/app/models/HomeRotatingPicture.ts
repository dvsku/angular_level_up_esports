export class HomeRotatingPicture{
  id ?: number;
  picture ?: string;
  pictureOrder ?: number;

  constructor(picture ? : string , order ?: number){
    this.picture = picture;
    this.pictureOrder = order;
  }
}
