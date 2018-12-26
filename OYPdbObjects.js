
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
                var fldId = getFieldProperty(dbObject, fields[i] , "key") ;
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
function getFieldProperty(dbObject, label, property ) {

    try {

        var fields = dbObject.fields;
        if ( fields == underfined ){
            logMessage (dbObject.name + " Fields property not defined for key - " + key) ;
            return ;
        }

        for (var i =0, fields.length , i++)
        {
          if (fields[i].label == label)
             retun fields[i].[property] ;
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

var dbContacts =
{
    "key" : "object_1",
    "name" : "contacts"
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
