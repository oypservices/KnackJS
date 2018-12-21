
/***********************************************************************************8
 Add the defualt set of intake documments to the client
*************************************************************************************/

function SetDefaultIntakeDocuments (clientID, documentCategory) {

  try {

    var minor = "Intake - All Adults";
    if ( documentCategory != 'Adult' )
       minor = "Intake - All Minors" ;

    console.log (documentCategory) ;


    var resource = 'knackobject';
    var getapidata =  {
      "method": "get",
      "knackobj": dbObjects.Documents,
      "appid": app_id ,
      "filters": { "match": "or",
        "rules" : [ {
                  "field": dbDocuments.DocumentCategory,
                  "operator":"is",
                  "value": "Intake - Everyone"
                },
                { "field": dbDocuments.DocumentCategory,
                "operator":"is",
                "value": "Intake - " + documentCategory
              },
              { "field": dbDocuments.DocumentCategory,
              "operator":"is",
              "value": minor
              }
             ]
          }
    }

    console.dir (getapidata);

    OYPServicesAPIPost( resource, headers, getapidata )
      .then (resultDocumeents=> { addDocumentstoClient (resultDocumeents, clientID)  } ) ;

  }
  catch (e) {
      logerror ("SetDefaultIntakeDocuments", e);
    }
}


/**************************************************************************************
Add each of the default intake document
***************************************************************************************/

function addDocumentstoClient (resultDocuments, clientID)
{
    try {

        console.log ("addDocumentstoclient") ;
        console.dir(resultDocuments) ;
        var resource = 'knackobject';

        if (resultDocuments.records.length > 0 )
        {

          for (var i = 0; i < resultDocuments.records.length ; i++) {
              var postapidata = {
                    "method": "post",
                    "knackobj": dbObjects.ClientIntakeDocuments ,
                    "appid": app_id,
                    "record":  {
                      "field_185" :  clientID ,
                      "field_178" : resultDocuments.records[i][dbDocuments.DocumentName],
                      "field_295_raw"  : resultDocuments.records[i][dbDocuments.File + "_raw"] ,
                      "field_295_raw.field_key" : "field_295" ,
                      "field_296_raw.url"  : resultDocuments.records[i][dbDocuments.File + "_raw.url"]  }
                  };

               OYPServicesAPIPost( resource, headers, postapidata )
                             .then (resultDocAdded=> {
                               console.dir (resultDocAdded) ;
                               console.log('Client Intake Document Added!!!');
                             }) ;
           }

        }
        else {
          console.log ("No Intake Documents found") ;
        }



    } catch (e) {
      logerror ("addDocumentstoClient", e);
    }

    finally {
      return ;
    }

}




function oldSetDefaultIntakeDocuments (clientID, documentCategory) {

  try {




      var filters = [
        // Filter for records with a value for this field in the last three months
        {
          "field": dbDocuments.DocumentCategory,
          "operator":"is",
          "value": documentCategory
        }
      ];

  //Retrieve the standard list of intake documents
  var this_url = api_url + sc_api_client_docs + '/views/' + vw_intact_docs_dflt_list + '/records' + '?filters=' + encodeURIComponent(JSON.stringify(filters));

  $.ajax({
        url: this_url ,
        type: 'GET',
        headers: headers,
        success: function (response) {

          console.dir (response);

          if ( response.records.length == 0)   {
            console.log ("Documents Category Not Found: " + documentCategory) ;
          }

          for (var i = 0; i < response.records.length ; i++) {

            var data = {
                        "field_185" :  clientID ,
                        "field_178" : response.records[i][dbDocuments.DocumentName],
                        "field_295_raw"  : response.records[i][dbDocuments.File + "_raw"] ,
                        "field_295_raw.field_key" : "field_295" ,
                        "field_296_raw.url"  : response.records[i][dbDocuments.File + "_raw.url"] ,
//"field_296_raw"  : response.records[i][dbDocuments.DocumentLink + "_raw"]
                       } ;

            console.dir (data) ;

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


        }  //end success function
      }); //end ajax


    } catch (e) {
      logerror ("SetDefaultIntakeDocuments", e);
    } finally {
      return ;
    }
}
