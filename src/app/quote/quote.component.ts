import { Component, OnInit } from '@angular/core';
import { Quote } from '../quote';
import { Quotes } from '../quotes';
import {QuoteeService} from '../quotess/quotee.service';
import {AlertsService} from '../alert-service/alerts.service';
import {HttpClient} from '@angular/common/http';
import {QuoteRequestService} from '../quote-http/quote-request.service'

import {Yu} from '../yu-class/yu';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
 
   providers:[QuoteeService,QuoteRequestService],
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

yu:Yu;
 


  quotes:Quote[];
    alertService:AlertsService;

  constructor(quoteeService:QuoteeService,alertService:AlertsService, private http:HttpClient) { 

  this.quotes = quoteeService.getQuotes();
  this.alertService = alertService;//make the service available to the class
   
  }

 


  addNewQuote(quote){
    let quoteLength = this.quotes.length;
    quote.id = quoteLength+1;
    quote.completeDate = new Date(quote.completeDate)
    this.quotes.push(quote)
  }

    toggleDetails(index){
    this.quotes[index].showDescription = !this.quotes[index].showDescription;
  }

    deleteQuote(isComplete, index){

    if (isComplete) {
    let toDelete = confirm(`Are you sure you want to delete ${this.quotes[index].name}?`)
      
       if (toDelete){
        this.quotes.splice(index,1)
        this.alertService.alertMe("You have deleted the quote");
    }
  }
  }

 ngOnInit() {

    interface ApiResponse{
        quote:string;
        author:string

    }
    this.http.get<ApiResponse>("https://talaikis.com/api/quotes/random/").subscribe(data=>{
        this.yu= new Yu(data.quote,data.author)

    },err=>{
        this.yu= new Yu("If I see a bird that quacks like a duck I conclude its a duck","Nathan")
        console.log("Error occured ")
    })
  }

}
