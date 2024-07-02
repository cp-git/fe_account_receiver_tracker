import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationServiceService {

  private paginationState = {
    pageIndex: 0,
    pageSize: 10
  };

  setPaginationState(pageIndex: number, pageSize: number): void {
    this.paginationState.pageIndex = pageIndex;
    this.paginationState.pageSize = pageSize;
  }

  getPaginationState(): { pageIndex: number, pageSize: number } {
    return this.paginationState;
  }
}
