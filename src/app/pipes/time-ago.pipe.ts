import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAgo' })
export class TimeAgo implements PipeTransform {
  transform(period: string) {
    if (period) {
      var result:string;
      let value = new Date(period);

      let now = new Date().getTime();
      let delta = (now - value.getTime()) / 1000;

      if (delta < 10) {
        result = 'now';
      } else if (delta < 60) {
        result = Math.floor(delta) + ' Seconds Ago';
      } else if (delta < 3600) {
        result = Math.floor(delta / 60) + ' Minutes Ago';
      } else if (delta < 86400) {
        result = Math.floor(delta / 3600) + ' Hours Ago';
      } else {
        result = Math.floor(delta / 86400) + ' Days Ago';
      }
      return result;
    }
  }
}
