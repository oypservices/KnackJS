
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
$(document).on('knack-view-render.' + vw_contact_note_add, function(event, view, data) {

	var view_name =  view.key ;
	var fld_note_type =  view.key + '-field_236';

	$('#' + fld_note_type).on('change',function(e){
	  console.log (e);
	  console.log ($('#' + fld_note_type).val());
	  hideShowContactNoteFields (  view, $('#'+ fld_note_type).val() );
	});

});

$(document).on('knack-view-render.' + vw_contact_note_edit, function(event, view, data) {

	var view_name =  view.key ;
	var fld_note_type =  view.key + '-field_236';

	$('#' + fld_note_type).on('change',function(e){
	  console.log (e);
	  console.log ($('#' + fld_note_type).val());
	  hideShowContactNoteFields (  view, $('#'+ fld_note_type).val() );
	});
});


/*$("#view_272-field_236").onchange({
        select: function (event, ui) {
            alert("the select event has fired!");
        }
    }
); */



//
function setClientStatusText() {
  //Client Edit Page - The Client Status Menu link text will change depending on both the role of the logged in user
  //and the current status of the client.


try {
    var clientStatusMenuItem = "#view_220 .kn-link-1" ;
    var clientStatusMenuItemSpan = clientStatusMenuItem + " span";
    var fld_client_status =   '#kn-input-field_75 > span';
    $(clientStatusMenuItem).hide();  //Initially hide the Status link Menu

    if ( $(clientStatusMenuItem).length == 0 ) {
      console.log ("Status Menu Item does not exist in this case");
      return ;
    }


    if ( Knack.getUserRoles(roles.IFIAdmin) || Knack.getUserRoles(roles.Admin)  ) {
      switch ($(fld_client_status).text()){
        case "Intake" :
            $(clientStatusMenuItemSpan).text("Update/Complete Intake");
            $(clientStatusMenuItem).show();
            break;
        case "Referral":
              $(clientStatusMenuItemSpan).text("Request Authorization");
              $(clientStatusMenuItem).show();
              break;
        case "Authorization Approved" :
             $(clientStatusMenuItemSpan).text("Start Intake");
             $(clientStatusMenuItem).show();
             break;
        case "Approval Pending":
             $(clientStatusMenuItemSpan).text("Set Authorization Decision");
             $(clientStatusMenuItem).show();
             break;
        case "Approval Requested":
             $(clientStatusMenuItemSpan).text("Set Authorization Decision");
             break;
        default:
            break ;

      }
    }

    if ( Knack.getUserRoles(roles.Beacon)   ) {
      switch ($(fld_client_status).text()){
        case "Approval Requested":
        case "Authorization Pending":
        case "Authorization Approved":
        case "Authorization Denied":
             $(clientStatusMenuItemSpan).text("Set Authorization Decision");
             $(clientStatusMenuItem).show();
             break;

        default:
            break ;

      }
    }

}
catch (e)  {
    console.error(e);
    console.error(e.stack) ;
 }

}




//Menu View on the Edit Detail Page
//$(document).on('knack-view-render.view_11', function (event, view, record) {
//});



// Add Default Intake Documents
$(document).on('knack-record-update.view_323', function (event, view, record) {

  var user = Knack.getUserToken();
  var headers = { "Authorization": user, "X-Knack-Application-ID": app_id, "Content-Type":"application/json"};

  var Client = Knack.models[vw_client_dtls_intact_docs].toJSON().id;

  var DfltIntakeList = Knack.models[vw_intact_docs_dflt_list].data.models;



  Knack.showSpinner();

  //alert ($ ("#view_323-field_75 option:selected") .text ());

  if ($("#view_323-field_75 option:selected").text() == "Intake") {

    for (var i = 0; i < DfltIntakeList.length; i++) {

      var data = { field_178: DfltIntakeList[i].attributes.field_178_raw,
                  field_185: Client ,
                  field_180: DfltIntakeList[i].attributes.field_180_raw.id } ;

      $.ajax({
        url: 'https://api.knack.com/v1/scenes/scene_188/views/view_319/records/',
        type: 'POST',
        headers: headers,
        data: JSON.stringify(data),
        success: function (response) {
          console.log('Intake Documents added!!!');
        }
      }); //end ajax

    } // end for DftlIntakeList

  } // if ClientStatus == intake

  Knack.hideSpinner();



});






function findContact (teamMember) {


  var contactid = "" ;

  var filters = [
    // Filter for records with a value for this field in the last three months
    {
      "field":dbContacts.Name,
      "operator":"contains",
      "value": teamMember.Name
    }
  ];


  var this_url = api_url + sc_contact_scene + '/views/' + vw_contact_list + '/records' + '?filters=' + encodeURIComponent(JSON.stringify(filters));


  // Search to see if a contact exist by this name
  $.ajax({
        url: this_url ,
        type: 'GET',
        headers: headers,
        success: function (response) {

          console.log (JSON.stringify (response));
          if ( response.records.length == 1 )
          {
            contactid = response.records[0].id ;
            console.log (contactid) ;
            addClientTeamMember (contactid, teamMember.Role, teamMember.clientId);
          }
          else if ( response.records.length == 0)
          {
            console.log ("contact not found " + JSON.stringify( teamMember.Name)) ;
            var newContact = { "field_102": teamMember.Name_raw
                                } ;



            console.log ( JSON.stringify(newContact)) ;

            $.ajax({
                  url: urlContactAdd ,
                  type: 'POST',
                  headers: headers,
                  data: JSON.stringify(newContact),
                  success: function (response2) {

                    console.log (JSON.stringify(response2) );
                    console.log('Contact Added!!!');
                    contactid = response2.record.id ;
                    console.log (contactid) ;
                    addClientTeamMember (contactid, teamMember.Role, teamMember.clientId);

                  }

            }); //end ajax



          }


        }
      }); //end ajax


      return contactid;
}



function findContactByAccountid (teamMember) {


  var contactid = "" ;

  if (teamMember.Accountid === undefined) {
    console.log ("AccountID Field is undefined") ;
    return ;
  }

  var this_url = urlAccountAdd + '/' + teamMember.Accountid[0].id;  //Case Manager is a drop down, therefore index is needed to access the selected value[s]
  console.log ("Case Manager Lookup: " + this_url) ;



  // Search to see if a contact exist by this name
  $.ajax({
        url: this_url ,
        type: 'GET',
        headers: headers,
        success: function (response) {

          console.log ( JSON.stringify(response)) ;
          contactid = response[dbAccounts.Contact_raw][0].id ;
            console.log (contactid) ;
            addClientTeamMember (contactid, teamMember.Role, teamMember.clientId);
          }

      }); //end ajax


      return contactid;
}



// Add Standard Contacts

function addContact(teamMember) {
  return 'unknown';
}


function addClientTeamMember (contactid, role, clientId) {

  console.log ('Ready to add contact ' + contactid + ' for client ' + clientId + ' as a ' + role );

  var data = { field_105: contactid,
              field_106: role ,
              field_196: clientId } ;


  if (contactid === undefined) {
    console.log ("Cannot added Client Team Member contactid is undefined") ;
    return ;
  }

   if (clientId === undefined) {
    console.log ("Cannot added Client Team Member clientId is undefined") ;
    return ;
  }

 if (role === undefined) {
    console.log ("Cannot added Client Team Member role is undefined") ;
    return ;
  }

  $.ajax({
    url: urlClientTeamAdd ,
    type: 'POST',
    headers: headers,
    data: JSON.stringify(data),
    success: function (response) {
      console.log ( JSON.stringify (response) );
      console.log('Client Team Member Added!!!');
    }
  }); //end ajax



  return true;

}
/**********************************************************************************************
//Client Add / Edit Logic
*************************************************************************************************/
$(document).on('knack-record-update.any' , function (event, view, record) {
  console.log (JSON.stringify(view)) ;
  if (view.source.object == "object_1" ) {
      addDefaultClientTeam (event, view, record);
  }

});

$(document).on('knack-record-create.any' , function (event, view, record) {
  console.log (JSON.stringify(view)) ;
  if (view.source.object == "object_1" ) {
      addDefaultClientTeam (event, view, record);
  }
});

function addDefaultClientTeam (event, view, record) {


  try
  {


      var bTherapistRole = false;
      var bProgramDirectRole = false ;
      var bCaseManagerRole = false ;
      var bRehabSpecRole = false ;
      var viewName = view["key"] ;
      var clientId = Knack.models[viewName].toJSON().id ;


      var filters = [
        // Filter for records with a value for this field in the last three months
        {
          "field":dbClientTeamMembers.Client,
          "operator":"contains",
          "value": clientId
        }
      ];


      var this_url = urlClientTeamList + '?filters=' + encodeURIComponent(JSON.stringify(filters));


      // Search to see if a contact exist by this name
      $.ajax({
            url: this_url ,
            type: 'GET',
            headers: headers,
            success: function (response) {

    		  console.log (JSON.stringify(response));

              var i;
              for (i = 0; i < response.records.length; i++) {


                role = response.records[i][dbClientTeamMembers.Role] ;
                console.log (role) ;


                if (role == "Therapist")
                    bTherapistRole = true;

                if (role == "Program Director")
                   bProgramDirectRole = true ;


                 if (role == "Case Manager")
                   bCaseManagerRole = true ;

                 if (role == "Rehabilitation Specialist")
                    bRehabSpecRole = true ;


              }


              if (!bProgramDirectRole) {
                  teamMember = {
                        "Name" : 'Shavon Neal' ,
                        "Name_raw" : { "first": "Shavon", "last" : "Neal"} ,
                        "Role" : "Program Director" ,
                        "clientId" : clientId  } ;

      			contactid = findContact (teamMember) ;
    			console.log (contactid);

              }

              if (!bTherapistRole)
              {
                    teamMember = {
                          "Name" : Knack.models[viewName].toJSON()[dbClients.ReferredBy] ,
                          "Name_raw" : Knack.models[viewName].toJSON()[dbClients.ReferredBy_raw] ,
                          "Role" : "Therapist" ,
                          "clientId" : clientId ,
                          "Phone" : Knack.models[viewName].toJSON()[dbClients.ReferrerPhone]  } ;


      			contactid = findContact (teamMember) ;
    			console.log (contactid);

              }



              if (!bRehabSpecRole) {
                  teamMember = {
                        "Name" : 'LaVon MacGruder' ,
                        "Name_raw" : { "first": "LaVon", "last" : "MacGruder"} ,
                        "Role" : "Rehabilitation Specialist" ,
                        "clientId" : clientId };

      			contactid = findContact (teamMember) ;
    			console.log (contactid);

              }

      		  if (!bCaseManagerRole) {

                  teamMember = {
                          "Name" : "",
                          "Name_raw" : { "first": "", "last" : ""} ,
                          "Accountid" : Knack.models[viewName].toJSON()[dbClients.CaseManager + "_raw"] ,
                          "Role" : "Case Manager" ,
                          "clientId" : clientId  } ;
                console.log (JSON.stringify(teamMember)) ;

      			contactid = findContactByAccountid (teamMember) ;
    			console.log (contactid);
   			 }



            } //end response
          }); //end ajax


  }
  catch (e)
    {
  console.error(e);
  console.error(e.stack) ;

}


};

function setSelectedIndex(s, valsearch)

{

   console.log (valsearch) ;
   console.log (s.options.length) ;
   var l = s.options.length ;

	// Loop through all the items in drop down list
	for (i = 0; i < l ; i++) {

      console.log (s.options[0].value + ' ' +  valsearch);
	  if (s.options[0].value.toUpperCase()  == valsearch.toUpperCase() ) {
			// Item is found. Set its property and exit
            console.log ( 'found it');
            s.selectedIndex = 0;
   		    s.options[0].selected = true;
           	break;
		}

      s.remove(0) ;

	}

	return;

}


function updateInterventionGoalId (GoalId)
{

  var vw_goal_intervention_goalupdate = 'view_486' ;


}


function updateInterventionGoalId (interventionRecord ) {


  alert ('Intervention Update started!!!');

  $.ajax({
    url: urlInterventionUpdate ,
    type: 'PUT',
    headers: headers,
    data: JSON.stringify(interventionRecord),
    success: function (response) {
      console.log ( JSON.stringify (response) );
      console.log('Intervention Upated!!!');
      alert ('Intervention Update Completed!!!');
    }
  }); //end ajax



  return true;

}




$(document).on('knack-form-submit.' + vw_goal_intervention_add , function(event, view, data) {

  var parser = document.createElement("a");
  var pathArray = window.location.href.split( '/' );
  var clientGoalId = '';

  alert ( vw_goal_intervention_add ) ;

   for ( var i = 0; i < pathArray.length; i++) {
     if (pathArray[i] == "edit-client-goal2")
        clientGoalId = pathArray[i+1].toString();
   }

  alert (clientGoalId);
  alert (JSON.stringify (data));
  //data.field_232 = clientGoalId;

  var goalid = { "id" : clientGoalId } ;

  data.field_232_raw = goalid;
  updateInterventionGoalId (data ) ;
  console.log (JSON.stringify (data)) ;
  alert (JSON.stringify (data));

});

$(document).on('knack-view-render.' + vw_goal_intervention_add , function(event, view, data) {

  var parser = document.createElement("a");
  var pathArray = window.location.href.split( '/' );
  var clientGoalId = '';


   for ( var i = 0; i < pathArray.length; i++) {
     if (pathArray[i] == "edit-client-goal2")
        clientGoalId = pathArray[i+1].toString();
   }


  var s =  document.getElementById("view_485-field_232");
  s.style.visibility = "hidden";
  setSelectedIndex(s, clientGoalId)

  //data.field_232_raw = goalid;
  //updateInterventionGoalId (data ) ;
  console.log (JSON.stringify (data)) ;


});


// Change "scene_1" to the scene you want to listen for
$(document).on('knack-scene-render.scene_7', function(event, scene) {
  // Do something after the scene renders

	var fld_client_status =   '#kn-input-field_75 span';
//	console.log ($(fld_client_status).text());
//	alert (  $(fld_client_status).text() );

//  console.dir (scene);
//	console.dir(event);
//	console.log(scene.views[1]) ;
});


// On Knack Record Update, redirect to URL. I know this already exists in Knack, but in my case
// I wanted to direct the recently updated record to another view.

$(document).on('knack-record-update.' + vw_irp_final, function (event, view, record) {

	var viewName = view["key"] ;
	var clientId =  Knack.models[viewName].toJSON()["field_200_raw"][0].id;

	console.log (JSON.stringify(view));
	console.log (clientId);


	var parser = document.createElement("a");
  	var pathArray = window.location.href.split( '#' );

        var url = pathArray[0] + '#clients/edit-client2/' + clientId + '/irp/' + clientId + '/edit-client-irp/' + record.id ;
	console.log (url);
	window.location.href = url;

});


function syncGoalInterventions ( inData) {
/* This functions reads the list of intervention by goal id, and nest them within the intervention field on the goal table.  This is
necessary in order to display the interventions in a view / print type scenario.
*/

	console.log (JSON.stringify (inData)) ;
  	console.log (JSON.stringify (inData));
	var goalId = inData["field_232_raw"][0].id  ;


	var filters = [
    	// Filter for records with a value for this field in the last three months
    	{
	      "field":dbInterventions.ClientGoals,
	      "operator":"contains",
	      "value": goalId
    	}
  	];

  	var this_url = urlInterventionList + '?filters=' + encodeURIComponent(JSON.stringify(filters));
	console.log (this_url) ;
  	var goal_url = urlGoalUpdate + '/' + goalId ;


  // Search to see if a contact exist by this name
  $.ajax({
        url: this_url ,
        type: 'GET',
        headers: headers,
        success: function (response) {

		console.log ( JSON.stringify(response)) ;
		var field_233 = [];
		for (var i = 0; i < response.records.length; i++) {
			//console.log (response.records[i].id) ;
		      	field_233[i] =  {"id": response.records[i].id}  ;
	        }

		//console.log (JSON.stringify(field_233)) ;
		var data = { "field_233": field_233 } ;

		 $.ajax({
			url: goal_url,
			type: 'PUT',
			headers: headers,
			data: JSON.stringify(data),
			success: function (response) {
			  console.log (JSON.stringify(response));
			  console.log('Goal Interventions Updated!!!');
			}
		      }); //end ajax
	} // end response function

      }); //end ajax

}


/* Send Test Mail */
function sendTTestMail ( ) {
/* This functions reads the list of intervention by goal id, and nest them within the intervention field on the goal table.  This is
necessary in order to display the interventions in a view / print type scenario.
*/


    var resource = 'sendmail'
  	var data = {

			  "to": "brian@oypservices.com",
			  "subject": "Its working....Email sent successfully",
			  "templateId": "d-dbd4fd2a6cbf42c6837e8198ca9564b0",
			  "html": "data",
			  "dynamic_template_data": {
			    "total": "$ 239.85",
			    "items": [
			      {
			        "text": "Nike Sneakers",
			        "image": "https://marketing-image-production.s3.amazonaws.com/uploads/8dda1131320a6d978b515cc04ed479df259a458d5d45d58b6b381cae0bf9588113e80ef912f69e8c4cc1ef1a0297e8eefdb7b270064cc046b79a44e21b811802.png",
			        "price": "$ 79.95"
			      },
			      {
			        "text": "Old Line Sneakers",
			        "image": "https://marketing-image-production.s3.amazonaws.com/uploads/3629f54390ead663d4eb7c53702e492de63299d7c5f7239efdc693b09b9b28c82c924225dcd8dcb65732d5ca7b7b753c5f17e056405bbd4596e4e63a96ae5018.png",
			        "price": "$ 79.95"
			      },
			      {
			        "text": "Blue Line Sneakers",
			        "image": "https://marketing-image-production.s3.amazonaws.com/uploads/00731ed18eff0ad5da890d876c456c3124a4e44cb48196533e9b95fb2b959b7194c2dc7637b788341d1ff4f88d1dc88e23f7e3704726d313c57f350911dd2bd0.png",
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
    };


		OYPServicesAPIPost( resource, headers, data ) ;

    resource = 'jsontransform';
		data = {
  "data": {
    "discharge_summary": {
      "_uid": "16cad9dd-cc4b-42f8-b7b2-980835d9e977::ripple_osi.ehrscape.c4h::1",
      "language|code": "en",
      "language|terminology": "ISO_639-1",
      "territory|code": "GB",
      "territory|terminology": "ISO_3166-1",
      "context": {
        "_health_care_facility|id": "904",
        "_health_care_facility|id_scheme": "iEHR",
        "_health_care_facility|id_namespace": "iEHR",
        "_health_care_facility|name": "St.James's Hospital (Dublin)",
        "patient_identifiers": {
          "mrn": "9999999000",
          "mrn|issuer": "iEHR",
          "mrn|assigner": "iEHR",
          "mrn|type": "MRN",
          "oth": "1020714",
          "oth|issuer": "iEHR",
          "oth|assigner": "iEHR",
          "oth|type": "OTH",
          "gms": "-",
          "gms|issuer": "iEHR",
          "gms|assigner": "iEHR",
          "gms|type": "GMS"
        },
        "start_time": "2010-05-14T00:00:00Z",
        "setting|code": "238",
        "setting|value": "other care",
        "setting|terminology": "openehr"
      },
      "discharge_details": {
        "discharge_details_uk_v1": {
          "responsible_professional": {
            "professional_name": {
              "name": "COOKE MR FIACHRA"
            },
            "professional_identifier": "4547",
            "professional_identifier|issuer": "iEHR",
            "professional_identifier|assigner": "iEHR",
            "professional_identifier|type": "MCN"
          },
          "language|code": "en",
          "language|terminology": "ISO_639-1",
          "encoding|code": "UTF-8",
          "encoding|terminology": "IANA_character-sets"
        }
      },
      "diagnoses": {
        "problem_diagnosis": [
          {
            "problem_diagnosis_name": "Cholecystectomy",
            "problem_diagnosis_status": {
              "diagnostic_status|code": "at0017",
              "diagnostic_status|value": "Working",
              "diagnostic_status|terminology": "local"
            },
            "language|code": "en",
            "language|terminology": "ISO_639-1",
            "encoding|code": "UTF-8",
            "encoding|terminology": "IANA_character-sets"
          }
        ]
      },
      "clinical_summary": {
        "clinical_synopsis": {
          "synopsis": "ADMISSION REASON: Admit with acute abdominal pain, deranged LFTs, normal amylase DIAGNOSIS: Cholecystectomy PROBLEMS: Abdominal pain PROBLEMS: Gallstones THEATRE PROCS: Lap Chole NON THEATRE PROCS: None LAB INVESTIGATIONS: As attached - FBC, UE, LFTs, Amylase RAD INVESTIGATIONS: As attached - USS Abdomen, MRCP OTHER INVESTIGATIONS: None PROGRESS DURING STAY: Uncomplicated post operative recovery.Full diet tolerated, wound sites dry and intact, no oozing. Vital signs normal, apyrexial. Mobilising/teds/clexane. No c/o abdominal pain. C/O right shoulder tip pain - advised post operative complication and should resolve within several days. Normal MRCP pre-op. Dx = acute cholecystitis with transiemt choledocholithiasis. ALLERGIES: NKDA DISCHARGE MEDICATION: MEDICATION:Refused analgesia on d/c INFO GIVEN TO PATIENT: All results and surgery as above explained. For removal of clips in 10/7 in dressing clinic - appt given. Avoid constipation OPD FOLLOW UP: 6/52 GP ACTIONS: Routine follow up",
          "language|code": "en",
          "language|terminology": "ISO_639-1",
          "encoding|code": "UTF-8",
          "encoding|terminology": "IANA_character-sets"
        }
      },
      "composer|id": "023781",
      "composer|id_scheme": "Medical Council No",
      "composer|id_namespace": "iEHR",
      "composer|name": "McCrea, Siobhan"
    }
  },
  "template": {
    "sourceId": "{{discharge_summary._uid}}",
    "author_name": "{{discharge_summary['composer|name']}}",
    "author_id": "{{discharge_summary['composer|id']}}",
    "author_idScheme": "{{discharge_summary['composer|id_scheme']}}",
    "documentDate": "{{discharge_summary.context.start_time}}",
    "facility": "{{discharge_summary.context['_health_care_facility|name']}}",
    "patientIdentifier_mrn": "{{discharge_summary.context.patient_identifiers.mrn}}",
    "patientIdentifier_mrnType": "{{discharge_summary.context.patient_identifiers['mrn|type']}}",
    "patientIdentifier_oth": "{{discharge_summary.context.patient_identifiers.oth}}",
    "patientIdentifier_othType": "{{discharge_summary.context.patient_identifiers['oth|type']}}",
    "patientIdentifier_gms": "{{discharge_summary.context.patient_identifiers.gms}}",
    "patientIdentifier_gmsType": "{{discharge_summary.context.patient_identifiers['gms|type']}}",
    "responsibleProfessional_name": "{{discharge_summary.discharge_details.discharge_details_uk_v1.responsible_professional.professional_name.name}}",
    "responsibleProfessional_id": "{{discharge_summary.discharge_details.discharge_details_uk_v1.responsible_professional.professional_identifier}}",
    "responsibleProfessional_idType": "{{discharge_summary.discharge_details.discharge_details_uk_v1.responsible_professional['professional_identifier|type']}}",
    "dischargingOrganisation": "{{discharge_summary.discharge_details.discharge_details_uk_v1.discharging_organisation.name_of_organisation}}",
    "dateTimeOfDischarge": "{{discharge_summary.discharge_details.discharge_details_uk_v1.discharging_organisation.name_of_organisatio.date_time_of_discharge}}",
    "clinicalSynopsis": "{{discharge_summary.clinical_summary.clinical_synopsis.synopsis}}",
    "dateOfAdmission": "{{discharge_summary.admission_details.inpatient_admission.date_of_admission}}",
    "diagnosisList": [
      "{{discharge_summary.diagnoses.problem_diagnosis}}",
      {
        "problem": "{{problem_diagnosis_name}}",
        "description": "{{problem_diagnosis_status['diagnostic_status|value']}}",
        "terminology": "{{problem_diagnosis_status['diagnostic_status|terminology']}}",
        "terminologyCode": "{{problem_diagnosis_status['diagnostic_status|code']}}"
      }
    ]
  }
};
	var body = OYPServicesAPIPost( resource, headers, data ) ;
	console.log (body.body.sourceId) ;

} ;



/* Intervention Viees - Adds and Updates */

$(document).on('knack-form-submit.view_268' , function(event, view, data) {

  	syncGoalInterventions (data ) ;
});

$(document).on('knack-form-submit.view_269' , function(event, view, data) {

  	syncGoalInterventions (data ) ;
});

$(document).on('knack-form-submit.view_510' , function(event, view, data) {

   	syncGoalInterventions (data ) ;
});

$(document).on('knack-form-submit.view_513' , function(event, view, data) {

   	syncGoalInterventions (data ) ;
});

$(document).on('knack-form-submit.view_491' , function(event, view, data) {

   	syncGoalInterventions (data ) ;
});

$(document).on('knack-form-submit.view_515' , function(event, view, data) {

   	syncGoalInterventions (data ) ;
});


$(document).on('knack-view-render.any' , function(event, view, data) {

  try {
	     var view_name =  view.key ;
       console.log(view_name) ;
       //Client Object

       if (view.source.object == "object_1" ){
         setClientStatusText() ;
         return ;
       }
     }

  catch (e)  {
      console.error(e);
      console.error(e.stack) ;
   }

});
