/*******************************************************************************************
Standard error logging function.
********************************************************************************************/

function logerror (e) {

    var source = logObject.caller.name ;
    console.log ("Error in " + source + ": " + e ) ;
    console.log (e.stack) ;

  return
}

/*******************************************************************************************
Standard message logging.
********************************************************************************************/

function logMsg (msg) {

    var source = logObject.caller.name ;
    console.log (source + ": " + msg ) ;

  return
}

/*******************************************************************************************
Standard message logging.
********************************************************************************************/

function logObject (msg) {

    var source = logObject.caller.name ;
    console.dir (source + ": " + msg ) ;

  return
}




function hideShowContactNoteFields(view, val) {

try
{
	/*
	$('#kn-input-' + dbNotes.Date).show();
	$('#kn-input-' + dbNotes.Notes).show();
	$('#kn-input-' + dbNotes.Taskormeeting).show();
	$('#kn-input-' + dbNotes.TasksorMeetingTypes).show();
	$('#kn-input-' + dbNotes.TaskMeetingDueDate).show();
	$('#kn-input-' + dbNotes.TaskStatus).show();
	$('#kn-input-' + dbNotes.TaskUpdate).show();
	*/

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
  switch (view.source.object) {
			case dbContacts.key :

			  fldContactType = getFieldKey(dbContacts, "Contact Type") ;

				//add onchange event to the  drop down box
				$('#' + fldContactType).on('change',function(e){
				  logerror (e);
				  logMsg ( "Contact Type = " + $('#' + fldContactType).val());
				  hideFormFields (  view, dbContacts, $('#'+ fldContactType).val() );
				});

				hideFormFields  (  view, dbContacts, $('#'+ fldContactType).val() );
				break;

			default :
			  break ;

	}


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


function CallAPIJSONTransform(message) {

	console.dir (message);
	var objTransform = {data: {}, template:{}};
	objTransform.data.models = Knack.models['view_209'].data.models;
	objTransform.template = message.records[0].field_178 ;



 var resource = 'jsontransform';
 OYPServicesAPIPost( resource, headers, objTransform )
 	.then (result=> {CallAPISendMail(result) } ) ;

}

function CallAPISendMail(message) {

	var resource = 'sendmail';
	console.log ('sendmail');
  OYPServicesAPIPost( resource, OYPAPIHeaders, message ) ;

}

// Change "scene_1" to the scene you want to listen for
$(document).on('knack-scene-render.scene_120', function(event, scene) {
  // Do something after the scene renders
  console.log('view 209');

  //Get the template from the api table
	var getapidata =
	{
	  "method": "get",
	  "knackobj": "object_19",
		"appid": "5b0c347966775f2a64354e2a",
	  "appidtest": Knack.app.id,
	  "filters": [
	    {
	      "field": "field_176",
	      "operator": "is",
	      "value": "Send Status Report"
	    }
	  ]
	}

	console.dir (getapidata);
	var resource = 'knackobject';
  OYPServicesAPIPost( resource, headers, getapidata )
  	.then (result=> {CallAPIJSONTransform(result) } ) ;

});
