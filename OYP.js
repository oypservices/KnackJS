
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
//			console.log (JSON.stringify (view)) ;
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





// Change "scene_1" to the scene you want to listen for
$(document).on('knack-scene-render.scene_120', function(event, scene) {
  // Do something after the scene renders
  console.log('view 209');

	var objTransform = {data: {}, template:{}};
	objTransform.data.models = Knack.models['view_209'].data.models;
	objTransform.template = {   {
  "to": "brian@oypservices.com",
  "subject": "Its working....Email sent successfully",
  "templateId": "d-dbd4fd2a6cbf42c6837e8198ca9564b0",
  "html": "data",
  "dynamic_template_data": {
    "total": "$ 239.85",
    "items": [ {{models}}
      {
        "text": "id",
        "image": "field_42",
        "price": "$ 79.95"
      }
    ],
    "emailsubject": "New API Gateway Subject",
    "receipt": true,
    "name": "Sample Name",
    "address01": "1234 Fake St.",
    "address02": "Apt. 123",
    "city": "Place",
    "state": "CO",
    "zip": "80202"
  }
}};

	console.log('view 212');
 console.log(JSON.stringify(Knack.models['view_209'].data));
	console.log(JSON.stringify(objTransform));

	var resource = 'jsontransform';
	var body = OYPServicesAPIPost( resource, headers, objTransform ) ;
	console.log (JSON.stringify(body)) ;

	console.log('view 212');
	console.log(Knack.models['view_212']);


});
