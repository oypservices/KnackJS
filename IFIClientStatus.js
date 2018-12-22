
/*******************************************************************************************************
 logStatusChanges every time the client record is updated, if needed
*******************************************************************************************************/




function logStatusChange (event, view, recordClient) {
try {

    var viewName = view["key"] ;
    var objClient = Knack.models[viewName].toJSON();
    console.dir (objClient);

    var clientId = objClient.id ;
    var clientStatus = objClient[dbClients.ClientStatus_raw][0].identifier ;
    var clientStatusNote = objClient[dbClients.ClientStatusNote] ;
    var beaconStartDate = objClient[dbClients.BeaconStartDate] ;
    var beaconEndDate = objClient[dbClients.BeaconEndDate] ;

    var curClientStatus  = {
      "field_336": clientId ,
      "field_331": clientStatus,
      "field_332": clientStatusNote,
      "field_333": beaconStartDate ,
      "field_334":beaconEndDate  //,
//      "field_335"
    } ;
    console.dir (curClientStatus);

    //get the last statud history record for the clientId
    var resource = 'knackobject';
    var getapidata =  {
      "method": "get",
      "knackobj": dbObjects.ClientStatusHistory,
      "appid": app_id ,
      "page":"1",
      "rows_per_page":"1",
      "sort_field": dbClientStatusHistory.StatusDate,
      "sort_order":"desc",
      "filters": [ {
          "field":dbClientStatusHistory.Client ,
          "operator":"is",
          "value": clientId
        }
      ]
    }

    console.log ("logStatusChange");
    console.dir (getapidata);

    OYPServicesAPIPost( resource, headers, getapidata )
      .then (resultCSH=> {

            console.log (resultCSH.records.length);
            if (resultCSH.records.length == 0 )
               insertClientStatusHistory (curClientStatus) ;

            else if (resultCSH.records[0] != clientStatus)
               insertClientStatusHistory (curClientStatus) ;

            if (clientStatusNote != "")
              resetClientStatusNote(clientId) ;

      } ) ;

    }
  catch (e)
    {
      logerror ("logStatusChange", e);
    }

}



/**************************************************************************************
 Remove the note field if populated
***************************************************************************************/

function resetClientStatusNote (clientId)
{
    try {

        var proc = "resetClientStatusNote" ;
        console.log (proc);

        /*Update the client record, set the clientsatusnote to null */

        var resource = 'knackobject';
        var postapidata = {
              "method": "put",
              "knackobj": dbObjects.Clients ,
              "appid": app_id,
              "record":  { field_328 : " " } ,
              "id" : clientId
       };
       console.dir (postapidata);

       OYPServicesAPIPost( resource, headers, postapidata )
           .then (resultDocAdded=> {
                               console.dir (resultDocAdded) ;
                               console.log('Client Status Reset!!!');
                             }) ;

    }
     catch (e) {
      logerror (proc, e);
    }

}



/**************************************************************************************
 Insert a status history record
***************************************************************************************/

function insertClientStatusHistory (curClientStatus)
{
    try {

        var proc = "insertClientStatusHistory" ;
        console.log (proc);
        console.log (curClientStatus.field_331) ;

        if (curClientStatus.field_331 != "Authorization Approved") {
           //delete the dates, if this is not the beacon authorization status
            delete curClientStatus.field_333;
            delete curClientStatus.field_334;
        }

        console.dir (curClientStatus);
        var resource = 'knackobject';
        var postapidata = {
              "method": "post",
              "knackobj": dbObjects.ClientStatusHistory ,
              "appid": app_id,
              "record":  curClientStatus
      };
      console.dir (postapidata);
       OYPServicesAPIPost( resource, headers, postapidata )
           .then (resultDocAdded=> {
                               console.dir (resultDocAdded) ;
                               console.log('Client Status History Added!!!');
                             }) ;
        }
   catch (e) {
      logerror (proc, e);
    }
}
