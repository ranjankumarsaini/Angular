import { Injectable } from '@angular/core';
import { DataService } from '../shared/service.helper';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BaseService {
  constructor(private requestHelperService: DataService) {

   }
  search(url: any, data: any) {
      console.log('from base service' + url);
      console.log('from base service' + JSON.stringify(data));
      const headers = new Headers({});
      headers.append('Content-Type', 'application/json');
     // headers.append('responseType', 'arraybuffer');
      return this.requestHelperService.requestPost(url, data, headers).map(this.sendDataToComponent).catch(this.sendErrorToCompnent);
  }

//   searchValue(url: any) {
//     console.log('from base service' + url);
//     const headers = new Headers({});
//     headers.append('Content-Type', 'application/json');
//     return this.requestHelperService.requestGet(url, headers).map(this.sendDataToComponent).catch(this.sendErrorToCompnent);
// }

//   create(url: any, data: any) {
//     console.log('from base service' + url);
//     console.log('from base service' + data);
//     const headers = new Headers({});
//     headers.append('Content-Type', 'application/json');
//     return this.requestHelperService.requestPostParam(url, data, headers).map(this.sendDataToComponent).catch(this.sendErrorToCompnent);
//   }

//   createForgetMe(url: any, data: any) {
//     console.log('from base service' + url);
//     console.log('from base service' + data);
//     const headers = new Headers({});
//     headers.append('Content-Type', 'application/json');
//     // tslint:disable-next-line:max-line-length
//     return this.requestHelperService.requestPostArrayObject(url, data, headers).map(this.sendDataToComponent).catch(this.sendErrorToCompnent);
//   }

//   createFile(url: any, data: any) {
//     console.log('from base service' + url);
//     console.log('from base service' + data);
//     const headers = new Headers({});
//     // headers.append('Content-Type', 'application/json');
//     return this.requestHelperService.requestPostParam(url, data, headers).map(this.sendDataToComponent).catch(this.sendErrorToCompnent);
//   }

   private sendDataToComponent(res: Response) {
        return res || [];
    }
  private sendErrorToCompnent(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
  //   search1(url: any, data: any) {
  //     console.log('from base service' + url);
  //     console.log('from base service' + data);
  //     const headers = new Headers({});
  //     headers.append('Content-Type', 'application/json');
  //     return this.requestHelperService.requestPost2(url, data, headers).map(this.sendDataToComponent).catch(this.sendErrorToCompnent);
  // }

  // searchNew(url: any, data: any) {
  //   console.log('from base service: ' + url);
  //   console.log('from base service: ' + data);
  //   const headers = new Headers({});
  //   headers.append('Content-Type', 'application/json');
  //   return this.requestHelperService.requestPostParam(url,data, headers).map(this.sendDataToComponent).catch(this.sendErrorToCompnent);
  // }

  // downloadFile(url: any, data: any,filename:string){
  //   const headers = new Headers({});
  //   headers.append('Content-Type', 'application/json');
  //   console.log('from base service: ' + data);
  //   return this.requestHelperService.downloadFile(url, filename, data, headers);
  // }


}
