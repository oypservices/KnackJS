
function hideShowContactNoteFields(view, val) {
	
$('#kn-input-' + dbNotes.Date).show();
$('#kn-input-' + dbNotes.Notes).show();
$('#kn-input-' + dbNotes.Taskormeeting).show();
$('#kn-input-' + dbNotes.TasksorMeetingTypes).show();
$('#kn-input-' + dbNotes.TaskMeetingDueDate).show();
$('#kn-input-' + dbNotes.TaskStatus).show();
$('#kn-input-' + dbNotes.TaskUpdate).show();
$('#kn-input-' + dbNotes.SalesRep).show();
$('#kn-input-' + dbNotes.Site).show();
$('#kn-input-' + dbNotes.Contact).show();
$('#kn-input-' + dbNotes.Organization).show();


	    // If this value in the form doesn't equal "SpecificValue" then prevent the form from submitting
    if (val == "Task") {
	console.log (val);

	$('#kn-input-' +  dbNotes.ContactNotedate).show();
	$('#kn-input-' +  dbContactNotes.CaseManager).show();
	$('#kn-input-' +  dbContactNotes.Client).show();
	$('#kn-input-' +  dbContactNotes.NoteType).show();

	$('#kn-input-' +  dbContactNotes.MeetingStatus).hide();
	$('#kn-input-' +  dbContactNotes.ContactDateStart).show();
	$('#kn-input-' +  dbContactNotes.ContactDateEnd).show();
	$('#kn-input-' +  dbContactNotes.VisitLocation).hide();
	$('#kn-input-' +  dbContactNotes.ReasonforContact).hide();
	$('#kn-input-' +  dbContactNotes.ClientIRP).show();
	$('#kn-input-' +  dbContactNotes.IRPGoals).show();
	$('#kn-input-' +  dbContactNotes.ClientGoalInterventions).hide();
	$('#kn-input-' +  dbContactNotes.PersonsPresent).hide();
	$('#kn-input-' +  dbContactNotes.ClientResponses).show();
	$('#kn-input-' +  dbContactNotes.PlanforNextVisit).show();
	$('#kn-input-' +  dbContactNotes.OtherComment).hide();
	$('#kn-input-' +  dbContactNotes.MedicationChanges).hide();
	$('#kn-input-' +  dbContactNotes.CaseManagerSignature).show();
	return true;
    }
    else if (val == "Meeting") {
	console.log (val);
	$('#kn-input-' +  dbContactNotes.ContactNotedate).show();
	$('#kn-input-' +  dbContactNotes.CaseManager).show();
	$('#kn-input-' +  dbContactNotes.Client).show();
	$('#kn-input-' +  dbContactNotes.NoteType).show();

	$('#kn-input-' +  dbContactNotes.MeetingStatus).hide();
	$('#kn-input-' +  dbContactNotes.ContactDateStart).show();
	$('#kn-input-' +  dbContactNotes.ContactDateEnd).show();
	$('#kn-input-' +  dbContactNotes.VisitLocation).show();
	$('#kn-input-' +  dbContactNotes.ReasonforContact).hide();
	$('#kn-input-' +  dbContactNotes.ClientIRP).hide();
	$('#kn-input-' +  dbContactNotes.IRPGoals).hide();
	$('#kn-input-' +  dbContactNotes.ClientGoalInterventions).hide();
	$('#kn-input-' +  dbContactNotes.PersonsPresent).hide();
	$('#kn-input-' +  dbContactNotes.ClientResponses).hide();
	$('#kn-input-' +  dbContactNotes.PlanforNextVisit).hide();
	$('#kn-input-' +  dbContactNotes.OtherComment).hide();
	$('#kn-input-' +  dbContactNotes.MedicationChanges).hide();
	$('#kn-input-' +  dbContactNotes.CaseManagerSignature).hide();
	return true;
    } 
    else {
	$('#kn-input-' +  dbContactNotes.ContactNotedate).show();
	$('#kn-input-' +  dbContactNotes.CaseManager).show();
	$('#kn-input-' +  dbContactNotes.Client).show();
	$('#kn-input-' +  dbContactNotes.NoteType).show();

	$('#kn-input-' +  dbContactNotes.MeetingStatus).show();
	$('#kn-input-' +  dbContactNotes.ContactDateStart).show();
	$('#kn-input-' +  dbContactNotes.ContactDateEnd).show();
	$('#kn-input-' +  dbContactNotes.VisitLocation).show();
	$('#kn-input-' +  dbContactNotes.ReasonforContact).show();
	$('#kn-input-' +  dbContactNotes.ClientIRP).show();
	$('#kn-input-' +  dbContactNotes.IRPGoals).show();
	$('#kn-input-' +  dbContactNotes.ClientGoalInterventions).show();
	$('#kn-input-' +  dbContactNotes.PersonsPresent).show();
	$('#kn-input-' +  dbContactNotes.ClientResponses).show();
	$('#kn-input-' +  dbContactNotes.PlanforNextVisit).show();
	$('#kn-input-' +  dbContactNotes.OtherComment).show();
	$('#kn-input-' +  dbContactNotes.MedicationChanges).show();
	$('#kn-input-' +  dbContactNotes.CaseManagerSignature).show();
	return true;
    }
	  
	
}
$(document).on('knack-view-render.all'  function(event, view, data) {
	       
  
	var view_name =  view.key ;
	for (var i = 0; i < vw_notes.length; i++) {
		if (vw_notes[i] == view_name ) {
			var fld_note_type =  view.key + '-' + dbNotes.NoteType;
			
			$('#' + fld_note_type).on('change',function(e){
			  console.log (e);
			  console.log ($('#' + fld_note_type).val());
			  hideShowContactNoteFields (  view, $('#'+ fld_note_type).val() );
			});
		}
	 break;
	}
	    
});
