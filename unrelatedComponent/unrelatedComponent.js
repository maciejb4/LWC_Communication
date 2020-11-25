import { LightningElement, wire } from 'lwc';
import pubsub from 'c/pubsub' ;
import { CurrentPageReference } from 'lightning/navigation';

export default class UnrelatedComponent extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    startGame() {
        pubsub.fireEvent(this.pageRef, 'startgameevent');
    }
}