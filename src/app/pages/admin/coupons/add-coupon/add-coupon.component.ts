import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Coupon } from 'src/app/models/Coupon';
import { CouponService } from 'src/app/services/coupon.service';
import { DateService } from 'src/app/services/date.service';

@Component({
    selector: 'app-add-coupon',
    templateUrl: './add-coupon.component.html',
    styleUrls: ['./add-coupon.component.sass']
})
export class AddCouponComponent implements OnInit {
    coupon = new Coupon();

    faCalendarAlt = faCalendarAlt;

    dateModel: NgbDateStruct;
    minDate: NgbDateStruct;

    constructor(
        private couponService: CouponService,
        private parserFormatter: NgbDateParserFormatter,
        private router: Router,
        private toastrService: ToastrService,
        private dateService: DateService
    ) {}

    ngOnInit(): void {
        this.minDate = this.dateService.getDateTomorrow();
        console.log(this.minDate);
    }

    onSubmit(): void {
        this.coupon.validUntil = this.parserFormatter.format(this.dateModel);
        this.coupon.validUntil = this.dateService.convertToISODate(this.coupon.validUntil);
        this.couponService.createCoupon(this.coupon).then(
            (success) => {
                if (success) {
                    this.router
                        .navigate(['/admin/dashboard', { outlets: { adminOutlet: ['coupons'] } }], {
                            skipLocationChange: true
                        })
                        .then(() => {
                            this.toastrService.success('Coupon created.');
                        });
                } else {
                    this.toastrService.error('Failed to create coupon.');
                }
            },
            () => {
                this.toastrService.error('Failed to create coupon.');
            }
        );
    }
}
