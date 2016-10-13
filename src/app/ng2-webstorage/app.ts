import {NgModule} from '@angular/core';
import {LocalStorageService, SessionStorageService} from './services/index';

export * from './interfaces/index';
export * from './helpers/keyStorage';
export * from './decorators/index';
export * from './services/webStorage';
export * from './services/localStorage';
export * from './services/sessionStorage';


@NgModule({
	declarations: [],
	providers: [SessionStorageService, LocalStorageService],
	imports: []
})
export class Ng2Webstorage {
}
