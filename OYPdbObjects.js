
/*******************************************************************************************************
 logStatusChanges every time the client record is updated, if needed
*******************************************************************************************************/
function hideFormFields(view, dbObject, filterfield,  key) {

    try {

        console.dir (dbObject);
        logObject(dbObject) ;
         var conditionalFields = dbObject.conditionalDisplayFields ;
         logObject (conditionalFields);

         if ( conditionalFields == undefined ) {
             logMessage (dbObject["name"] + " conditionalFields property not defined ") ;
             return ;
         }

         var bfound = false ;


         //find the right list based on the field
         for (var n = 0 ; n < conditionalFields.length; n++ ) {
             if (conditionalFields[n].key == filterfield ) {
                conditionalFields = conditionalFields[n].fieldlist ;
                bfound = true ;
                break ;
              }
         }

         //set all list to not visible, so that the selected list can be processed last
          var nSelIndex = -1 ;
          for (var n =0; n < conditionalFields.length; n++ ) {

              var bShow = false
              if ( conditionalFields[n].key == key )
                 nSelIndex = n ;

              logMsg(bShow) ;

                // If this value in the form doesn't equal "SpecificValue" then prevent the form from submitting
              var fields = conditionalFields[n].fields ;
              if (fields == undefined)
                 break ;

              for (var i =0; i < fields.length ; i++)  {
                var fldId = getFieldKey(dbObject, fields[i] ) ;
                if (fldId != undefined)
                   $('#kn-input-' +  fldId).hide();
              }
            }

         //Show the sleccted fields
         if ( nSelIndex > -1)
         {
             fields = conditionalFields[nSelIndex].fields ;
             for (var i =0; i < fields.length ; i++)  {
               var fldId = getFieldKey(dbObject, fields[i] ) ;
               if (fldId != undefined)
                  $('#kn-input-' +  fldId).show();
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

        console.dir (dbObject);
        logObject(dbObject) ;
        var fields = dbObject["fields"];
        console.dir (fields) ;
        if ( fields == undefined ){
            logMessage (dbObject["name"] + " Fields property not defined") ;
            return ;
        }

        for (var i =0; i < fields.length ; i++)
        {
          if (fields[i].label == label)
             return fields[i].key ;
        }

       logMessage (dbObject["name"]+ " field not found - " + label) ;
       return "" ;

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

    "conditionalDisplayFields" :
          [{ "key" : "Contact Type" , "fieldlist" : [
                    {"key" : "Person" , "fields" : ["Contact Name", "Salutation", "DateOfBirth", "O"] },
                    { "key" : "Organization" , "fields" :  ["Organization Name", "Industry"] }
                  ]},
           {"key": "Roles" , "fieldlist" : [
                    { "key" :"System" , "fields" : ["User", "Site", "Contact Name Expression"] }
                  ] }
      ] ,

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

var dbActivities = {
  "key" : "object_2",
  "name" : "activities",
  "conditionalDisplayFields" :[{
          "key" :"Activity Type" , "fieldlist" :  [
          {"key" : "Task" , "fields" : ["Add Task or Meeting", "Activity Sub Type", "Due Date", "Task Status","Task Update"] },
          { "key" : "Meeting" , "fields" :  ["Add Task or Meeting", "Activity Sub Type", "Due Date", "Task Status","Task Update"] }
        ] },

        { "key" :"Activity Associated With" , "fieldlist" :  [
                {"key" : "A Project" , "fields" : ["Project"] },
                { "key" : "A Contact" , "fields" :  ["Contact"] }
              ] },

        { "key": "Roles"  , "fieldlist" : [
          { "key" :"System" , "fields" : ["User", "Site", "Contact Name Expression"] }
        ] },
    ] ,
      "fields": [
        {
                   "label": "Activity Associated With",
                   "key": "field_233",
                   "required": false,
                   "type": "multiple_choice",
                   "choices": [
                       "A Project",
                       "A Contact",
                       "General"
                   ]
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
              "label": "Date",
              "key": "field_34",
              "required": false,
              "type": "date_time"
          },
          {
              "label": "Activity Type",
              "key": "field_150",
              "required": false,
              "type": "connection",
              "relationship": {
                  "belongs_to": "many",
                  "has": "one",
                  "object": "object_27"
              }
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
              "label": "Activity Sub Type",
              "key": "field_42",
              "required": false,
              "type": "connection",
              "relationship": {
                  "belongs_to": "many",
                  "has": "one",
                  "object": "object_28"
              }
          },
          {
              "label": "Due Date",
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
          }
      ]
  };



  /*******************************************************************************************************
  Database Objects - Projcts
  *******************************************************************************************************/

  var dbContacttoContactLinks = {
    "key" : "object_25",
    "name" : "projects",
    "fields" : {
      "object": {
          "key": "object_25",
          "name": "Contact to Contact Links",
          "conns": [],
          "_id": "5c25405475fe8908c3027734",
          "identifier": "field_259",
          "tasks": [],
          "sort": {
              "field": "field_259",
              "order": "asc"
          },
          "status": "current",
          "fields": [
              {
                  "key": "field_259",
                  "object_key": "object_25",
                  "name": "Contact to Contact Name",
                  "format": {
                      "equation": "{field_211.field_194}   / {field_212.field_194}",
                      "mark_decimal": "period",
                      "formula_field": "Field",
                      "count_field": "Connection",
                      "equation_type": "numeric"
                  },
                  "_id": "5c297fc89dcec12ce72bc9b9",
                  "validation": null,
                  "rules": null,
                  "conditional": false,
                  "user": false,
                  "unique": false,
                  "required": false,
                  "type": "concatenation"
              },
              {
                  "key": "field_211",
                  "relationship": {
                      "belongs_to": "many",
                      "has": "one",
                      "object": "object_1"
                  },
                  "name": "Contact",
                  "_id": "5c25406b2e4ad0235eed7d5f",
                  "format": {
                      "conn_default": "none",
                      "input": ""
                  },
                  "object_key": "object_25",
                  "validation": null,
                  "rules": null,
                  "conditional": false,
                  "user": false,
                  "unique": false,
                  "required": true,
                  "type": "connection"
              },
              {
                  "key": "field_212",
                  "relationship": {
                      "belongs_to": "many",
                      "has": "one",
                      "object": "object_1"
                  },
                  "name": "Linked Contact",
                  "_id": "5c2540792e4ad0235eed7dc3",
                  "format": {
                      "conn_default": "none",
                      "input": ""
                  },
                  "object_key": "object_25",
                  "validation": null,
                  "rules": null,
                  "conditional": false,
                  "user": false,
                  "unique": false,
                  "required": true,
                  "type": "connection"
              },
              {
                  "key": "field_213",
                  "relationship": {
                      "belongs_to": "many",
                      "has": "one",
                      "object": "object_24"
                  },
                  "name": "Link Relationship Type",
                  "_id": "5c2540b9e9b73c22bf8b22e7",
                  "object_key": "object_25",
                  "validation": [],
                  "rules": [],
                  "conditional": false,
                  "user": false,
                  "unique": false,
                  "required": false,
                  "type": "connection"
              }
          ],
          "connections": {
              "outbound": [
                  {
                      "object": "object_1",
                      "key": "field_211",
                      "name": "Contact",
                      "field": {
                          "name": "Contact",
                          "inflections": {
                              "singular": "Contact",
                              "plural": "Contacts"
                          }
                      },
                      "has": "one",
                      "belongs_to": "many"
                  },
                  {
                      "object": "object_1",
                      "key": "field_212",
                      "name": "Linked Contact",
                      "field": {
                          "name": "Linked Contact",
                          "inflections": {
                              "singular": "Linked Contact",
                              "plural": "Linked Contacts"
                          }
                      },
                      "has": "one",
                      "belongs_to": "many"
                  },
                  {
                      "object": "object_24",
                      "key": "field_213",
                      "name": "Link Relationship Type",
                      "field": {
                          "name": "Link Relationship Type",
                          "inflections": {
                              "singular": "Link Relationship Type",
                              "plural": "Link Relationship Types"
                          }
                      },
                      "has": "one",
                      "belongs_to": "many"
                  }
              ],
              "inbound": [
                  {
                      "object": "object_1",
                      "key": "field_258",
                      "name": "Contact Links",
                      "field": {
                          "name": "Contact Links",
                          "inflections": {
                              "singular": "Contact Link",
                              "plural": "Contact Links"
                          }
                      },
                      "has": "many",
                      "belongs_to": "many"
                  }
              ]
          },
          "inflections": {
              "singular": "Contact to Contact Link",
              "plural": "Contact to Contact Links"
          },
          "user": false
      }
  }


/*******************************************************************************************************
Database Objects - Projcts
*******************************************************************************************************/

var dbProjects = {
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
