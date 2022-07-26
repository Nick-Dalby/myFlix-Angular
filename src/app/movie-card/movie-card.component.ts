import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovieIds: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavs();
  }

  /**
   * gets movies via API call
   * @returns movies object
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);

      return this.movies;
    });
  }

  openSynopsisComponent(description: string) {
    this.dialog.open(SynopsisComponent, {
      data: description,
      width: '400px',
    });
  }

  // all the director/genre data is actually in the 'movies' object
  // but here im showing how the component can go out
  // and get that data for a specific director itself
  // (slower as it needs to make an API call)
  openDirectorComponent(directorName: string) {
    this.dialog.open(DirectorComponent, {
      data: directorName,
      width: '400px',
    });
  }

  openGenreComponent(genreName: string) {
    this.dialog.open(GenreComponent, {
      data: genreName,
      width: '400px',
    });
  }

  /**
   * API call to add favourite movie to favorites array
   * @param movieID 
   * @returns 
   */

  addFavorite(movieID: string) {
    console.log(movieID, 'added to favs');
    this.fetchApiData.addFavMovie(movieID).subscribe((response) => {});
    return this.getUserFavs();
  }

  /**
   * API call to remove favourite movie from favorites array
   * @param movieID 
   * @returns 
   */
  removeFavorite(movieID: string) {
    console.log(movieID, 'removed from favs');
    this.fetchApiData.deleteFavMovie(movieID).subscribe((response) => {});
    return this.getUserFavs();
  }

  /**
   * API call to get favourite movie from favorites array
   */
  getUserFavs() {
    this.fetchApiData.getUser().subscribe((response) => {
      this.favoriteMovieIds = response.FavoriteMovies;
      console.log('favorites: ', this.favoriteMovieIds);
    });
  }

  /**
   * check if movie is included in users favorite movie
   * @param id 
   * @returns 
   */
  isFavorite(id: string): boolean {
    return this.favoriteMovieIds.includes(id);
  }
}
