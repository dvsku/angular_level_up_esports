import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Coupon } from 'src/app/models/Coupon';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
    selector: 'app-coupons',
    templateUrl: './coupons.component.html',
    styleUrls: ['./coupons.component.sass']
})
export class CouponsComponent implements OnInit, OnDestroy {
    coupons: Coupon[];
    private couponsSubscription: Subscription;

    selectedCoupon: Coupon;

    faPlus = faPlus;
    faTimes = faTimes;

    constructor(private couponService: CouponService, private toastrService: ToastrService) {}

    ngOnInit(): void {
        this.couponsSubscription = this.couponService.getCoupons().subscribe((coupons) => {
            this.coupons = coupons;
        });
    }

    ngOnDestroy(): void {
        if (this.couponsSubscription) this.couponsSubscription.unsubscribe();
    }

    onRemoveOk(): void {
        this.couponService.removeCoupon(this.selectedCoupon.id).then(
            (success) => {
                if (success) {
                    const index = this.coupons.indexOf(this.selectedCoupon);
                    if (index !== -1) {
                        this.coupons.splice(index, 1);
                    }
                    this.toastrService.success('Coupon removed.');
                } else {
                    this.toastrService.error('Failed to remove coupon.');
                }
            },
            () => {
                this.toastrService.error('Failed to remove coupon.');
            }
        );
    }
}
