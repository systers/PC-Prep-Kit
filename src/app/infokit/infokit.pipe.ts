import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'infokitPipe'
})

export class InfokitPipe implements PipeTransform {
    transform(dict: any[], args: any= []) {
        let activity: any[] = [];
        Object.keys(dict).forEach(key => {
            activity.push({key: key, def: dict[key].def, val: dict[key].value});
        });
        return activity;
    }
}
