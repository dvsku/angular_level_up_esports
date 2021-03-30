import { TeamMember } from "./TeamMember";

export class Achievement{
  id ?: number;
  title : string;
  description : string;
  place : string;
  location : string;
  timeWhenFinished : Date;

  constructor(title ?: string , description ?: string , categoryType ?: number , place ?: string , location ?: string , timeWhenFinished ?: Date){
    this.title = title;
    this.description = description;
    this.place = place;
    this.location = location;
    this.timeWhenFinished = timeWhenFinished;
  }
}
