import {
  Component, Input, ChangeDetectionStrategy, trigger, state, style, transition,
  animate, EventEmitter, Output
} from '@angular/core';

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

export class LeaderboardTableComponent {

  @Output() changeWeek:EventEmitter<number> = new EventEmitter<number>();

  @Input() loading: boolean;
  @Input() items: any[];
  @Input() selectedType: any;
  @Input() currentPage: number;
  @Input() leaderboardType: string;
  @Input() selectedIcon: string;
  @Input() leaderboardTitle: string;
  @Input() currentMap: any;
  @Input() previousMap: any;
  @Input() nextMap: any;
  @Input() maxWeek: number;

  itemsPerPage: number = 10;

  constructor() { }

  toWeek(week: number) {
    this.changeWeek.emit(week);
  }

}
