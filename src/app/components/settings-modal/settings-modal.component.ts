import {Component, Input, ViewChild, OnInit} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import {Subscription, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot            from '../../reducers';
import * as settingsActions     from '../../actions/settings.actions';

@Component({
  selector: 'settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css']
})

export class SettingsModalComponent implements OnInit {
  @Input() settings: any;
  @ViewChild('childModal') public childModal:ModalDirective;
  settings$: Observable<any>;
  settingSubscription$: Subscription;
  customizeSettings: any;

  equippedSettings: any = [
    {label: "Equipped weapons"},
    {label: "Equipped armor"},
    {label: "Armor stats"},
    {label: "Character perks"}
  ];

  constructor(private store: Store<fromRoot.State>) {
    this.settings$ = store
      .select(fromRoot.getStatsSettings)
      .distinctUntilChanged()
      .share();
  }

  ngOnInit(){
    this.settingSubscription$ = this.settings$.subscribe(settings => {
      this.customizeSettings = [
        {label: "Kill/Death ratio", description: "Including the chart from latest matches", active: settings.kd, name: 'kd'},
        {label: "Main stats", description: "Win percentage, win streak, ELO-rating and lighthouse visits", active: settings.overview, name: 'overview'},
        {label: "Weekly stats", description: "Stats for this week only", active: settings.weeklyStats, name: 'weeklyStats'},
        {label: "Weekly weapons", description: "Weapon usage for this week only", active: settings.weeklyWeapons, name: 'weeklyWeapons'},
        {label: "Map based stats", description: "Stats for the current map only", active: settings.mapStats, name: 'mapStats'},
        {label: "Map based weapons", description: "Weapon usage for the current map only", active: settings.mapWeapons, name: 'mapWeapons'},
        {label: "Last Matches tab", description: "An overview of the character's last three Trials matches", active: settings.lastMatchesTab, name: 'lastMatchesTab'},
        {label: "Stats tab", description: "Character data from the beginning of time", active: settings.statsTab, name: 'statsTab'},
        {label: "Equipped tab", description: "Current character loadout", active: settings.equippedTab, name: 'equippedTab'}
      ];
    });
  }

  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }

  toggleSettings(name: string, event: boolean) {
    this.store.dispatch(new settingsActions.ToggleSettingsAction({name: name, value: event}));
  }
}
