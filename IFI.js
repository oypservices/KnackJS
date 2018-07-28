



//----favicon
$(document).on('knack-view-render.any', function (event, view, data) {
document.title='IFI Staff Portal';
var link = document.createElement('link');
	link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'url to favicon here (favicon.ico) ';
    document.getElementsByTagName('head')[0].appendChild(link);
});



// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};





//Menu View on the Edit Detail Page -- Hide Intake for roles other t han CM
$(document).on('knack-view-render.view_220', function (event, view, record) {

  if ( Knack.getUserRoles('object_9') ){
    
    var x = document.getElementsByClassName("kn-link-2")[0];
    x.style.display = "none";
    
  
  }

  
});
          



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

//function addClientTeamMemberByName (contactname, role, clientId) 
$(document).on('knack-record-update.' + vw_client_edit , function (event, view, record) {
  
  
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
    
    
});



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




$(document).on('knack-form-submit1.' + vw_goal_intervention_add , function(event, view, data) {
  	
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
  
  
 // alert (clientGoalId); 
  //alert (JSON.stringify (data));
  //data.field_232 = clientGoalId;
  
  var s =  document.getElementById("view_485-field_232");
  s.style.visibility = "hidden";
  setSelectedIndex(s, clientGoalId)
  
  //data.field_232_raw = goalid;
  //updateInterventionGoalId (data ) ;
  console.log (JSON.stringify (data)) ;

  
});



// Change "scene_1" to the scene you want to listen for
$(document).on('knack-scene-render.scene_264', function(event, scene) {
  // Do something after the scene renders
  console.log('listener for scene: ' + scene.key);
  console.log (JSON.stringify (scene));
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
