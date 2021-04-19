import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private maintenanceAdminUrl = `http://localhost:8080/api/admin/maintenance`;

  constructor(private httpClient : HttpClient) { }

  public getCurrentMaintenanceStatus() : Observable<number>{
    const url = `${this.maintenanceAdminUrl}/get`;
    return this.httpClient.get<number>(url).pipe(tap(data =>{
      console.log('Current maintenance status -> ' + data);
    }));
  }

  public changeMaintenanceToOppositeStatus() : Observable<boolean>{
    const url = `${this.maintenanceAdminUrl}/change`;
    return this.httpClient.put<boolean>(url , null).pipe(tap(data =>{
      console.log('Status of maintenance changed -> ' + data);
    }));
  }
}
