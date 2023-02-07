import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Coupon } from '../models/Coupon';
import { DateService } from './date.service';

@Injectable({
    providedIn: 'root'
})
export class CouponService {
    private couponUrl = environment.apiURL + 'coupon';
    private adminCouponUrl = environment.apiURL + 'admin/coupon';

    private coupons: Coupon[] = [new Coupon(1, 'TEST', 10)];
    private couponsSubject: BehaviorSubject<Coupon[]> = new BehaviorSubject<Coupon[]>(this.coupons);
    private couponsObs = this.couponsSubject.asObservable();

    constructor(private httpClient: HttpClient, private dateService: DateService) {}

    public getCoupons(): Observable<Coupon[]> {
        return this.couponsObs;
    }

    public getCoupon(couponId: number): Promise<Coupon> {
        let coupon = undefined;
        if (this.coupons) {
            coupon = this.coupons.find((x) => x.id === +couponId);
        }
        if (coupon === undefined) {
            Promise.reject();
        } else {
            coupon.validUntil = this.dateService.convertFromISODate(coupon.validUntil);
            return Promise.resolve(coupon);
        }
    }

    public getCouponByName(name: string): Promise<Coupon> {
        return Promise.resolve(new Coupon(1, name, 10));
    }

    public createCoupon(coupon: Coupon): Promise<boolean> {
        return Promise.resolve(true);
    }

    public removeCoupon(couponId: number): Promise<boolean> {
        return Promise.resolve(true);
    }
}
