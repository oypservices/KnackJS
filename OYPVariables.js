
var api_url = 'https://api.knack.com/v1/scenes/';
var api_urlpg = 'https://api.knack.com/v1/pages/';
var app_id = Knack.app.id;
var user = Knack.getUserToken();
var headers = { "Authorization": user, "X-Knack-Application-ID": app_id, "Content-Type":"application/json"};


//Views
var vw_notes	= [ 'view_54', 'view_13','view_133' ] ;



// Database Model

var dbNotes = {
"Date":"field_34",
"Notes":"field_2",
"AddTaskorMeeting":"field_35",
"Taskormeeting":"field_47",
"TasksorMeetingTypes":"field_42",
"TaskMeetingDueDate":"field_37",
"TaskStatus":"field_50",
"TaskUpdate":"field_51",
"SalesRep":"field_58",
"Site":"field_146",
"Contact":"field_22",
"Organization":"field_148",
 "NoteType" : "field_150"

}



//standard URLs
/*
var urlClientTeamAdd = api_url + sc_contact_scene + '/views/' + vw_client_team_add + '/records/';
var urlContactAdd = api_url + sc_contact_scene + '/views/' + vw_contact_add + '/records';
var urlClientTeamList = api_url + sc_contact_scene + '/views/' + vw_client_team_list + '/records';
var urlAccountAdd = api_url + sc_contact_scene + '/views/' + vw_account_add + '/records';
var urlInterventionUpdate = api_url + sc_contact_scene + '/views/' + vw_goal_intervention_goalupdate + '/records';
var urlGoalUpdate = api_url + sc_contact_scene + '/views/' + vw_goal_update + '/records';
var urlInterventionList = api_url + sc_contact_scene + '/views/' + vw_goal_intervention_list + '/records';
*/
