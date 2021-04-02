import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductCatalogCategory } from '../models/ProductCatalogCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogCategoryService {

  private catalogCategoryUrl = `http://localhost:8080/api/productCatalogCategory`;
  private catalogCategoryAdminurl = `http://localhost:8080/api/admin/productCatalogCategory`

  constructor(private httpClient : HttpClient) { }

  getOneProductCatalogCategory(id : number) : Observable<ProductCatalogCategory>{
    const url = `${this.catalogCategoryUrl}/${id}`;
    return this.httpClient.get<ProductCatalogCategory>(url).pipe(tap(data =>{
      // LOGOVANJE
    }));
  }

  getAllProductCatalogCategories() : Observable<ProductCatalogCategory[]>{
    const url = `${this.catalogCategoryUrl}/list`;
    return this.httpClient.get<ProductCatalogCategory[]>(url).pipe(tap(data =>{
      // LOGOVANJE
    }));
  }

  addNewProductCatalogCategory(productCatalogCategory : ProductCatalogCategory) : Observable<ProductCatalogCategory>{
    const url = `${this.catalogCategoryAdminurl}/new`;
    return this.httpClient.post<ProductCatalogCategory>(url , productCatalogCategory).pipe(tap(data =>{
      // LOGOVANJE
    }));
  }

  editExistingProductCatalogCategory(id : number ,productCatalogCategory : ProductCatalogCategory ) : Observable<ProductCatalogCategory>{
    const url = `${this.catalogCategoryAdminurl}/${id}/edit`;
    return this.httpClient.put<ProductCatalogCategory>(url , productCatalogCategory).pipe(tap(data =>{
      // LOGOVANJE
    }));
  }

  deleteExistingProductCatalogCategory(id : number) : Observable<any>{
    const url = `${this.catalogCategoryAdminurl}/${id}`;
    return this.httpClient.delete<any>(url).pipe(tap (data => {
      console.log(data);
    }));
  }
}
