import { LightningElement, wire, track } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import MOVIE_CHANNEL from '@salesforce/messageChannel/MovieMessageChannel__c';

export default class MovieDetail extends LightningElement {
    @track moviedetails = {};  // Make this reactive
    @track loadComponent = false;  // Make this reactive
    subscription = null;
    
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                MOVIE_CHANNEL,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    handleMessage(message) {
        let movieId = message.movieId;
        console.log("movieId", movieId);
        this.fetchMovieDetail(movieId);
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    async fetchMovieDetail(movieId) {
        let url = `https://www.omdbapi.com/?i=${movieId}&plot=full&apikey=f98cbae2`;
        const res = await fetch(url);
        const data = await res.json();
        console.log("Movie Details", data);
        this.loadComponent = true;
        this.moviedetails = data;
    }
}
