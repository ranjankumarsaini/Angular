import { Injectable} from '@angular/core';
import { Http, Response, Headers, ResponseContentType, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
//import { Appconstants } from '../app.constant';
import { Router } from '@angular/router';
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
//import swal from 'sweetalert2';
//import * as FileSaver from 'file-saver';

@Injectable()
export class DataService {
fileName:string;
    constructor(private http: Http, private router: Router) { }


    private extractData(res: Response) {
        
        let body;
        if (res.text()) { body = res.json(); }
        // console.log("response from api call======="+JSON.stringify(body));
        return body || {};
    }

    private handleError = (error) => {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Application Error! Please Try Again Later';
        console.error(errMsg);

        //this.spinnerService.hide();
        // tslint:disable-next-line:triple-equals

         if (error.status == 401 || error.status == 403 || error.status == 500) {
        // if (error.status == 40111 || error.status == 40311 || error.status == 50011) {
            if (this.hideAll()) {
                setTimeout(() => {
                    this.router.navigate(['login'], { queryParams: { multiLogin: true } });
                }, 300);
            }


        }

        return Observable.throw(errMsg);
    }

    public request(url: string,
        options?: RequestOptionsArgs): Promise<Response> {
        return this.http.request(url, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public requestGet(url: string, headers?: Headers): Observable<any> {
        // tslint:disable-next-line:triple-equals
        if ((!headers) && (typeof headers != 'undefined')) {
            const optHeader = new Headers({});
            optHeader.append('Content-Type', 'application/json');
            headers = optHeader;
        }


        if (window.localStorage.getItem('bearer')) {
            if (!headers) {
                headers = new Headers({});
            }
            headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('bearer'));
        }
        if (window.localStorage.getItem('userId')) {

            headers.append('COGNITO_USERNAME', window.localStorage.getItem('userId'));
        }
        headers.append('LOGIN_MODE', 'DESKTOP');


        const options = new RequestOptions({ headers: headers });

        return this.http.get(url, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public requestPost(url: string, data: any, headers?: Headers): Observable<any> {
        
        // tslint:disable-next-line:triple-equals
        if ((!headers) && (typeof headers != 'undefined')) {
            const optHeader = new Headers({});
            optHeader.append('Content-Type', 'application/json');
            headers = optHeader;
        }
        const bearerToken = window.localStorage.getItem('bearer');
        const userId = window.localStorage.getItem('UserId');
        const loggedInroleId = window.localStorage.getItem('role');
        const roleName = window.localStorage.getItem('roleName');
        const loggedInUserName = window.localStorage.getItem('AdmLoginName');

        if (bearerToken) {
            if (!headers) {
                headers = new Headers({});
            }
            headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('bearer'));
        }
        if (userId) {
            headers.append('COGNITO_USERNAME', window.localStorage.getItem('UserId'));
        }
        headers.append('LOGIN_MODE', 'DESKTOP');
        if (data) {
            data['loggedInUserId'] = +userId;
            data['loggedInRoleId'] = loggedInroleId;
            data['loggedInRoleName'] = roleName;
            data['loggedInUserName'] = loggedInUserName;
        }
 

        return this.http.post(url, data, { headers: headers }).map(this.extractData).catch(this.handleError);

    }
    public requestPost2(url: string, data: any, headers?: Headers): Observable<any> {


        // tslint:disable-next-line:triple-equals
        if ((!headers) && (typeof headers != 'undefined')) {
            const optHeader = new Headers({});
            optHeader.append('Content-Type', 'application/json');
            headers = optHeader;
        }
        const bearerToken = window.localStorage.getItem('bearer');
        const userId = window.localStorage.getItem('UserId');
        const loggedInroleId = window.localStorage.getItem('role');
        const roleName = window.localStorage.getItem('roleName');
        const loggedInUserName = window.localStorage.getItem('AdmLoginName');

        //console.log('Calling API with Data== ' + JSON.stringify(data));
        if (bearerToken) {
            if (!headers) {
                headers = new Headers({});
            }
            headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('bearer'));
        }
        if (userId) {
            headers.append('COGNITO_USERNAME', window.localStorage.getItem('UserId'));
        }
        headers.append('LOGIN_MODE', 'DESKTOP');
        if (data) {
            data['loggedInUserId'] = +userId;
            data['loggedInRoleId'] = loggedInroleId;
            data['loggedInRoleName'] = roleName;
            data['loggedInUserName'] = loggedInUserName;
        }
        // rohit start

        return this.http.post(url, data, { headers: headers }).map(this.extractData).catch(this.handleError);

    }

    // public requestloginPost(url: string, data: any, headers?: Headers): Observable<any> {

    //     // tslint:disable-next-line:triple-equals
    //     if ((!headers) && (typeof headers != 'undefined')) {
    //         const optHeader = new Headers({});
    //         optHeader.append('Content-Type', 'application/json');
    //         headers = optHeader;
    //     }

    //     const headerss = new Headers({ 'Authorization': 'Bearer ' + Appconstants.LOGIN_BEARER_TOKENTOKEN });
    //     headerss.append('Content-Type', 'application/json');
    //     headerss.append('COGNITO_USERNAME', 'SANJEEV');
    //     headerss.append('LOGIN_MODE', 'DESKTOP');
    //     headerss.append('ADMIN_TYPE', 'superadmin');
    //             const options = new RequestOptions({ headers: headerss });
    //     return this.http.post(url, data, options).map(this.extractData).catch(this.handleError);

    // }

    public requestPut(url: string,
        data: any,
        options?: RequestOptionsArgs): Promise<Response> {
        return this.http.put(url, data, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public requestDelete(url: string): Promise<Response> {
        return this.http.delete(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public unauthorised(): Observable<any> {
        this.router.navigate(['/login']);
        return Observable.throw('Application Error! Please Try Again Later');
    }

    private hideAll(): boolean {
        const openModals = document.querySelectorAll('.modal.in');
        if (openModals) {
            for (let i = 0; i < openModals.length; i++) {
                // Get the modal-header of the modal
                const modalHeader = openModals[i].getElementsByClassName('modal-header');
                if (modalHeader && modalHeader.length > 0) {
                    // Get the close button in the modal header
                    const closeButton: any = modalHeader[0].getElementsByTagName('BUTTON');
                    if (closeButton && closeButton.length > 0) {
                        // simulate click on close button
                        closeButton[0].click();
                    }
                }
            }
        }
        return true;
    }



    // public requestPostParam(url: string, data: any, headers?: Headers): Observable<any> {
    //     const bearerToken = window.localStorage.getItem('bearer');
    //     const userId = window.localStorage.getItem('UserId');
    //     const loggedInroleId = window.localStorage.getItem('role');
    //     const roleName = window.localStorage.getItem('roleName');
    //     const loggedInUserName = window.localStorage.getItem('AdmLoginName');
    //     if (bearerToken) {
    //         if (!headers) {
    //             headers = new Headers({});
    //         }
    //         headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('bearer'));
    //     }
    //     if (userId) {
    //         headers.append('COGNITO_USERNAME', window.localStorage.getItem('UserId'));
    //     }
    //     headers.append('LOGIN_MODE', 'DESKTOP');
    //     if (data) {
    //         data['loggedInUserId'] = +userId;
    //         data['loggedInRoleId'] = loggedInroleId;
    //         data['loggedInRoleName'] = roleName;
    //         data['loggedInUserName'] = loggedInUserName;

    //     }

    //     const mainRequest = this.http.post(url, data, { headers: headers });
    //     if (data[Appconstants.PARAMS_REQ]) {
    //         const paramUrl = Appconstants.API_MASTER_PARAM;
    //         //console.log('Calling requestPostParam with Data== ' + JSON.stringify(data));
    //         const paramRequest = this.http.post(paramUrl, data[Appconstants.PARAMS_REQ], { headers: headers });
    //         return forkJoin([mainRequest, paramRequest]).map((results) => {
    //             const mainData = results[0].json();
    //             const paramData = results[1].json();
    //             // tslint:disable-next-line:triple-equals
    //             if (paramData.serviceResponseCode == Appconstants.SUCCESS_RESPONSE_CODE) {
    //                 if (mainData.data instanceof Array) {
    //                     console.log('array is coming from server');
    //                     const keys = Object.keys(paramData.data);
    //                     keys.forEach((item) => {
    //                         if(mainData.data[0])
    //                         mainData.data[0][item] = paramData.data[item];
    //                     });
    //                 } else {
    //                     console.log('Object is coming from server');
    //                     const keys = Object.keys(paramData.data);
    //                     keys.forEach((item) => {
    //                         mainData.data[item] = paramData.data[item];
    //                     });
    //                 }

    //             }
    //            // console.log('response with master param Data===' + JSON.stringify(mainData));
    //             return mainData;
    //         },
    //             (err) => {
    //                 // tslint:disable-next-line:no-unused-expression
    //                 this.handleError;
    //             }

    //         ).catch(this.handleError);
    //     } else {
    //         console.log('Calling requestPostParam with Data== ' + JSON.stringify(data));
    //         return this.http.post(url, data, { headers: headers }).map(this.extractData).catch(this.handleError);
    //     }

    // }

    public requestPost1(url: string, data: any, headers: Headers): Observable<any> {
        return this.http.post(url, data, { headers: headers }).map(this.extractData).catch(this.handleError);
    }





    public requestPostArrayObject(url: string, data: any, headers?: Headers): Observable<any> {


        // tslint:disable-next-line:triple-equals
        if ((!headers) && (typeof headers != 'undefined')) {
            const optHeader = new Headers({});
            optHeader.append('Content-Type', 'application/json');
            headers = optHeader;
        }
        const bearerToken = window.localStorage.getItem('bearer');
        const userId = window.localStorage.getItem('UserId');
        const loggedInroleId = window.localStorage.getItem('role');
        const roleName = window.localStorage.getItem('roleName');
        const loggedInUserName = window.localStorage.getItem('AdmLoginName');

        // console.log('Calling API with Data== ' + JSON.stringify(data));
        if (bearerToken) {
            if (!headers) {
                headers = new Headers({});
            }
            headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('bearer'));
        }
        if (userId) {
            headers.append('COGNITO_USERNAME', window.localStorage.getItem('UserId'));
        }
        headers.append('LOGIN_MODE', 'DESKTOP');
            if (data instanceof Array) {
                console.log('array is coming from server');
                const keys = Object.keys(data);
                data.forEach((item) => {
                    item['loggedInUserId'] = +userId;
                    item['loggedInRoleId'] = loggedInroleId;
                    item['loggedInRoleName'] = roleName;
                    item['loggedInUserName'] = loggedInUserName;
                });
            } else {
                data['loggedInUserId'] = +userId;
                data['loggedInRoleId'] = loggedInroleId;
                data['loggedInRoleName'] = roleName;
                data['loggedInUserName'] = loggedInUserName;
            }
        // rohit start

        return this.http.post(url, data, { headers: headers }).map(this.extractData).catch(this.handleError);

    }

    // public requestFile1(url): Observable<any> {
    //     this.http.get(url,{responseType:ResponseContentType.Blob})
    //     .catch((err)=>{return []})
    //     .subscribe((res:Response)=>{
    //       var a = document.createElement("a");
    //       a.href = URL.createObjectURL(res.blob());
    //       a.download = "fileName";
    //       // start download
    //       a.click();
    //     })
    //   return null;
    // }


    // downloadFile(url: string, filename: string, data: any, headers?: Headers): Observable<File> {

    // this.fileName=filename;
    //     let headers1 = new Headers({ 'Content-Type': 'application/json', 'MyApp-Application' : 'AppName' });
    //     let options = new RequestOptions({ headers: headers1 });
    //     console.log('from base service: ' + data);
    //     return this.http.post(url, data, options)
    //         .map(this.extractContent)
    //         .catch(this.handleError);
    // }
    // private extractContent(res: any) {
    //   let blob: Blob = new Blob([res._body], { type: 'application/vnd.ms-excel;'});
    //   FileSaver.saveAs(blob,  this.fileName);
    // }

}
