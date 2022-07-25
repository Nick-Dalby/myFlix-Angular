import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genre: any = {}

  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public genreName: string) { }

  ngOnInit(): void {
    this.getGenreInfo()
  }

  getGenreInfo(): void {
    this.fetchApiData
      .getGenre(this.genreName)
      .subscribe((response: any) => {
        this.genre = response

        return this.genre
      })
  }


}
