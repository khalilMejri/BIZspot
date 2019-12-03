import { Injectable } from '@angular/core';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  location: Location;
  
  constructor() { }

  findLocation(address: string) {
    
  }
}
