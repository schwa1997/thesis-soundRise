function getCurrentDimension() {
  if (typeof window !== "undefined") {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  } else {
    // Handle the case where window is not available, e.g., provide default values
    return {
      width: 1000,
      height: 1000,
    };
  }
}

/*********************** variable PART ***********************/

const height = getCurrentDimension().height;
const width = getCurrentDimension().width;

const minVol = 2;
const maxVol = 50;

const minPitch = 150;
const maxPitch = 500;

const minRad = 40;
const maxRad = 140;

/*********************** rad PART ***********************/

function setRad(volume) {
  if (volume <= minVol) {
    return minRad;
  }
  if (volume >= maxVol) {
    return maxRad;
  }
  return minRad + Math.round((volume * (maxRad - minRad)) / (maxVol - minVol));
}

/*********************** yC PART ***********************/

const usable_height =
  getCurrentDimension().height -
  Math.round((getCurrentDimension().height * 30) / 100);

// punto più basso = > quando pitch è <= 100      250
const lowest_pitch = usable_height / 2;
// punto più alto = > quando pitch è >= 600       -250
const highest_pitch = -lowest_pitch;

function setPosPitch(pitch) {
  if (pitch <= minPitch) {
    return lowest_pitch;
  }
  if (pitch >= maxPitch) {
    return highest_pitch;
  }
  return (
    lowest_pitch -
    Math.round(
      ((pitch - minPitch) * (lowest_pitch - highest_pitch)) /
        (maxPitch - minPitch)
    )
  );
}

/******************** VOCALI ************************ */
function getVocali() {}

// Export the functions to make them accessible in other files
module.exports = {
  setRad,
  setPosPitch,
  minVol,
  maxVol,
  minPitch,
  maxPitch,
  minRad,
  height,
  width,
};
