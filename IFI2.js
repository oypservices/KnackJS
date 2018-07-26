var api_url = 'https://api.knack.com/v1/scenes/';
var api_urlpg = 'https://api.knack.com/v1/pages/';
var app_id = Knack.app.id;
var user = Knack.getUserToken();
var headers = { "Authorization": user, "X-Knack-Application-ID": app_id, "Content-Type":"application/json"};


// Change "scene_1" to the scene you want to listen for
$(document).on('knack-scene-render.scene_264', function(event, scene) {
  // Do something after the scene renders
  alert('listener for scene: ' + scene.key);
  console.log (JSON.stringify (scene));
});


// Change "scene_1" to the scene you want to listen for
$(document).on('knack-scene-render.any', function(event, scene) {
  // Do something after the scene renders
  alert('listener for scene: ' + scene.key);
  console.log (JSON.stringify (scene));
});
