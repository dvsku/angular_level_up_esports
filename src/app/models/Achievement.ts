import { TeamMember } from "./TeamMember";

export class Achievement{
  id ?: number;
  title : string;
  description : string;
  categoryType : number; // 0 -> dota 2 , 1 -> counter-strike , 2 -> league of legends , 3 -> warcraft 3 , 4 -> fortnite , 5 -> heroes of the storm , 6 -> heartstone
  teamMembers : TeamMember[];

  constructor(title ?: string , description ?: string , categoryType ?: number , teamMembers ?: TeamMember[]){
    this.title = title;
    this.description = description;
    if(this.categoryType === null || categoryType === undefined){
        this.categoryType = 0;
    }else{
      this.categoryType = categoryType;
    }
    this.teamMembers = teamMembers;
  }
}
