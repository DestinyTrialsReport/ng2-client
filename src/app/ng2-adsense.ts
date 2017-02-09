import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  NgModule,
  ModuleWithProviders,
  OpaqueToken, OnDestroy,
} from '@angular/core';

export class AdsenseConfig {
  adClient?: string;
  adSlot?: string | number;
  constructor(config: AdsenseConfig = {adClient:'', adSlot: ''}) {
    this.adClient = config.adClient || this.adClient;
    this.adSlot = config.adSlot || this.adSlot;
  }
}

@Component({
  selector: 'ng2-adsense',
  template: `
  <div>
    <ins class="adsbygoogle"
      style="display:inline-block;width:336px;height:280px"
      [attr.data-ad-client]="adClient"
      [attr.data-ad-slot]="adSlot"
      [attr.data-ad-region]="adRegion">
    </ins>
  </div>
  `,
})

export class AdsenseComponent implements OnInit, AfterViewInit {
  @Input() adClient: string;
  @Input() adSlot: string | number;
  @Input() adFormat = 'auto';
  @Input() adRegion = 'page-' + Math.floor(Math.random() * 10000) + 1;
  constructor(private config: AdsenseConfig) { }
  ngOnInit() {
    if (!this.adClient && this.config.adClient) {
      this.adClient = this.config.adClient;
    }
    if (!this.adSlot && this.config.adSlot) {
      this.adSlot = this.config.adSlot;
    }
  }

  ngAfterViewInit() {
    // attempts to push the ad twice. Usually if one doesn't work the other
    // will depeding on if the browser has the adsense code cached
    const res = this.push();
    if (res instanceof TypeError) {
      console.log(res);
      setTimeout(() => this.push(), 200);
    }
  }

  push() {
    try {
      const adsbygoogle = window['adsbygoogle'];
      adsbygoogle.push({});
      return true;
    } catch (e) {
      return e;
    }
  }
}

export const ADSENSE_CONFIG = new OpaqueToken('AdsenseConfig');

export function provideAdsenseConfig(config: AdsenseConfig) {
  return new AdsenseConfig(config);
}

@NgModule({
  exports: [AdsenseComponent],
  declarations: [AdsenseComponent],
})
export class AdsenseModule {
  static forRoot(config?: AdsenseConfig): ModuleWithProviders {
    return {
      ngModule: AdsenseModule,
      providers: [
        { provide: ADSENSE_CONFIG, useValue: config },
        { provide: AdsenseConfig, useFactory: provideAdsenseConfig, deps: [ADSENSE_CONFIG] },
      ]
    };
  }
}
