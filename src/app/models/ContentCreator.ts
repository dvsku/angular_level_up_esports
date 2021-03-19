export class ContentCreator{
  id ?: number;
  firstName : string;
  lastName : string;
  nickName : string;
  description : string;
  profilePicture : string;
  twitchLink : string;
  trovoLink : string;
  youtubeLink : string;
  facebookLink : string;
  instagramLink : string;

  constructor(firstName ?: string , lastName ?: string , nickName ?: string , description ?: string , profilePicture ?: string){
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickName = nickName;
    this.description = description;
    this.profilePicture = profilePicture;
  }
}
