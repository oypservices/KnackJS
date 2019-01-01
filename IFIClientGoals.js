/***********************************************************************************************************
syncGoalInterventions
***********************************************************************************************************/

function syncGoalInterventions ( inData) {
/* This functions reads the list of intervention by goal id, and nest them within the intervention field on the goal table.  This is
necessary in order to display the interventions in a view / print type scenario.
*/

try {

	console.log (JSON.stringify (inData)) ;
  console.log (JSON.stringify (inData));
	var goalId = inData["field_232_raw"][0].id  ;

	var apidata = {
					"method": "get",
					"knackobj": dbObjects.ClientGoalInterventions,
					"appid": app_id,
					"filters" : [ {
					      "field": dbInterventions.ClientGoals,
					      "operator":"contains",
					      "value": goalId
				    	} ]
					};

		OYPKnackAPICall (headers,  apidata)
				.then (result => {

						console.dir (result) ;
						if ( result == undefined)
							 return ;

						var field_233 = [];

						for (n = 0; n < result.records.length ; n++)
								field_233[n] =  {"id": response.records[i].id}  ;


						console.dir (field_233) ;
						apidata.record.field_233 = field_233;

						apidata.method = "put" ;
						apidata.knackobj = dbObjects.ClientGoals;
						apidata.id = goalId ;
						console.dir (apidata) ;

						OYPKnackAPICall (headers,  apidata) ;

			})
		}
		catch (e)  {
	          logerror(proc, e);
	       }
}




var apidata = {
			"method": "get",
			"knackobj": dbContacts.key,
			"appid": app_id,
			"id" : contact
			};

OYPKnackAPICall (headers,  apidata)
				.then (result => {

						console.dir (result) ;
						if ( result == undefined)
							 return ;

						apidata.record = {};

						var linkedContacts = [];
						if (result.field_258_raw == undefined)
								linkedContacts = [ linkId ]     ;
						else  {
							for (var n = 0; n < result.field_258_raw.length ; n++ )
									linkedContacts.push ( result.field_258_raw[n].id ) ;

							linkedContacts.push ( linkId ) ;
						}

						console.dir (linkedContacts) ;
						apidata.record.field_258 = linkedContacts;

						apidata.method = "put" ;
						console.dir (apidata) ;
						OYPKnackAPICall (headers,  apidata) ;
