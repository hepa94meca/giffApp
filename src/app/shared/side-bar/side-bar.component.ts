import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  get historial(){
    return this.gifService.historial
  }

  constructor(private gifService:GifsService){}

  public rechargePage=(item:string):void=>{

    this.gifService.getDataGiphy(item)
  }

}
