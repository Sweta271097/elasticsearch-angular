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

	getSearch(index, type, query, pageNum, perPage) {
		var response = this._client.search({
		  index: index,
		  type: type,
		  from: (pageNum - 1) * perPage,
	  	  size: perPage,
		  body: {
		    query: {
		      match: {
		        "_all": query
		      }
		    }
		  }
		});

		return response;

	}
}
