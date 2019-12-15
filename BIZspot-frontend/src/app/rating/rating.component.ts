import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() rating:Number=3
  @Input() inpustName:String="test"
  @Input() static:boolean=false
  @Output() rateChanged: EventEmitter<Number> = new EventEmitter()
  constructor() { }

  ngOnInit() {
    console.log(this.static)
  } 
  onClick(rate:Number){
    if(!this.static){

      this.rating = rate;
      this.rateChanged.emit(this.rating);
    }

  }
}
