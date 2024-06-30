// Required modules
let vgm = require("vgm");
let widget = require("widget");
let dialog = require("dialog");

// Function to display the instructional screen
function showInstructionScreen() {
    let instructions = [
        "Welcome to Accelerometer app",
        "Measurement Values:",
        "Pitch: Tilt forward/backward",
        "Roll: Tilt left/right",
        "Yaw: Horizontal rotation",
        "Press OK to start the app"
    ];

    // Display each line of instructions as a separate dialog
    for (let i = 0; i < instructions.length; i++) {
        dialog.message("Instructions", instructions[i]);
    }
}

// Initialize text element IDs
let pitchText, rollText, yawText;

// Capture initial values
let initialPitch = vgm.getPitch();
let initialRoll = vgm.getRoll();
let initialYaw = vgm.getYaw();

// Function to update and display VGM data
function displayVgmData() {
    // Get current pitch, roll, and yaw data
    let currentPitch = vgm.getPitch();
    let currentRoll = vgm.getRoll();
    let currentYaw = vgm.getYaw();

    // Calculate relative values from initial position
    let pitch = currentPitch - initialPitch;
    let roll = currentRoll - initialRoll;
    let yaw = currentYaw - initialYaw;

    // Ensure roll, pitch, yaw are within the expected range
    if (pitch < -180) {
        pitch += 360;
    } else if (pitch > 180) {
        pitch -= 360;
    }
    
    if (roll < -180) {
        roll += 360;
    } else if (roll > 180) {
        roll -= 360;
    }

    if (yaw < -180) {
        yaw += 360;
    } else if (yaw > 180) {
        yaw -= 360;
    }

    // Update the data on the screen
    widget.remove(pitchText);
    widget.remove(rollText);
    widget.remove(yawText);

    pitchText = widget.addText(10, 30, "Secondary", "Pitch: " + to_string(pitch) + "°");
    rollText = widget.addText(90, 30, "Secondary", "Roll: " + to_string(roll) + "°");
    yawText = widget.addText(10, 50, "Secondary", "Yaw: " + to_string(yaw) + "°");
}

// Function to show the main app screen
function showAppScreen() {
    // Initial setup
    widget.addText(10, 10, "Primary", "VGM Data:");
    widget.show();

    // Main loop to update the display every 0.3 seconds
    while (true) {
        displayVgmData();
        delay(300); // Update every 0.3 seconds
    }
}

// Show instruction screen and wait for user confirmation
showInstructionScreen();

// Show the main app screen
showAppScreen();
