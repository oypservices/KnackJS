// Change "scene_1" to the scene you want to listen for
$(document).on('knack-scene-render.any', function(event, scene) {
  // Do something after the scene renders
  alert('listener for scene: ' + scene.key);
  console.log (JSON.stringify (scene));
});
