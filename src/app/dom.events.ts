import {DOCUMENT} from "@angular/platform-browser";
import {Inject} from "@angular/core";
import {Injectable} from "@angular/core";

@Injectable()
export class DOMEvents {

  private doc: Document;

  constructor(@Inject(DOCUMENT) doc: any) {

    this.doc = doc;

  }

  public triggerOnDocument(eventType: string): Event {

    return ( this.triggerOnElement(this.doc, eventType) );

  }

  public triggerOnElement(nativeElement: any,
                          eventType: string,
                          bubbles: boolean = true,
                          cancelable: boolean = false): Event {

    var customEvent = this.createEvent(eventType, bubbles, cancelable);

    nativeElement.dispatchEvent(customEvent);

    return ( customEvent );

  }

  private createEvent(eventType: string,
                      bubbles: boolean,
                      cancelable: boolean): Event {

    try {

      var customEvent: any = new CustomEvent(
        eventType,
        {
          bubbles: bubbles,
          cancelable: cancelable
        }
      );

    } catch (error) {

      var customEvent: any = this.doc.createEvent("CustomEvent");

      customEvent.initCustomEvent(eventType, bubbles, cancelable);

    }

    return ( customEvent );

  }

}
