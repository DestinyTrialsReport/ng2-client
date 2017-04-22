import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'menu-search',
  // host: {
  //   'class': 'search'
  // },
  template: `
    <div class="search">
      <div class="search__player search__player--main">
        <div class="row middle-xs">
          <div class="col-xs">
            <input type="text" class="form-control" [(ngModel)]="searchedName"
                   autocorrect="off" autocomplete="off" spellcheck="false"
                   [placeholder]="player1 || 'Enter gamertag'"
                   (keyup.enter)="searchPlayer(searchedName, 1)">
          </div>
          <div class="col-xs-shrink row row--no-gutter">
            <div class="col-xs">
              <button class="btn btn--icon btn--ghost" type="button">
                <i class="material-icons">&#xE86A;</i>
              </button>
            </div>
            <div class="col-xs">
              <button class="btn btn--icon btn--ghost"
                      type="submit"
                      (click)="searchPlayer(searchedName, 1)">
                <i class="material-icons">&#xE163;</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO: Can we make sure these pop-up a bit earlier? -->
      <div class="search__player" *ngIf="player2">
        <div class="row middle-xs">
          <div class="col-xs">
            <input type="text" class="form-control" [(ngModel)]="searchedTeammate1"
                   autocorrect="off" autocomplete="off" spellcheck="false"
                   [placeholder]="player2 || 'Enter gamertag'"
                   (keyup.enter)="searchPlayer(searchedTeammate1, 2)">
          </div>
          <div class="col-xs-shrink">
            <button class="btn btn--icon btn--ghost"
                    type="submit"
                    (click)="searchPlayer(searchedTeammate1, 2)">
              <i class="material-icons">&#xE163;</i>
            </button>
          </div>
        </div>
      </div>
      <div class="search__player" *ngIf="player3">
        <div class="row middle-xs">
          <div class="col-xs">
            <input type="text" class="form-control" [(ngModel)]="searchedTeammate2"
                   autocorrect="off" autocomplete="off" spellcheck="false"
                   [placeholder]="player3 || 'Enter gamertag'"
                   (keyup.enter)="searchPlayer(searchedTeammate2, 3)">
          </div>
          <div class="col-xs-shrink">
            <button class="btn btn--icon btn--ghost"
                    type="submit"
                    (click)="searchPlayer(searchedTeammate2, 3)">
              <i class="material-icons">&#xE163;</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./menu.component.css'],
})

export class MenuSearchComponent {
  @Output() search:EventEmitter<[number, string, number]> = new EventEmitter<[number, string, number]>();

  @Input() player1: string;
  @Input() player2: string;
  @Input() player3: string;
  @Input() isXbox: boolean;

  searchedName: string;
  searchedTeammate1: string;
  searchedTeammate2: string;

  searchPlayer(name: string, playerIndex: number) {
    if (name) {
      let platform = this.isXbox ? 1 : 2;
      this.search.emit([platform, name, playerIndex]);
      this.searchedName = null;
      this.searchedTeammate1 = null;
      this.searchedTeammate2 = null;
    }
  }
}
