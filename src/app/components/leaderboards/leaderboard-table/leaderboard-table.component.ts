import {
  Component, Input, ChangeDetectionStrategy, trigger, state, style, transition,
  animate, EventEmitter, Output, OnInit
} from '@angular/core';
import {SelectedLeaderboardItems} from "../../../models/leaderboard.model";

@Component({
  selector: 'leaderboard-table',
  animations: [
    trigger('loading', [
      state('void', style({ opacity: 0 })),
      state('false', style({ opacity: 1 })),
      state('true', style({ opacity: 0 })),
      transition('true => *', animate('200ms ease-in-out, opacity linear')),
      transition('false => *', animate('200ms ease-out-in, opacity linear'))
    ])
  ],
  styleUrls: ['../leaderboards.component.css'],
  templateUrl: './leaderboard-table.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeaderboardTableComponent implements OnInit {

  @Output() changeWeek:EventEmitter<number> = new EventEmitter<number>();

  @Input() loading: boolean;
  @Input() items: any[];
  @Input() leaderboardTitle: string;
  @Input() selected: SelectedLeaderboardItems;
  @Input() map: any;
  @Input() maxWeek: number;

  itemsPerPage: number = 10;
  pageParams: any;
  tableMetric: string;
  tableHeader: string;
  // hasPlatform: boolean;

  constructor() { }

  ngOnInit() {
    this.pageParams = { itemsPerPage: this.itemsPerPage, currentPage: this.selected.page };
    this.tableMetric = this.selected.leaderboard === 'medals' ? 'Count' : 'Kills';
    // this.hasPlatform = ((this.selected.leaderboard !== 'weapons' && this.selected.leaderboard !== 'searched')) && !this.loading;
    this.tableHeader = this.selected.leaderboard === 'weapons' ? 'Weapon' : 'Player';
  }

  toWeek(week: number) {
    this.changeWeek.emit(week);
  }

  hasPlatform(board: string, loading: boolean) {
    return ((board !== 'weapons' && board !== 'searched')) && !loading;
  }

  getDescription(map: any) {
    if (map) {
      return `TRIALS WEEK ${map.weekInYear} - ${map.year}  - ${map.name}`;
    }
  }

  getItemUrl(item: any) {
    let itemId = item.itemHash || item.id;
    let board = itemId ? 'players' : 'weapons';
    let platform = item.platform == 1 ? 'xbox' : 'ps';
    return `/${(item.platform ? platform : board)}/${(itemId || item.name)}`;
  }
}
