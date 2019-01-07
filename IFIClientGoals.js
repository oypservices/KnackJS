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


		var IRPId = record.id  ;
		console.log (IRPId);

		var apidata = {
						"method": "get",
						"format" : "raw" ,
						"knackobj": dbObjects.ClientIRPs,
						"appid": app_id,
						"id" : IRPId
					};

		OYPKnackAPICall (headers,  apidata)
		.then (resultIRP => { return copyIRPRecord(resultIRP) ; })
		.then (resultNewIRP => { return copyGoalRecords(IRPId, resultNewIRP); })
		.then ( result => {
						window.location.href =  $(".kn-back-link a").attr("href");   } );

}
catch (e)  {
				logerror(proc, e);
		 }
}

/****************************************************************************************************
	Create a new IRP record based on the existing
****************************************************************************************************/
function copyIRPRecord (IRP) {

	return new Promise ((resolve, reject) => {

	   var proc = "copyIRPRecord" ;
		 console.log ( proc) ;

		 delete (IRP.id) ;
		 delete (IRP[dbIRPs.IRPCreateDate] ) ;

		 IRP[dbIRPs.IRPCreateDate] = getToday();
		 IRP[dbIRPs.IRPStatus] = "Update" ;

		 var apidata = {
						"method": "post",
						"knackobj": dbObjects.ClientIRPs,
						"appid": app_id,
						"record" : IRP
					};

			OYPKnackAPICall (headers,  apidata)
			    .then ( result => {
							console.dir (result);
							resolve (result) ;
					}	)

	})
}

/********************************************************************************************************************
Copy the Goal records
*********************************************************************************************************************/

function copyGoalRecords (IRPId, resultNewIRP) {

	return new Promise ((resolve, reject) => {

	   var proc = "copyGoalRecords" ;
		 console.log ( proc) ;

		 var newIRPId = resultNewIRP.id ;

		 // get the list of goals
		 var apidata = {
								 "method": "get",
								 "format" : "raw" ,
								 "knackobj": dbObjects.ClientGoals,
								 "appid": app_id,
								 "filters": [ {
										 "field" : dbGoals.ClientIRP ,
										 "operator":"is",
										 "value": IRPId
									 } ]
				};

      var var thisGoalId = "" ;

			OYPKnackAPICall (headers,  apidata)				//get the list of goals
			    .then ( result => {

						console.dir (result);
						for (var n = 0; n < result.records.length; n++ )
						{

								var record = result.records[n];
								var currentGoalId = record.id;
								thisGoalId = result.records[n].id ;
								console.log (thisGoalId);

								delete (record.id) ;
								delete (record[dbGoals.ClientIRP]);

								record[dbGoals.ClientIRP] = newIRPId;

								var postapidata = {
					 						"method": "post",
					 						"knackobj": dbObjects.ClientGoals,
					 						"appid": app_id,
					 						"record" : record
					 					};

							  OYPKnackAPICall (headers,  postapidata ) //post the new goal
									 .then ( resultNewGoal => {
										 	  	console.log (thisGoalId);
										 		resolve ( getInterventionRecords (thisGoalId, resultNewGoal) ); } ) ;

							}
							}) ;
						})
	}
 /*******************************************************************************************************************
  get intervention records

	*******************************************************************************************************************/

	function getInterventionRecords (goalId, resultNewGoal) 	{

		return new Promise ((resolve, reject) => {
			var proc = "getInterventionRecords" ;
		 console.log ( proc) ;
		 	 console.log (goalId) ;
			 console.dir (resultNewGoal) ;

		 var newGoalId = resultNewGoal.id ;

		 // get the list of goals
		 var apidata = {
								 "method": "get",
								 "format" : "raw" ,
								 "knackobj": dbObjects.ClientGoalInterventions,
								 "appid": app_id,
								 "filters": [ {
										 "field" : dbInterventions.ClientGoals ,
										 "operator":"is",
										 "value": goalId
									 } ]
				};

			OYPKnackAPICall (headers,  apidata)
					.then ( result => {
									     for (n = 0 ; n < result.records.length; n++) {
												   copySingleInterventionRecord (newGoalId, result.records[n])
													 	   . then (result => {
																 					 console.dir (result);
															 					   resolve (result ); }) ;
											 }
										 })
								})
}

/***********************************************************************************************************
Copy Signle Intervention Record
***********************************************************************************************************/
function copySingleInterventionRecord (newGoalId, recordINV ) {

	return new Promise ((resolve, reject) => {
		var proc = "copySingleInterventionRecord" ;
 	 console.log ( proc) ;

 	   if (recordINV == undefined )
		 	   return ;

 		 delete (recordINV.id) ;
 		 recordINV[dbInterventions.ClientGoals ] = newGoalId;

 		 	var postapidata = {
 						"method": "post",
 						"knackobj": dbObjects.ClientGoalInterventions,
 						"appid": app_id,
 						"record" : recordINV
 				};

			console.dir (postapidata);
 			OYPKnackAPICall (headers,  postapidata)
						.then ( result => {  console.dir (result) ;
															   resolve ( result) ; })

 				})
}

/***********************************************************************************************************
syncGoalInterventions
***********************************************************************************************************/
function syncGoalInterventions ( goalId) {
/* This functions reads the list of intervention by goal id, and nest them within the intervention field on the goal table.  This is
necessary in order to display the interventions in a view / print type scenario.
*/

try {


	var proc = "syncGoalInterventions" ;

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

						OYPKnackAPICall (headers,  apidata)
							.then ( resultGoal => {  console.dir( resultGoal ) ;  } )
			})
		}
		catch (e)  {
	          logerror(proc, e);
	       }
}
