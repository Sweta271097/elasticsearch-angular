import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})

export class SearchComponent implements OnInit {
	private totalCount: number = 0;
	private pageCount: number = 1;
	private pageNum: number = 1;
	private results: Array<any>;
	private query: string = "";
	private numbers: Array<any> = [1];
	
  	constructor(public searchService: SearchService) { }

  	ngOnInit() {
  		this.getSearch();
  	}

	getSearch() {
		var perPage = 10;
		
		if (this.query != "") {
			this.searchService.getSearch("books", "book", this.query, this.pageNum, perPage).then((searchResult) => {
	                this.results = ((searchResult.hits || {}).hits || [])// extract results from elastic response
	                                        .map((hit) => hit._source);
					console.log(this.results);
	                this.totalCount = this.results.length;
					this.pageCount = Math.ceil(this.totalCount / perPage);	 
					this.numbers = Array(this.pageCount).fill(0).map((x,i)=>i+1);       
	            },
	            err => {
	                console.log(err);
	            },
	            () => console.log('Complete')
	        );
		}
    }

    formatPrice(num) { 
    	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") 
    };
}