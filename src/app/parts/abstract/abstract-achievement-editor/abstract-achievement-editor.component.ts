import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCalendarAlt, faImage, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Achievement } from 'src/app/models/Achievement';
import { AchievementCategory } from 'src/app/models/AchievementCategory';
import { AchievementPicture } from 'src/app/models/AchievementPicture';
import { TeamMembersHandler } from 'src/app/models/interfaces/TeamMembersHandler';
import { Person } from 'src/app/models/Person';
import { TeamMember } from 'src/app/models/TeamMember';
import { AchievementCategoryService } from 'src/app/services/achievement-category.service';
import { AchievementPictureService } from 'src/app/services/achievement-picture.service';
import { AchievementService } from 'src/app/services/achievement.service';
import { ImagesService } from 'src/app/services/images.service';
import { PersonService } from 'src/app/services/person.service';
import { TeamMemberGroupComponent } from '../../common/team-member-group/team-member-group.component';

@Component({ template: '' })
export class AbstractAchievementEditorComponent extends TeamMembersHandler {
    protected team: AchievementCategory;
    protected name: string;

    achievement: Achievement = new Achievement();
    teamMember: TeamMember;

    @ViewChild('fileInput')
    fileInput: ElementRef;

    @ViewChild('removeImageModal')
    removeImageModal: ElementRef;

    @ViewChild('createTeamMemberModal')
    createTeamMemberModal: ElementRef;

    @ViewChild(ImageCropperComponent)
    imageCropper: ImageCropperComponent;

    @ViewChild(TeamMemberGroupComponent)
    teamMemberGroup: TeamMemberGroupComponent;

    cropperImageBase64 = '';
    croppedImage: any = '';

    faTimes = faTimes;
    faImage = faImage;
    faPlus = faPlus;
    faSave = faSave;
    faCalendarAlt = faCalendarAlt;

    images: string[] = [];
    selectedImage: AchievementPicture;

    edit = false;
    selectedTeamMember: TeamMember;

    public people: Person[];
    public subtract: Person[];
    protected peopleSubscription: Subscription;

    constructor(
        protected teamService: AchievementCategoryService,
        protected achievementService: AchievementService,
        protected achievementPictureService: AchievementPictureService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected toastrService: ToastrService,
        protected config: NgbNavConfig,
        protected modalService: NgbModal,
        protected peopleService: PersonService,
        public imageService: ImagesService
    ) {
        super();
        config.destroyOnHide = false;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // TEAM MEMBERS
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    createTeamMember(teamMember: TeamMember): void {
        teamMember.displayOrder = this.team.teamMembers.length + 1;

        this.achievement.teamMembers.push(teamMember);
        this.subtract = this.achievement.teamMembers.map<Person>((member) => member.person);
        this.teamMemberGroup.reorderTeamMembers();
        this.modalService.dismissAll();
    }

    updateTeamMember(teamMember: TeamMember): void {
        const index = this.achievement.teamMembers.indexOf(this.selectedTeamMember);
        if (index !== -1) {
            this.achievement.teamMembers[index] = teamMember;
            this.subtract = this.achievement.teamMembers.map<Person>((member) => member.person);
            this.teamMemberGroup.reorderTeamMembers();
        }
        this.edit = false;
        this.modalService.dismissAll();
    }

    removeTeamMember(teamMember: TeamMember): void {
        const index = this.achievement.teamMembers.findIndex((x) => x.person.id === teamMember.person.id);
        if (index !== -1) {
            this.achievement.teamMembers.splice(index, 1);
            this.teamMemberGroup.reorderTeamMembers();
        }
        this.subtract = this.achievement.teamMembers.map<Person>((member) => member.person);
    }

    openEditWindow(teamMember: TeamMember): void {
        this.edit = true;
        this.selectedTeamMember = teamMember;
        this.teamMember = new TeamMember(
            teamMember.id,
            teamMember.inGameName,
            teamMember.position,
            teamMember.nationality,
            teamMember.instagramLink,
            teamMember.twitterLink,
            teamMember.twitchLink,
            teamMember.person,
            teamMember.displayOrder
        );
        this.modalService.open(this.createTeamMemberModal, {
            ariaLabelledBy: 'modal-basic-title',
            windowClass: 'modal-dialog-standard',
            backdrop: 'static'
        });
        this.teamMemberGroup.parent = this;
    }

    addTeamMember(): void {
        this.teamMember = new TeamMember();
        this.modalService.open(this.createTeamMemberModal, {
            ariaLabelledBy: 'modal-basic-title',
            windowClass: 'modal-dialog-standard',
            backdrop: 'static'
        });
        this.teamMemberGroup.parent = this;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // IMAGES
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    addImages(): void {
        this.fileInput.nativeElement.click();
    }

    fileSelected(event): void {
        this.loadImages(event).then(() => {
            this.cropImages();
        });
    }

    loadImages(event: any): Promise<boolean> {
        return new Promise((resolve) => {
            let count = 0;
            if (event.target.files && event.target.files[0]) {
                const fileCount = event.target.files.length;
                for (let i = 0; i < fileCount; i++) {
                    const reader = new FileReader();

                    reader.onload = (event: any) => {
                        this.images.push(event.target.result);
                        count++;
                        if (count === fileCount) {
                            resolve(true);
                        }
                    };

                    reader.readAsDataURL(event.target.files[i]);
                }
            }
        });
    }

    cropImages(): void {
        if (this.images.length > 0) {
            this.cropperImageBase64 = this.images.pop();
        }
    }

    imageLoaded() {
        if (this.cropperImageBase64 !== '') {
            this.imageCropper.crop();
        }
    }

    imageCropped(event: ImageCroppedEvent): void {
        this.achievement.pictures.push(new AchievementPicture(null, event.base64));
        this.cropperImageBase64 = '';
        this.cropImages();
    }

    removeImage(image: AchievementPicture): void {
        this.selectedImage = image;
        this.modalService.open(this.removeImageModal, {
            ariaLabelledBy: 'modal-basic-title',
            windowClass: 'modal-dialog-standard',
            backdrop: 'static'
        });
    }

    onRemoveImageOk() {
        if (this.selectedImage) {
            const index = this.achievement.pictures.indexOf(this.selectedImage);
            if (index !== -1) {
                this.achievement.pictures.splice(index, 1);
            }
        }
    }
}
