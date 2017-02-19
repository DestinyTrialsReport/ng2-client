import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rank' })
export class LeaderboardRank implements PipeTransform {
  transform(itemRank: any, index: number, page:number, itemsPerPage: number) {
    let rank = itemRank;
    if (!itemRank) {
      rank = (index + (itemsPerPage * (page - 1))) + 1
    }
    return rank;
  }
}
