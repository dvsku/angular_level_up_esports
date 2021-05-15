import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Coupon } from '../models/Coupon';

@Injectable({
    providedIn: 'root'
})
export class CouponService {
    private couponUrl = environment.apiURL + '/coupon';
    private adminCouponUrl = environment.apiURL + '/admin/coupon';

    constructor(private httpClient: HttpClient) {}

    public getAllCoupons(): Observable<Coupon[]> {
        const url = `${this.adminCouponUrl}/list`;
        return this.httpClient.get<Coupon[]>(url).pipe(
            tap((data) => {
                console.log(data);
            })
        );
    }

    // USED FOR APPLYING COUPON
    public checkIfCouponExists(couponToken: string): Observable<boolean> {
        const url = `${this.couponUrl}/${couponToken}`;
        return this.httpClient.get<boolean>(url).pipe(
            tap((data) => {
                console.log('Does coupon exist -> ' + data);
            })
        );
    }

    public addNewCoupon(coupon: Coupon): Observable<boolean> {
        const url = `${this.adminCouponUrl}/new`;
        return this.httpClient.post<boolean>(url, coupon).pipe(
            tap((data) => {
                console.log('New coupon added -> ' + data);
            })
        );
    }

    public deleteExistingCoupon(couponId: number): Observable<boolean> {
        const url = `${this.adminCouponUrl}/${couponId}`;
        return this.httpClient.delete<boolean>(url).pipe(
            tap((data) => {
                console.log('Coupon deleted -> ' + data);
            })
        );
    }
}
