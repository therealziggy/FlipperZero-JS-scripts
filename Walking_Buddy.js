// Required modules
let vgm = require("vgm");
let widget = require("widget");
let dialog = require("dialog");
let math = require("math");
let keyboard = require("keyboard");
let submenu = require("submenu");

// Initialize variables
let stepCount = 0;
let prevMagnitude = 0;
let threshold = 1.0; // Further lowered threshold for detecting a step
let initialPitch = 0, initialRoll = 0, initialYaw = 0;
let textId;
let alpha = 0.15; // Smoothing factor for the low-pass filter
let timeCounter = 0;
let minStepInterval = 1; // Further reduced minimum time interval between steps in terms of loop iterations
let userHeight;
let strideLength;

// Function to calculate the magnitude of acceleration
function calculateMagnitude(pitch, roll, yaw) {
    return math.sqrt(pitch * pitch + roll * roll + yaw * yaw);
}

// Function to apply a low-pass filter to smooth the accelerometer data
function lowPassFilter(currentValue, previousValue) {
    return alpha * previousValue + (1 - alpha) * currentValue;
}

// Function to format a number to three decimal places
function formatToThreeDecimalPlaces(num) {
    let scaled = math.floor(num * 1000);
    let integerPart = math.trunc(scaled / 1000);
    let decimalPart = math.abs(scaled % 1000);
    let decimalStr = to_string(decimalPart);
    while (decimalStr.length < 3) {
        decimalStr = "0" + decimalStr;
    }
    return to_string(integerPart) + "." + decimalStr;
}

// Function to update step count
function updateStepCount() {
    // Get current pitch, roll, and yaw data
    let currentPitch = vgm.getPitch() - initialPitch;
    let currentRoll = vgm.getRoll() - initialRoll;
    let currentYaw = vgm.getYaw() - initialYaw;

    // Apply low-pass filter
    currentPitch = lowPassFilter(currentPitch, prevMagnitude);
    currentRoll = lowPassFilter(currentRoll, prevMagnitude);
    currentYaw = lowPassFilter(currentYaw, prevMagnitude);

    // Calculate the magnitude of the acceleration vector
    let magnitude = calculateMagnitude(currentPitch, currentRoll, currentYaw);

    // Detect steps based on the magnitude threshold and debouncing
    if (math.abs(magnitude - prevMagnitude) > threshold && timeCounter > minStepInterval) {
        stepCount++;
        timeCounter = 0;
    }

    // Update the previous magnitude
    prevMagnitude = magnitude;

    // Increment the time counter
    timeCounter++;
}

// Function to display the step count
function displayStepCount() {
    if (textId) {
        widget.remove(textId);
    }
    textId = widget.addText(10, 30, "Primary", "Steps: " + to_string(stepCount));
}

// Function to calibrate the initial values
function calibrateInitialValues() {
    let pitchSum = 0, rollSum = 0, yawSum = 0;
    let sampleCount = 10;

    // Take multiple samples to get a stable baseline
    for (let i = 0; i < sampleCount; i++) {
        pitchSum += vgm.getPitch();
        rollSum += vgm.getRoll();
        yawSum += vgm.getYaw();
        delay(100); // Small delay between samples
    }

    // Calculate the average of the samples
    initialPitch = pitchSum / sampleCount;
    initialRoll = rollSum / sampleCount;
    initialYaw = yawSum / sampleCount;
    
    // Debug output
    console.log("Calibrated Initial Values - Pitch:", to_string(initialPitch), "Roll:", to_string(initialRoll), "Yaw:", to_string(initialYaw));
}

// Function to display the estimated walking distance and calories burned using submenu
function displayResults() {
    let distanceMeters = stepCount * strideLength; // Calculate distance in meters
    let distanceKm = distanceMeters / 1000; // Convert meters to kilometers
    let distanceFeet = distanceMeters * 3.28084; // Convert meters to feet
    let distanceMiles = distanceFeet / 5280; // Convert feet to miles
    let caloriesBurned = stepCount * 0.04; // Calculate calories burned

    submenu.setHeader("Results");
    submenu.addItem("Steps: " + to_string(stepCount), 0);
    submenu.addItem(to_string(distanceMeters) + " meters" + " (" + formatToThreeDecimalPlaces (distanceKm) + " km)", 1);
    submenu.addItem(to_string(distanceFeet) + " feet" + " (" + formatToThreeDecimalPlaces (distanceMiles) + " miles)", 2);
    submenu.addItem("Calories Burned: " + formatToThreeDecimalPlaces(caloriesBurned), 3);

    submenu.show();

    while (submenu.show() !== undefined) {
        delay(100);
    }
}

// Function to get the user height in centimeters
function getUserHeightInCm() {
    keyboard.setHeader("Enter your height in cm");
    let result = keyboard.text(4 + 1, "165", true); // Allow up to 4 digits for height
    if (result !== undefined) {
        return parse_int(result);
    } else {
        dialog.message("Error", "Invalid height entered. Using default height of 165 cm.");
        return 165;
    }
}

// Function to get the user height in inches and convert to centimeters
function getUserHeightInInches() {
    keyboard.setHeader("Enter your height in inches");
    let result = keyboard.text(4 + 1, "65", true); // Allow up to 4 digits for height
    if (result !== undefined) {
        let heightInInches = parse_int(result);
        return heightInInches * 2.54; // Convert to centimeters
    } else {
        dialog.message("Error", "Invalid height entered. Using default height of 65 inches (165 cm).");
        return 165;
    }
}

// Function to get the user height
function getUserHeight() {
    submenu.setHeader("Select height unit");
    submenu.addItem("Metric (cm)", 0);
    submenu.addItem("Imperial (inches)", 1);
    let result = submenu.show();
    if (result === 0) {
        userHeight = getUserHeightInCm();
    } else if (result === 1) {
        userHeight = getUserHeightInInches();
    } else {
        dialog.message("Error", "No unit selected. Using default height of 165 cm.");
        userHeight = 165;
    }
    strideLength = userHeight * 0.4 / 100; // Calculate stride length in meters
}

// Function to initialize and start the step counting app
function startStepCountingApp() {
    // Get user height
    getUserHeight();

    // Calibrate initial values
    calibrateInitialValues();

    // Show the widget initially
    widget.show();

    // Main loop to update the step count and display every 0.3 seconds
    while (true) {
        updateStepCount();
        displayStepCount();
        delay(300); // Update every 0.3 seconds

        // Check if the user pressed the back button to exit
        if (!widget.isOpen()) {
            displayResults();
            break;
        }
    }
}

// Show an initial dialog to start the app
dialog.message("Walking Buddy", "please put flipper with screen facing up when starting");

// Start the step counting app
startStepCountingApp();
