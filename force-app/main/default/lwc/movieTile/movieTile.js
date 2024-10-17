import { LightningElement, api } from 'lwc';

export default class MovieTile extends LightningElement {
    @api movie;
    @api selectedMovieId;

    clickHandler(event) {
        // Null/undefined check for movie object
        if (!this.movie || !this.movie.imdbID) {
            console.error("Movie or IMDb ID is undefined");
            return;
        }

        console.log("this is imdbID from child ", this.movie.imdbID);

        // Custom event dispatch
        const evt = new CustomEvent("selectedmovie", {
            detail: this.movie.imdbID
        });

        // Dispatch the event
        this.dispatchEvent(evt);
    }

    get tileSelected() {
        // Ensure movie object is defined before accessing imdbID
        return this.movie && this.selectedMovieId === this.movie.imdbID ? "selected" : "tile";
    }
}