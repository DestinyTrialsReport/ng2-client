import { Pipe, PipeTransform } from '@angular/core';
import {Activity} from "../models/activity.model";

@Pipe({ name: 'streak' })
export class StreakPipe implements PipeTransform {
  transform(activities: Activity[]) {
    if (activities && activities[0] && activities[0].activityDetails) {
      let streak:number = 0;
      let recent:Activity = activities[0];
      for (let a in activities) {
        if (recent.values.standing.basic.value == activities[a].values.standing.basic.value) {
          streak++;
        } else {
          break;
        }
      }
      return streak;
    }
  }
}

@Pipe({ name: 'streakIcon' })
export class StreakIconPipe implements PipeTransform {
  transform(activities: Activity[]) {
    if (activities && activities[0]) {
      let css:string = 'match--win';
      if (activities[0].values.standing.basic.value !== 0) {
        css = 'match--loss';
      }
      return css;
    }
  }
}

