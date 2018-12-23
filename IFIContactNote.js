
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
    console.dir (dbContactNotes) ;

    var contactNoteId = objView.id ;
    var nextVisitDate = objView[dbContactNotes.NextVisitDate_raw] ;
    var  paReviewStatus = objView[dbContactNotes.PAReviewStatus_raw];
    var  contactNoteStatuss = objView[dbContactNotes.ContactNoteStatus_raw] ;
    var  showOnDashboard = objView[dbContactNotes.ShowOnDashboard_raw];
    var  clientId = objView[dbContactNotes.Client_raw][0].id;
    var  caseManagerId = objView[dbContactNotes.CaseManager_raw][0].id ;

    console.dir (nextContactVisit);
    console.log (nextVisitDate) ;

    if (nextVisitDate != "")
    {
      var nextContactVisit = {
        "field_14": clientId ,
        "field_16_raw": nextVisitDate,
        "field_236" : "Appointment",  //Note Type
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

        OYPKnackAPICall (headers, "post", dbObjects.ContactNotes, nextContactVisit)
                .then (result => {
                    console.dir (result) ;
                });


        }
   catch (e) {
      logerror (proc, e);
    }
}
