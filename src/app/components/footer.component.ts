import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[footer]',
  template: `
    <div class="row">
      <div class="col-xs-12 player__links__btns">
        <a [href]=""
        type="button" target="_blank" class="btn btn-default">
          <img src="/assets/img/ggg-logo.png" alt="Guardian.gg">
        </a>
        <a [href]=""
        type="button" target="_blank" class="btn btn-default">
          myTrialsReport
        </a>
      <!--<a ng-href="https://trials.report/{{player.membershipType === 2 ? 'ps' : 'xbox'}}/{{player.name}}"-->
      <!--type="button" target="_blank" class="btn btn-default" ng-if="subdomain"-->
      <!--analytics-on analytics-event="Click" analytics-category="DestinyTrialsReport">-->
      <!--DestinyTrialsReport-->
      <!--</a>-->
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FooterComponent {

}
