import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IModel {
  id: number;
  year: number;
  make: string;
  model: string;
}

@Component({
  selector: 'app-models-component',
  templateUrl: './models-component.component.html',
  styleUrls: ['./models-component.component.css']
})
export class ModelsComponentComponent implements OnInit {
  displayedColumns: string[] = ['make', 'model', 'year'];

  makes: string[];
  years: number[];
  models: IModel[];

  curMake: string = "none";
  curYear: string = "none";
  curOffset: number = 0;

  previousDisabled: boolean = true;
  nextDisabled: boolean = false;

  constructor(private http: HttpClient) {
    this.loadMakes();
    this.loadYears();
  }

  ngOnInit() {
  }

  refreshList() {
    this.curOffset = 0;
    this.previousDisabled = true;
    this.loadModels();
  }

  async showPrevious() {
    if (this.curOffset > 0){
      this.curOffset -= 10;
      await this.loadModels();
    }
    if (this.curOffset === 0) {
      this.previousDisabled = true;
    }
  }

  async showNext() {
    this.curOffset += 10;
    this.previousDisabled = false;
    await this.loadModels();
  }

  async loadMakes() {
    this.makes = await this.http.get<string[]>('https://vehicle-data.azurewebsites.net/api/makes').toPromise();
  }

  async loadYears() {
    this.years = await this.http.get<number[]>('https://vehicle-data.azurewebsites.net/api/years').toPromise();
  }

  async loadModels() {
    if (this.curMake === "none" && this.curYear === "none") {
      this.models = await this.http.get<IModel[]>(`https://vehicle-data.azurewebsites.net/api/models?offset=${this.curOffset}&fetch=${11}`).toPromise();
    } else if (this.curMake === "none" && this.curYear !== "none") {
      this.models = await this.http.get<IModel[]>(`https://vehicle-data.azurewebsites.net/api/models?year=${this.curYear}&offset=${this.curOffset}&fetch=${11}`).toPromise();
    } else if (this.curMake !== "none" && this.curYear === "none") {
      this.models = await this.http.get<IModel[]>(`https://vehicle-data.azurewebsites.net/api/models?make=${this.curMake}&offset=${this.curOffset}&fetch=${11}`).toPromise();
    } else {
      this.models = await this.http.get<IModel[]>(`https://vehicle-data.azurewebsites.net/api/models?year=${this.curYear}&make=${this.curMake}&offset=${this.curOffset}&fetch=${11}`).toPromise();
    }
    if (this.models.length === 11){
      this.nextDisabled = false;
      this.models.pop();
    } else {
      this.nextDisabled = true;
    }
  }
}
