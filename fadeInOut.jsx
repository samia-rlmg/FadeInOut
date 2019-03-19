//This script ingests a text file and creates a new text layer for each line.
// Steps:
// 1. Save this script in any location.
// 2. Highlight (or click into) the relevant composition.
// 3. Highlight the layers you want to add fades to.
// 4. Go to File > Scripts > Run Script File and select this script (wherever you saved it).
// 5. The script will prompt you to enter the number of frames to fade across.

// Only proceed if active comp exists
var activeComp = app.project.activeItem;
if (activeComp != null) {

  //Ask the user to specify the number of frames to fade across.
  var numFrames = prompt("Specify the number of frames to use for fade-in/fade-out.", 5);
  var numFramesInSec = numFrames * activeComp.frameDuration; // Convert number of frames to time in seconds.

  var selectedLayers = activeComp.selectedLayers; //Save selected layers in an array.
  // Loop through selected layers and make substitution

  if (selectedLayers.length > 0) {
    for (var i = 0; i < selectedLayers.length; i++) {
      var inpoint = selectedLayers[i].inPoint; //inpoint in seconds
      var outpoint = selectedLayers[i].outPoint; //outpoint in seconds
      selectedLayers[i].opacity.setValueAtTime(inpoint, 0);
      selectedLayers[i].opacity.setValueAtTime(inpoint+numFramesInSec, 100);
      selectedLayers[i].opacity.setValueAtTime(outpoint-numFramesInSec, 100);
      selectedLayers[i].opacity.setValueAtTime(outpoint, 0);
    }
  } else {
    alert("At least one layer must be selected.");
  }
} else {
  alert("You must have one active composition.");
}
