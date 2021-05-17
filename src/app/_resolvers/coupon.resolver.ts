import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Coupon } from '../models/Coupon';
import { CouponService } from '../services/coupon.service';

@Injectable({
    providedIn: 'root'
})
export class CouponResolver implements Resolve<Coupon> {
    constructor(private couponService: CouponService) {}

    resolve(route: ActivatedRouteSnapshot): Promise<Coupon> {
        const id = route.params['id'];
        return this.couponService.getCoupon(id).then(
            (coupon) => {
                return coupon;
            },
            () => {
                return undefined;
            }
        );
    }
}
