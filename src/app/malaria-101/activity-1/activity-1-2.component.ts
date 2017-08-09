import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SharedDataService } from '../../services/shared.data.service';

@Component({
    selector: 'app-life-cycle',
    templateUrl: './activity-1-2.component.html',
    styleUrls: ['../malaria-101.component.scss']
})
export class MalariaLifeCycleComponent implements OnInit {

    private obs;
    private subscription;
    public activityComplete = false;
    private currArrState = [];
    public solnArr = ['red-blood-cells.png',
                       'character-1.png',
                       'mosquito.png',
                       'mosquito.png',
                       'character-2.png',
                       'plasmodium.png']
    public labelsArr = ['Plasmodium / Virus',
                       'First infected mosquito',
                       'First infected person',
                       'Infected red blood cells',
                       'Second infected mosquito',
                       'Second infected person']

    constructor(private _sharedData: SharedDataService, public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this._sharedData.customAlert('Drag and drop the images in the container to complete the life cycle', '', 'warning');
    }

    /**
     * Utility function used in activity indicator
     * @param {Number} number Number of activities in a stage - 3 (default)
     */
    createRange(number) {
        const items: number[] = [];
        for (let i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData('text', ev.target.id);
        if (this.isInRange(ev.target.parentNode.id)) {
            delete this.currArrState[Number(ev.target.parentNode.id)];
        }
    }

    isInRange(elementId) {
        return elementId > 0 && elementId <= 6;
    }

    drop(ev) {
        ev.preventDefault();
        const data = document.getElementById(ev.dataTransfer.getData('text'));
        const srcParent = data.parentNode;
        const tgt = ev.currentTarget.firstElementChild;

        if (tgt) {
            ev.currentTarget.replaceChild(data, tgt);
            srcParent.appendChild (tgt);
            let firstSrc = ev.currentTarget.firstElementChild.src;
            let secondSrc = tgt.src;
            firstSrc = firstSrc.substr(firstSrc.lastIndexOf('/') + 1);
            secondSrc = secondSrc.substr(secondSrc.lastIndexOf('/') + 1);
            if (this.isInRange(ev.currentTarget.id) && this.isInRange(tgt.parentNode.id)) {
                this.currArrState[Number(ev.currentTarget.id)] = firstSrc;
                this.currArrState[Number(tgt.parentNode.id)] = secondSrc;
            }

        } else {
            ev.currentTarget.appendChild(data);
            let firstSrc = ev.currentTarget.firstElementChild.src;
            firstSrc = firstSrc.substr(firstSrc.lastIndexOf('/') + 1);
            if (this.isInRange(ev.currentTarget.id)) {
                this.currArrState[Number(ev.currentTarget.id)] = firstSrc;
            }
        }

        let isWrongPos = false;
        let arrLength = 0;
        for (let i = 0; i < this.solnArr.length; i++) {
            if (this.currArrState[i + 1] !== undefined) {
                arrLength++;
            }
            if (this.currArrState[i + 1] !== this.solnArr[i]) {
                isWrongPos = true;
            }
        }

        if (!isWrongPos && arrLength === 6) {
            this.activityComplete = true;
            this.toastr.success('Complete!', 'Success!');
        } else if (arrLength === 6) {
            this.toastr.error('The life cycle is incorrect! ', 'Sorry!');
        }
    }
}
