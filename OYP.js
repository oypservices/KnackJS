
function hideShowContactNoteFields(view, val) {
/*
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
*/
	
try
{

	// If this value in the form doesn't equal "SpecificValue" then prevent the form from submitting
    if (val == "Task") {
	console.log (val);

	$('#kn-input-' + dbNotes.Taskormeeting).show();
	$('#kn-input-' + dbNotes.TasksorMeetingTypes).show();
	$('#kn-input-' + dbNotes.TaskMeetingDueDate).show();
	$('#kn-input-' + dbNotes.TaskStatus).show();
	$('#kn-input-' + dbNotes.TaskUpdate).show();
	return true;
    }
    else if (val == "Meeting") {
	console.log (val);
	$('#kn-input-' + dbNotes.Taskormeeting).show();
	$('#kn-input-' + dbNotes.TasksorMeetingTypes).show();
	$('#kn-input-' + dbNotes.TaskMeetingDueDate).show();
	$('#kn-input-' + dbNotes.TaskStatus).show();
	$('#kn-input-' + dbNotes.TaskUpdate).show();
	return true;
    } 
    else {
	$('#kn-input-' + dbNotes.Taskormeeting).hide();
	$('#kn-input-' + dbNotes.TasksorMeetingTypes).hide();
	$('#kn-input-' + dbNotes.TaskMeetingDueDate).hide();
	$('#kn-input-' + dbNotes.TaskStatus).hide();
	$('#kn-input-' + dbNotes.TaskUpdate).hide();
	return true;
    }
	
}catch (e)
    {
  console.error(e);
  console.error(e.stack) ;
    }
	  
	
}

$(document).on('knack-view-render.any' , function(event, view, data) {
	       
  try {
	var view_name =  view.key ;
	console.log(view_name) ;
	for (var i = 0; i < vw_notes.length; i++) {
		if (vw_notes[i] == view_name ) {
			console.log (JSON.stringify (view)) ;
			var fld_note_type =  view.key + '-' + dbNotes.NoteType;
			
			//add onchange event to the NoteType drop down box
			$('#' + fld_note_type).on('change',function(e){
			  console.log (e);
			  console.log ($('#' + fld_note_type).val());
			  hideShowContactNoteFields (  view, $('#'+ fld_note_type).val() );
			});
			
			//call the onchange event the first time to set initial fields
			hideShowContactNoteFields (  view, $('#'+ fld_note_type).val() );
			
		   	break;
		}

	}
  }catch (e)
    {
	  console.error(e);
	  console.error(e.stack) ;
    }
	    
});
