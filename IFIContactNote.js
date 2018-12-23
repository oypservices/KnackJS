
/*******************************************************************************************************
 logStatusChanges every time the client record is updated, if needed
*******************************************************************************************************/


function evaluateContactNotes (event, view, recordClient) {
try {

    var proc = "evaluateContractNotes";
    console.log (proc);

    var viewName = view["key"] ;
    var objView = Knack.models[viewName].toJSON();
    console.dir (objView);

    var contactNoteId = objView.id ;
    var nextVisitDate = objView["NextVisitDate" ] ;
    var  paReviewStatus = objView["PAReviewStatus_raw"][0];
    var  contactNoteStatuss = objView["ContactNoteStatus_raw"][0] ;
    var  showOnDashboard = objView["ShowOnDashboard_raw"][0];
    var  clientId = objView["Client_raw"][0].id;
    var  caseManagerId = objView["CaseManager_raw"][0].id ;

    //    var  contactNoteStatussText = objView["ContactNoteStatus_raw"][0].identifier ;
    //  var  paReviewStatusText = objView["PAReviewStatus_raw"][0].identifier ;

    console.dir (nextContactVisit);

    if (nextVisitDate != "")
    {
      var nextContactVisit = {
        "field_14": clientId ,
        "field_16": nextVisitDate,
        "field_236" : "Scheduled Visit",  //Note Type
        "field_194": caseManagerId
  //      "field_335":Knack.getUserAttributes().id
      } ;

      addNextVisitDate(nextContactVisit) ;
    }


    }
  catch (e)
    {
      logerror (proc, e);
    }

}

/**************************************************************************************
 Add Next Visit Date if it does not already exist
***************************************************************************************/

function addNextVisitDate(nextContactVisit)
{
    try {

        var proc = "addNextVisitDate" ;
        console.log (proc);
        console.dir (nextContactVisit);

        result = OYPKnackAPICall (headers, post, dbObjects.ContactNotes, nextContactVisit) ;
        console.dir (result) ;

        }
   catch (e) {
      logerror (proc, e);
    }
}
