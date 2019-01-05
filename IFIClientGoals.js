/***********************************************************************************************************
copying an IRP is a multistep process
1. Copy the IRP records
2. Copy the dbGoals
3. Copy the interventions linked to the dbGoals
4. Sync the interventions nested with the goal record itself
***********************************************************************************************************/


function copyIRP (event, view, record) {

try {
		var proc = "copyIRP";
	copyIRPRecord()

		.then (result=> { copyGoalRecords(result); })
		.then (newresult=> {copyInterventionRecords(newresult); })
}
catch (e)  {
				logerror(proc, e);
		 }

}

function copyIRPRecord () {

	return new Promise ((resolve, reject) => {
		  var proc = "copyIRPRecord" ;
		  console.log ( proc) ;
			resolve (1) ;

	})
}



function copyGoalRecords (parm) {

	return new Promise ((resolve, reject) => {
		  var proc = "copyGoalRecords " + parm;
		  console.log ( proc) ;
			resolve (2) ;

	})
}


function copyInterventionRecords (parm) {

	return new Promise ((resolve, reject) => {
		  var proc = "copyInterventionRecords " + parm;
		  console.log ( proc) ;
			resolve (3) ;

	})
}




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
	var proc = "inData" ;

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
								field_233.push(result.records[n].id)  ;

						console.dir (field_233) ;

						delete  apidata.filters;
						apidata.record = {} ;
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
