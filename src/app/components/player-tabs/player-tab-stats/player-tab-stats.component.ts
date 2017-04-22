import { Component, Input } from '@angular/core';
import { BNGStats } from "../../../models/stats.model";

@Component({
  selector: 'player-tab-stats',
  templateUrl: './player-tab-stats.component.html',
  styleUrls: ['./player-tab-stats.component.css']
})

export class PlayerTabStatsComponent {
  weaponKills: string[] = [
    'weaponKillsHandCannon',
    'weaponKillsPulseRifle',
    'weaponKillsScoutRifle',
    'weaponKillsAutoRifle',
    'weaponKillsSniper',
    'weaponKillsShotgun',
    'weaponKillsFusionRifle',
    'weaponKillsSideArm',
    'weaponKillsRocketLauncher',
    'weaponKillsMachinegun',
    'weaponKillsSword'
  ];

  @Input() stats: BNGStats;

  keyToWeaponIcon(key) {
    if (!key) return;
    let weaponType = key.slice(11);
    let weaponTypeIcon = '';

    switch (key) {
      case 'weaponKillsMachinegun':
        weaponTypeIcon = 'machine-gun';
        break;
      case 'weaponKillsSniper':
        weaponTypeIcon = 'sniper-rifle';
        break;
      case 'weaponKillsSideArm':
        weaponTypeIcon = 'sidearm';
        break;
      default:
        weaponTypeIcon = weaponType.charAt(0).toLowerCase() + weaponType.slice(1).replace(/[A-Z]/, (match) => { return '-' + match.toLowerCase()});
        break;
    }

    return '/assets/img/weapon-icons/' + weaponTypeIcon + '.svg';
  }
}
