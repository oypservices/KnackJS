//Helper Js. Adding this block for documentation and to force commit;




function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

/* Parser */

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

function  OYPServicesAPIPost( resource, headers, data) {
	var this_url = 'https://x247dlqfx2.execute-api.us-east-1.amazonaws.com/v1/'  ;
	OYPServicesAPIPost( this_url, resource, headers, data ) ;
}

function  OYPServicesAPIPost( this_url, resource, headers, data )
{
		return new Promise ((resolve, reject) => {

			this_url = this_url + resource ;
		  console.log (this_url) ;
			console.dir (data) ;

			// Search to see if a contact exist by this name

			if (typeof data == "string") {
				data = JSON.parse(data);
			}

			console.log(typeof data);

			$.ajax({
						url: this_url ,
						type: 'POST',
						headers: headers,
						data:  JSON.stringify(data) ,
						crossDomain: true,
						datatype: 'json',
						json: true,
						success: function (response) {

	//						if (resource == "jsontransform") {
							  console.dir (response) ;
								response = response.body ;
	//					  }

							console.log ( JSON.stringify(response)) ;

							resolve(response) ;

						} ,
				error: function (responseData, textStatus, errorThrown) {
						alert('POST failed.');
						reject(errorThrown);
				}// end response function

			}); //end ajax

		}); // end promise

} ;


function  OYPServicesAPIKnack( url, resource, headers, filters )
{
		return new Promise ((resolve, reject) => {

			if (typeof filters == "string") {
				filters = JSON.parse(filters);
			}


			var this_url = url + resource + '?filters=' + encodeURIComponent(JSON.stringify(filters));
		  console.log (this_url) ;
			console.log (JSON.stringify(data)) ;

			$.ajax({
						url: this_url ,
						type: 'GET',
						headers: headers,
						crossDomain: true,
//						datatype: 'json',
//						json: true,
						success: function (response) {

							console.log ( JSON.stringify(response)) ;
							resolve(response) ;

						} ,
				error: function (responseData, textStatus, errorThrown) {
						alert('GET failed.');
						reject();
				}// end response function

			}); //end ajax

		}); // end promise

} ;
