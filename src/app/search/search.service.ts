import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as elasticsearch from 'elasticsearch';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
	private _client: elasticsearch.Client

	//constructor() { }
	constructor(public http: Http) { 
		this._client = new elasticsearch.Client({
			host: 'localhost:9200',
			log: 'trace'
		});
	}

	getSearch(index, query, pageNum, perPage) {
		var requestBody = []

		if (index == "news" || index == "All") {
		    requestBody.push({ index: "news", type: "news" });
		    requestBody.push({ query: { match: { "_all": query } }, sort: { "date": { "order": "desc" } }, from: (pageNum - 1) * perPage, size: perPage });
		}
	    
	    if (index == "blogs" || index == "All") {
			requestBody.push({ index: "blogs", type: "blog" });
		    requestBody.push({ query: { match: { "_all": query } }, sort: { "date": { "order": "desc" } }, from: (pageNum - 1) * perPage, size: perPage });
		}
		
	    if (index == "books" || index == "All") {
		    requestBody.push({ index: "books", type: "book" });
		    requestBody.push({ query: { match: { "_all": query } }, sort: { "price": { "order": "desc" } } , from: (pageNum - 1) * perPage, size: perPage});
	    }

		var response = this._client.msearch({
		  body: requestBody
		});

		return response;

	}
}
