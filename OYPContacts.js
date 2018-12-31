
/**************************************************************************************
 For each new contact to contact link, add the link to the respective contact records
***************************************************************************************/


function addContactRelationships (event, view, record)  {
try {

    var viewName = view["key"] ;
    var objContactLink = Knack.models[viewName].toJSON();
    console.dir (objContactLink);

    var linkId = objContactLink.id;

    var contactKey =  getFieldKey(dbContacttoContactLinks, "Contact") + "_raw";
    var contactLinkedKey =  getFieldKey(dbContacttoContactLinks, "Linked Contact") + "_raw";

    console.log (contactKey) ;
    console.log (contactLinkedKey) ;

    var contactId =  objContactLink[contactKey][0].id;
    console.log (contactId);

    var linkedContactid = objContactLink[contactLinkedKey][0].id  ;
    console.log  (linkedContactid) ;

    console.log (linkId) ;

    var contact =  [ contactId, linkedContactid] ;
    console.dir (contact) ;

    for (n = 1 ; n < contact.length ; n++) {
        addEachRelationship ( contact[n],  linkId) ;

    }


 }
 catch (e) {
          logerror (e);
        }
 }


/**************************************************************************************
Retrieve the contact and add the link
***************************************************************************************/
function addEachRelationship(contact, linkId)
{
    try {

        var apidata = {
              "method": "get",
              "knackobj": dbContacts.key,
              "appid": app_id,
              "id" : contact
              };


        OYPKnackAPICall (headers,  apidata)
                .then (result => {

                    console.dir (result) ;
                    if ( result == undefined)
                       return ;

                    var field_258 = result.field_258.raw;
                    if (field_258 == null)
                        field_258 = [{ "id" : contact }]     ;
                    else
                      field_258.push ( { "id" : contact }) ;

                    apidata.record = field_258;
                    apidata.method = "put" ;
                    console.dir (apiddate) ;
                    OYPKnackAPICall (headers,  apidata) ;
                });


        }
   catch (e) {
      logerror (e);
    }
}
