import { Global } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable()

export class ProjectService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    testService() {
        return 'probando el servicio de angular';
    }

    saveProject(project: Project): Observable<any> {
        const params = JSON.stringify(project);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save-project', params, { headers: headers });
    }

    getProjects(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'projects', {headers: headers});
    }

    getProject(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'project/' + id, {headers: headers});
    }
}
