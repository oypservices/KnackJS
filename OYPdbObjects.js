
/*******************************************************************************************************
 logStatusChanges every time the client record is updated, if needed
*******************************************************************************************************/
function hideFormFields(view, dbObject, key) {

    try {

         var conditionalFields = dbObject.conditionalFields ;
         if ( conditionalFields == underfined ) {
             logMessage (dbObject.name + " conditionalFields property not defined ") ;
             return ;
         }

          for (var n =0; conditionalFields.length; n++ ) {

              var bShow =  dbObject.conditionalFields[n].key == key ;

                // If this value in the form doesn't equal "SpecificValue" then prevent the form from submitting
              var fields = dbObject.conditionalFields[n] ;

              for (var i =0; fields.length ; i++)  {
                var fldId = getFieldKey(dbObject, fields[i] ) ;
                if (bShow )
                  $('#kn-input-' +  fldId).show();
                else
                  $('#kn-input-' +  fldId).hide();
              }
            }
        }
     catch (e) {
            logerror (e);
          }
}

/*******************************************************************************************************
Database Objects Helper Functions
*******************************************************************************************************/
function getFieldKey(dbObject, label ) {

    try {

        var fields = dbObject.fields;
        if ( fields == underfined ){
            logMessage (dbObject.name + " Fields property not defined for key - " + key) ;
            return ;
        }

        for (var i =0; fields.length ; i++)
        {
          if (fields[i].label == label)
             return fields[i].key ;
        }

       logMessage (dbObject.name + " field not found - " + label) ;

  }
  catch (e) {
      logerror (e);
    }
}

/*******************************************************************************************************
Database Objects
*******************************************************************************************************/

var dbContacts = {
    "key" : "object_1",
    "name" : "contacts",
    "conditionalFields" : [ {"Organization" : ["Contact Name", "Salutation", "DateOfBirth"] },
                      { "People" :  ["Organization Name"] },
                      { "System" : ["User", "Site", "Contact Name Expression"] }
                    ],

    "fields": [
       {
           "label": "Contact",
           "key": "field_194",
           "required": false,
           "type": "short_text"
       },
       {
           "label": "Contact Type",
           "key": "field_201",
           "required": false,
           "type": "connection",
           "relationship": {
               "belongs_to": "many",
               "has": "one",
               "object": "object_21"
           }
       },
       {
           "label": "Contact Relationship Type",
           "key": "field_199",
           "required": false,
           "type": "connection",
           "relationship": {
               "belongs_to": "many",
               "has": "one",
               "object": "object_20"
           }
       },
       {
           "label": "Contact Name",
           "key": "field_1",
           "required": false,
           "type": "name"
       },
       {
           "label": "Organization Name",
           "key": "field_181",
           "required": false,
           "type": "short_text"
       },
       {
           "label": "Salutation",
           "key": "field_160",
           "required": false,
           "type": "short_text"
       },
       {
           "label": "Occupation",
           "key": "field_126",
           "required": false,
           "type": "short_text"
       },
       {
           "label": "Industry",
           "key": "field_182",
           "required": false,
           "type": "short_text"
       },
       {
           "label": "Lead Referral Source",
           "key": "field_56",
           "required": false,
           "type": "short_text"
       },
       {
           "label": "Date of Initial Contact",
           "key": "field_57",
           "required": false,
           "type": "date_time"
       },
       {
           "label": "Home Phone",
           "key": "field_112",
           "required": false,
           "type": "phone"
       },
       {
           "label": "Mobile Phone",
           "key": "field_113",
           "required": false,
           "type": "phone"
       },
       {
           "label": "Office Phone",
           "key": "field_25",
           "required": false,
           "type": "phone"
       },
       {
           "label": "Fax",
           "key": "field_161",
           "required": false,
           "type": "phone"
       },
       {
           "label": "Email",
           "key": "field_26",
           "required": false,
           "type": "email"
       },
       {
           "label": "Website",
           "key": "field_28",
           "required": false,
           "type": "link"
       },
       {
           "label": "LinkedIn Profile",
           "key": "field_29",
           "required": false,
           "type": "link"
       },
       {
           "label": "Facebook Profile",
           "key": "field_188",
           "required": false,
           "type": "link"
       },
       {
           "label": "Background Info",
           "key": "field_31",
           "required": false,
           "type": "paragraph_text"
       },
       {
           "label": "Contact Organization Roles",
           "key": "field_111",
           "required": false,
           "type": "connection",
           "relationship": {
               "object": "object_14",
               "has": "many",
               "belongs_to": "many"
           }
       },
       {
           "label": "Rating",
           "key": "field_43",
           "required": false,
           "type": "rating"
       },
       {
           "label": "Physical Address",
           "key": "field_184",
           "required": false,
           "type": "address"
       },
       {
           "label": "Mail Address",
           "key": "field_125",
           "required": false,
           "type": "address"
       },
       {
           "label": "Billing Address",
           "key": "field_183",
           "required": false,
           "type": "address"
       },
       {
           "label": "DateOfBirth",
           "key": "field_163",
           "required": false,
           "type": "date_time"
       },
       {
           "label": "User",
           "key": "field_191",
           "required": false,
           "type": "connection",
           "relationship": {
               "belongs_to": "many",
               "has": "one",
               "object": "object_4"
           }
       },
       {
           "label": "Site",
           "key": "field_145",
           "required": false,
           "type": "connection",
           "relationship": {
               "object": "object_16",
               "has": "one",
               "belongs_to": "many"
           }
       },
       {
           "label": "Contact Name Expression",
           "key": "field_195",
           "required": false,
           "type": "concatenation"
       }
   ]
}

/*******************************************************************************************************
Database Objects - Activities
*******************************************************************************************************/

var Activities = {
  "key" : "object_2",
  "name" : "activities",
    "fields": [
        {
            "label": "Date",
            "key": "field_34",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "Note Type",
            "key": "field_150",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Note",
                "Task",
                "Meeting"
            ]
        },
        {
            "label": "Notes",
            "key": "field_2",
            "required": false,
            "type": "paragraph_text"
        },
        {
            "label": "Add Task or Meeting",
            "key": "field_35",
            "required": false,
            "type": "boolean"
        },
        {
            "label": "Tasks or Meeting Types",
            "key": "field_42",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Follow Up Email",
                "Phone Call",
                "Lunch Meeting",
                "Tech Demo",
                "Meetup",
                "Conference",
                "Something else"
            ]
        },
        {
            "label": "Task/Meeting Due Date",
            "key": "field_37",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "Task Status",
            "key": "field_50",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Pending",
                "Completed"
            ]
        },
        {
            "label": "Task Update",
            "key": "field_51",
            "required": false,
            "type": "paragraph_text"
        },
        {
            "label": "Assigned To",
            "key": "field_58",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_5"
            }
        },
        {
            "label": "Site",
            "key": "field_146",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_16"
            }
        },
        {
            "label": "Contact",
            "key": "field_22",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_1",
                "has": "one",
                "belongs_to": "many"
            }
        },
        {
            "label": "Organization",
            "key": "field_148",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_13"
            }
        },
        {
            "label": "Project",
            "key": "field_166",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_10",
                "has": "one",
                "belongs_to": "many"
            }
        },
        {
            "label": "Project Item",
            "key": "field_171",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_17"
            }
        }
    ]
};

/*******************************************************************************************************
Database Objects - Projcts
*******************************************************************************************************/

var Projects = {
  "key" : "object_14",
  "name" : "projects",
    "fields": [
        {
            "label": "Organization",
            "key": "field_122",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_13"
            }
        },
        {
            "label": "Contacts",
            "key": "field_121",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "many",
                "object": "object_1"
            }
        },
        {
            "label": "Name",
            "key": "field_90",
            "required": false,
            "type": "short_text"
        },
        {
            "label": "Pipeline Status",
            "key": "field_124",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Opportunity",
                "Bid",
                "Won",
                "Active",
                "Complete",
                "Archive"
            ]
        },
        {
            "label": "Project Type",
            "key": "field_117",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "First Choice",
                "Second Choice",
                "Third Choice"
            ]
        },
        {
            "label": "Description",
            "key": "field_96",
            "required": false,
            "type": "paragraph_text"
        },
        {
            "label": "Proposal Due Date",
            "key": "field_97",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "Budget",
            "key": "field_114",
            "required": false,
            "type": "currency"
        },
        {
            "label": "Rating",
            "key": "field_115",
            "required": false,
            "type": "rating"
        },
        {
            "label": "Probability of Winning",
            "key": "field_175",
            "required": false,
            "type": "multiple_choice",
            "choices": [
                "Unknown",
                "High",
                "Medium",
                "Low"
            ]
        },
        {
            "label": "Forecasted Close Date",
            "key": "field_136",
            "required": false,
            "type": "date_time"
        },
        {
            "label": "User Responsible",
            "key": "field_137",
            "required": false,
            "type": "connection",
            "relationship": {
                "object": "object_4",
                "has": "one",
                "belongs_to": "many"
            }
        },
        {
            "label": "Site",
            "key": "field_149",
            "required": false,
            "type": "connection",
            "relationship": {
                "belongs_to": "many",
                "has": "one",
                "object": "object_16"
            }
        }
    ]
} ;
