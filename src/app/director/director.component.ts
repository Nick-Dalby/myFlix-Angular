import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css'],
})
export class DirectorComponent implements OnInit {
  director: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public directorName: string
  ) {}

  ngOnInit(): void {
    this.getDirectorInfo()
    
  }

  /**
   * API call to get director data
   */

  getDirectorInfo(): void {
    this.fetchApiData
      .getDirector(this.directorName)
      .subscribe((response: any) => {
        
        this.director = response
        
        return this.director
      });
  }
}
