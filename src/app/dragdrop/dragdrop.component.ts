import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { InfokitService } from '../services/infokit.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-dragdrop',
    templateUrl: './dragdrop.component.html',
    styleUrls: ['./dragdrop.component.css']
})
export class DragdropComponent {
    public position= 'col-md-10 col-md-offset-2 introbody';
    dosAndDonts: { description: String, value: String }[] = [
      { description: 'Contaminated water around should be disposed.', value: 'do' },
      { description: 'Play outdoors in shorts and half/without sleeves clothes.', value: 'dont' },
      { description: 'Use mosquito repellent', value: 'do' },
      { description: 'Body should be covered as much as possible', value: 'do' },
      { description: 'travel to malaria spread region during pregnancy.', value: 'dont' },
      { description: 'eat digestible and light foods during malaria fever.', value: 'do' },
      { description: 'Ensure hygiene', value: 'do' },
      { description: 'unscreened doors and windows Open.', value: 'dont' },
      { description: 'Herbal fumigation', value: 'do' },
      { description: 'contaminated blood transfusion', value: 'dont' }
    ];
    do: { description: String, value: String }[]  = [];
    dont: { description: String, value: String }[]  = [];
    box1Integer = 'do';
    box2Integer = 'dont';

    box1Items: { description: String, value: String }[] = [];
    box2Items: { description: String, value: String }[] = [];

    allowDropFunction(value: String): any {
        return (dragData: any) => dragData.value === value;
    }

    addTobox1Items($event: any) {
        this.box1Items.push($event.dragData);
        this.dosAndDonts.splice(this.dosAndDonts.indexOf($event.dragData), 1);
        if (!this.dosAndDonts.length) {
            this.onComplete();
        }
    }

    addTobox2Items($event: any) {
        this.box2Items.push($event.dragData);
        this.dosAndDonts.splice(this.dosAndDonts.indexOf($event.dragData), 1);
        if (!this.dosAndDonts.length) {
            this.onComplete();
        }
    }



    toggle() {
        this.position = (this.position === 'col-md-10 col-md-offset-2') ? 'col-md-12' : 'col-md-10 col-md-offset-2';
    }

    onComplete() {
        this.toastr.success('Complete ! ', 'Success!');
        this._infokitService.activateinfokit('do_dont').subscribe(res => {});
    }

    constructor(private _infokitService: InfokitService, public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

}
