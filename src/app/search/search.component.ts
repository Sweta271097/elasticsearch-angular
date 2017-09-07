import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

class SearchResult {
    index: string;
    type: string;
    total: number;
    source: Array<any>;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})

export class SearchComponent implements OnInit {
	private totalCount: number = 0;
	private pageCount: number = 10;
	private pageNum: number = 1;
	private perPage: number = 10;
	private results: Array<any>;
	private query: string = "";
	private numbers: Array<any> = [1];
	private isShowDropdown: boolean = false;
	private indices: Array<string> = ["All", "news", "blogs", "books"];
	private indicesName: Array<string> = ["Search All", "News", "Blogs", "Books"];
	private countPerIndex : Map<string, number> = new Map<string, number>();
	private index: string = this.indices[0];
	private indexName: string = this.indicesName[0];
	private isAllIndex: boolean = true;
	
  	constructor(public searchService: SearchService) { }

  	ngOnInit() {
  		this.getSearch(this.pageNum);
  	}

	getSearch(pageNum) {
		this.totalCount = 0;
		this.pageNum = pageNum;

		if (this.query != "") {
			if (this.index == this.indices[0]) { 
				this.perPage = 3;
				this.isAllIndex = true;
			} else {
				this.perPage = 10;
				this.isAllIndex = false;
			}

			this.searchService.getSearch(this.index, this.query, this.pageNum, this.perPage).then((searchResult) => {
					for(let i=0; i<searchResult.responses.length; i++) {
						this.totalCount += searchResult.responses[i].hits.total;
						this.countPerIndex.set(this.indices[i+1], searchResult.responses[i].hits.total);
					}
	                
	                this.results = searchResult.responses;
					this.pageCount = Math.ceil(this.totalCount / this.perPage);	 
					this.numbers = Array(this.pageCount).fill(0).map((x,i)=>i+1);       
	            },
	            err => {
	                console.log(err);
	            },
	            () => console.log('Complete')
	        );
		}
    }

    showDropdown() {
    	this.isShowDropdown = true;
    }

    selectIndex(index) {
    	for (let i=0; i<=this.indices.length; i++) {
    		if (index == this.indices[i]) {
    			this.index = this.indices[i];
				this.indexName = this.indicesName[i];
    		}
    	}

		this.isShowDropdown = false;
    }

    doMore(index) {
    	this.index = index;
    	this.indexName = this.getIndeName(index);

    	this.getSearch(1);
    }

    getIndeName(index) {
    	let indexName: string = "";

    	for (let i=0; i<=this.indices.length; i++) {
    		if (index == this.indices[i]) {
				indexName = this.indicesName[i];
    		}
    	}

    	return indexName;
    }

    getIndexCount(index) {
    	let count = 0;

    	if (this.countPerIndex.get(index) != null) {
    		count = this.countPerIndex.get(index);
    	}

    	return count;
    }

    formatPrice(num) { 
    	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") 
    };
}