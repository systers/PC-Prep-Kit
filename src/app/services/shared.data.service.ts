import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedDataService {

    public position: Subject<string> = new BehaviorSubject<string>('col-md-10 col-md-offset-2');
    private _togglePosition = 'col-md-10 col-md-offset-2';
    constructor() {
    }
    /**
     * Toggle navbar
     */
    toggle() {
        this._togglePosition  = (this._togglePosition === 'col-md-10 col-md-offset-2') ? 'col-md-12' : 'col-md-10 col-md-offset-2';
        this.position.next(this._togglePosition);
    }
}
