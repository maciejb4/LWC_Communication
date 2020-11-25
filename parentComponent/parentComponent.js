import { LightningElement,track, wire } from 'lwc';
import pubsub from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ParentComponent extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    @track scoreVal = 0;
    @track timerVal = 5;
    @track isChildButtonDisabled = true;

    connectedCallback() {
        pubsub.registerListener('startgameevent', this.startTimer, this);
    }

    handleIncrementScore() {
        this.scoreVal++;
    }

    startTimer() {
        let interval = setInterval(() => {
            this.timerVal--;
            if(this.timerVal === 0) {
                clearInterval(interval);

                const childComponent = this.template.querySelector('c-child-component');
                childComponent.disableButton();

                const evt = new ShowToastEvent({
                    title: 'Congratulations!',
                    message: 'Your score is ' + this.scoreVal,
                    variant: 'success',
                });
                this.dispatchEvent(evt);

                this.timerVal = 5;
                this.scoreVal = 0;
            }
        }, 1000);
    }
}