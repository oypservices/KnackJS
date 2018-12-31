
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
    var contactLinkedKey =  getFieldKey(dbContacttoContactLinks, "Linkded Contact") + "_raw";

    var contact =  [ objContactLink[contactKey[0].id] , objContactLink[contactLinkedKey[0].id] ] ;
    for (n = 0 ; n < contact.length ; n++) {
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
                    if ( result != undefined)
                      var field_258 = result.field_258.raw;

                    field_258.push ( { "id" : contact })

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
