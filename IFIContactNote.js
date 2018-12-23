
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
    var nextVisitDate = objView["dbContactNotes.NextVisitDate" ] ;
    var  paReviewStatus = objView["dbContactNotes.PAReviewStatus_raw"];
    var  contactNoteStatuss = objView["dbContactNotes.ContactNoteStatus_raw"] ;
    var  showOnDashboard = objView["dbContactNotes.ShowOnDashboard_raw"];
    var  clientId = objView["dbContactNotes.Client_raw"][0].id;
    var  caseManagerId = objView["dbContactNotes.CaseManager_raw"][0].id ;

    //    var  contactNoteStatussText = objView["ContactNoteStatus_raw"][0].identifier ;
    //  var  paReviewStatusText = objView["PAReviewStatus_raw"][0].identifier ;

    console.dir (nextContactVisit);
    console.log (nextVisitDate) ;

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
