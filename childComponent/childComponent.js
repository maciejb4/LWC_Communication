import { LightningElement, api, wire } from 'lwc';
import pubsub from 'c/pubsub' ;
import { CurrentPageReference } from 'lightning/navigation';

export default class ChildComponent extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        pubsub.registerListener('startgameevent', this.enableButton, this);
    }

    @api isDisabled;

    incrementScore() {
        const incrementScoreEvent = new CustomEvent("incrementscoreevent", {

        });
        this.dispatchEvent(incrementScoreEvent);
    }

    @api
    disableButton() {
        this.isDisabled = true;
    }

    enableButton() {
        this.isDisabled = false;
    }
}