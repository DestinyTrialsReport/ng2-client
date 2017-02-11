import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAgo' })
export class TimeAgo implements PipeTransform {
  transform(period: string) {
    if (period) {
      var result:string;
      var number:number;
      let value = new Date(period);

      let now = new Date().getTime();
      let delta = (now - value.getTime()) / 1000;

      if (delta < 10) {
        result = 'now';
      } else if (delta < 60) {
        number = Math.floor(delta);
        result = number + ' second' + (number > 1 ? 's' : '') + ' ago';
      } else if (delta < 3600) {
        number = Math.floor(delta / 60);
        result = number + ' minute' + (number > 1 ? 's' : '') + ' ago';
      } else if (delta < 86400) {
        number = Math.floor(delta / 3600);
        result = number + ' hour' + (number > 1 ? 's' : '') + ' ago';
      } else if (delta < 604800) {
        number = Math.floor(delta / 86400);
        result = number + ' day' + (number > 1 ? 's' : '') + ' ago';
      } else {
        number = Math.floor(delta / 604800);
        result = number + ' week' + (number > 1 ? 's' : '') + ' ago';
      }
      return result;
    }
  }
}
