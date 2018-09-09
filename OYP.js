
function hideShowContactNoteFields(view, val) {
/*
$('#kn-input-' + dbNotes.Date).show();
$('#kn-input-' + dbNotes.Notes).show();
$('#kn-input-' + dbNotes.Taskormeeting).show();
$('#kn-input-' + dbNotes.TasksorMeetingTypes).show();
$('#kn-input-' + dbNotes.TaskMeetingDueDate).show();
$('#kn-input-' + dbNotes.TaskStatus).show();
$('#kn-input-' + dbNotes.TaskUpdate).show();


*/



try
{


	$('#kn-input-' + dbNotes.SalesRep).hide();
	$('#kn-input-' + dbNotes.Site).hide();
	$('#kn-input-' + dbNotes.Contact).hide();
	$('#kn-input-' + dbNotes.Organization).hide();
	$('#kn-input-' + dbNotes.Project).hide();
	$('#kn-input-' + dbNotes.ProjectItem).hide();

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
		if (view.source.object == "object_2" ) {
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

$(document).on('knack-view-render.view_209' , function(event, view, data) {

  try {
	var view_name =  view.key ;

  console.log("data");
	console.log(data) ;

	console.log("event");
	console.log(event);

	console.log("view");
	console.log(view);

  }catch (e)
    {
	  console.error(e);
	  console.error(e.stack) ;
    }

});
