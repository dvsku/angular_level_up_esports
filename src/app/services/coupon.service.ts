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

    private coupons: Coupon[] = null;
    private couponsSubject: BehaviorSubject<Coupon[]> = new BehaviorSubject<Coupon[]>(this.coupons);
    private couponsObs = this.couponsSubject.asObservable();

    constructor(private httpClient: HttpClient, private dateService: DateService) {}

    public getCoupons(): Observable<Coupon[]> {
        if (this.coupons === null) {
            this.fetchCoupons().subscribe((coupons) => {
                this.coupons = coupons;
                this.coupons.forEach((coupon) => {
                    coupon.validUntil = this.dateService.convertFromISODate(coupon.validUntil);
                });
                this.couponsSubject.next(this.coupons);
                this.couponsObs.pipe(publishReplay(1), refCount());
            });
        }
        return this.couponsObs;
    }

    private fetchCoupons(): Observable<Coupon[]> {
        const url = `${this.adminCouponUrl}/list`;
        return this.httpClient.get<Coupon[]>(url);
    }

    public getCoupon(couponId: number): Promise<Coupon> {
        let coupon = undefined;
        if (this.coupons) {
            coupon = this.coupons.find((x) => x.id === +couponId);
        }
        if (coupon === undefined) {
            return this.fetchCoupon(couponId)
                .then((coupon) => {
                    coupon.validUntil = this.dateService.convertFromISODate(coupon.validUntil);
                    return coupon;
                })
                .catch(() => {
                    return undefined;
                });
        } else {
            coupon.validUntil = this.dateService.convertFromISODate(coupon.validUntil);
            return Promise.resolve(coupon);
        }
    }

    private fetchCoupon(couponId: number): Promise<Coupon> {
        const url = `${this.couponUrl}/${couponId}`;
        return this.httpClient
            .get<Coupon>(url)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    public getCouponByName(name: string): Promise<Coupon> {
        return this.fetchCouponByName(name).then(
            (coupon) => {
                return coupon;
            },
            () => {
                return undefined;
            }
        );
    }

    private fetchCouponByName(name: string): Promise<Coupon> {
        const url = `${this.couponUrl}/name/${name}`;
        return this.httpClient
            .get<Coupon>(url)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    public createCoupon(coupon: Coupon): Promise<boolean> {
        return this.createDatabaseCoupon(coupon).then(
            (response) => {
                if (this.couponsObs && this.coupons) {
                    coupon.id = response;
                    this.coupons.push(coupon);
                    this.couponsSubject.next(this.coupons);
                }
                return response !== -1;
            },
            () => {
                return false;
            }
        );
    }

    private createDatabaseCoupon(coupon: Coupon): Promise<number> {
        const url = `${this.adminCouponUrl}/new`;
        return this.httpClient
            .post<number>(url, coupon)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    public removeCoupon(couponId: number): Promise<boolean> {
        return this.removeDatabaseCoupon(couponId).then(
            (success) => {
                if (success) {
                    if (this.couponsObs && this.coupons) {
                        const index = this.coupons.findIndex((x) => x.id === couponId);
                        if (index !== -1) {
                            this.coupons.splice(index, 1);
                            this.couponsSubject.next(this.coupons);
                        }
                    }
                }
                return success;
            },
            () => {
                return false;
            }
        );
    }

    private removeDatabaseCoupon(couponId: number): Promise<boolean> {
        const url = `${this.adminCouponUrl}/${couponId}`;
        return this.httpClient
            .delete<boolean>(url)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }
}
