import { Component, OnInit } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 15,
    min: 8
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

@Component({
  selector: 'app-about-component',
  templateUrl: './about-component.component.html',
  styleUrls: ['./about-component.component.css']
})
export class AboutComponentComponent implements OnInit {
  aboutText = '';

  constructor() {
    lorem.format = 'html';
    this.aboutText += lorem.generateParagraphs(5);
  }

  ngOnInit() {}

}
