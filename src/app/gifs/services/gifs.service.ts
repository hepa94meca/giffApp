import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string []=[]
  public resultados: Gif[]=[]
  private serviceUrl:string="http://api.giphy.com/v1/gifs"
  private apiGiphyKey:string ="Ci16orSvsWFlN2rMR5FvjXbbZ2GHUZB1"

  get historial(){
    return [...this._historial];
  }

  constructor (private http:HttpClient){
    this.getHistoryLocalStorage()
    this.getResulatdosLocalStorage()
  }


  public buscarGifs(query:string):void{

    query=query.trim().toLowerCase()
    if(!this.gifValidation(query)) return 
    this._historial.unshift(query);
    this.stayJustWithTheFirtsElements(10);

    this.getDataGiphy(query)
  }

  

  private getHistoryLocalStorage():void{
    const str = localStorage.getItem("historial")
    if(str){
      this._historial=JSON.parse(str)
    }
  }

  private getResulatdosLocalStorage():void{
    const str = localStorage.getItem("resultados")
    if(str){
      this.resultados=JSON.parse(str)
    }
  }

  private gifValidation(query:string):boolean{

    const exists=this._historial.find(gif=>gif===query)
    const thereIsText=!!query.trim()

    if(exists) return false
    return thereIsText
  }

  private stayJustWithTheFirtsElements=(limit:number):void=>{
    this._historial=this._historial.splice(0,limit)
  }

  public getDataGiphy=(query:string):void=>{
    const params=new HttpParams()
    .set("api_key",this.apiGiphyKey)
    .set("q",query)
    .set("limit","10")


    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`,{params}).subscribe((resp)=>{
      this.resultados=resp.data
      localStorage.setItem("resultados",JSON.stringify(resp.data));
    })
    localStorage.setItem("historial",JSON.stringify(this._historial));
  }

  

}
