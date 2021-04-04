import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductCategory } from '../models/ProductCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private categoryUrl = `http://localhost:8080/api/productCategory`;
  private categoryAdminUrl = `http://localhost:8080/api/admin/productCategory`;

  constructor(private httpClient : HttpClient) { }

  getOneProductCategory(id : number) : Observable<ProductCategory>{
    const url = `${this.categoryUrl}/${id}`;
    return this.httpClient.get<ProductCategory>(url).pipe(tap(data => {
      // LOGOVANJE
    }));
  }

  getAllProductCategories() : Observable<ProductCategory[]>{
    const url = `${this.categoryUrl}/list`;
    return this.httpClient.get<ProductCategory[]>(url).pipe(tap(data =>{
      // LOGOVANJE
    }));
  }

  addNewProductCategory(productCategory : ProductCategory) : Observable<boolean>{
    const url = `${this.categoryAdminUrl}/new`;
    return this.httpClient.post<boolean>(url , productCategory).pipe(tap(data =>{
      console.log("Added new product category -> " + data);
    }));
  }

  editExistingProductCategory(id : number , productCategory : ProductCategory) : Observable<boolean>{
    const url = `${this.categoryAdminUrl}/${id}/edit`;
    return this.httpClient.put<boolean>(url , productCategory).pipe(tap(data =>{
      console.log("Edited existing product category -> " + data);
    }));
  }

  deleteExistingProductCategory(id : number) : Observable<any>{
    const url = `${this.categoryAdminUrl}/${id}`;
    return this.httpClient.delete<any>(url).pipe(tap(data =>{
      console.log(data);
    }));
  }
}
