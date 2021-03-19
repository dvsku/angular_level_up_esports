export class TeamMember {
    id ?: number;
    firstName : string;
    lastName : string;
    inGameName : string;
    profilePicture : string;
    description : string;
    position : string;
    nationality : string;

    constructor(firstName ?: string , lastName ?: string , inGameName ?: string , description ?: string , position ?: string , nationality ?: string , profilePicture ?: string){
      this.firstName = firstName;
      this.lastName = lastName;
      this.inGameName = inGameName;
      this.description = description;
      this.position = position;
      this.nationality = nationality;
      this.profilePicture = profilePicture;
    }
}
