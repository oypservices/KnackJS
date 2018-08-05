
function hideShowContactNoteFields(view, val) {
	


	    // If this value in the form doesn't equal "SpecificValue" then prevent the form from submitting
    if (val == "Monthly Report") {
	console.log (val);

	$('#kn-input-' +  dbContactNotes.ContactNotedate).show();
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
    else if (val == "Scheduled Appointment") {
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
  
  for n = 0 to vw_notes.length
	var fld_note_type =  view.key + '-field_236';
	       
	$('#' + fld_note_type).on('change',function(e){
	  console.log (e);
	  console.log ($('#' + fld_note_type).val());
	  hideShowContactNoteFields (  view, $('#'+ fld_note_type).val() );
	});
	    
});
