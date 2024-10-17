import { LightningElement , wire } from 'lwc';
// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import MOVIE_CHANNEL from '@salesforce/messageChannel/MovieMessageChannel__c';
const DELAY = 300;

export default class MovieSearch extends LightningElement {
    selectedType = "";
    selectedSearch = "";
    loading = false;
    selectedPageNo = "1";
    delayTimeout;
    searchResult = [];
    selectedMovie = "";
    @wire(MessageContext)
    messageContext;
    get typeOptions() {
        return [
            { label: 'None', value: '' },
            { label: 'Movie', value: 'movie' },
            { label: 'Series', value: 'series' },
            { label: 'Episode', value: 'episode' },
        ];
    }

    handleChange(event) {
        let { name, value } = event.target;
        this.loading = true;

        console.log(`Field changed: ${name}, New value: ${value}`);

        if (name === "type") {
            this.selectedType = value;
        } else if (name === "search") {
            this.selectedSearch = value;
        } else if (name === "pageno") {
            this.selectedPageNo = value;
        }

        clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            this.searchMovie();
        }, DELAY);
    }

    async searchMovie() {
        // Check if selectedSearch has a value to avoid calling the API with an empty search term
        if (!this.selectedSearch) {
            console.log("Search term is empty. Not calling the API.");
            this.loading = false;
            return;
        }

        const url = `https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&page=${this.selectedPageNo}&apikey=f98cbae2`;
        console.log(`Fetching data from URL: ${url}`);

        try {
            const res = await fetch(url);
            const data = await res.json();

            console.log("API Response: ", data);

            this.loading = false;

            if (data.Response === "True") {
                this.searchResult = data.Search;
                console.log("Search Results: ", this.searchResult);
            } else {
                console.log("Error from API: ", data.Error);
                this.searchResult = [];
            }
        } catch (error) {
            console.error("Error fetching movie data: ", error);
            this.loading = false;
        }
    }

    movieSelectedHandler(event){
        this.selectedMovie = event.detail;

        const payload = { movieId: this.selectedMovie };
        publish(this.messageContext, MOVIE_CHANNEL, payload);
    }

    get displayMovieSearchResult(){
        if(this.searchResult.length > 0){
            return true;
         } else {
            return false;
         }
    }
}