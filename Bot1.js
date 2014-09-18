function Bot1() {

var direction;

// Called when the main program
// sends the success message to
// the Web Workers.
this.onmessage = function (event) {

  // The success message is send with
  // the field 'done' (true | false).
  var done = event.data.done;

  // Determine new direction.
  if (done) {
    direction =
      holdOrChangeDirection(direction);
  } else {
    direction = getRandomDirection();
  }

  // Tells the main program the new
  // direction. The direction is sent
  // with the field 'direction'. The
  // ID is sent with the field 'id'.
  return {
    id: event.data.id,
    direction: direction
  };
};

function holdOrChangeDirection(dir) {
  if (Math.random() < 0.05) {
    return getRandomDirection();
  } else {
    return dir;
  }
}

function getRandomDirection() {
  var randomDirection;
  var randomNumber = Math.random();
  if (randomNumber < 0.25) {
    randomDirection = "up";
  } else if (randomNumber < 0.5) {
    randomDirection = "down";
  } else if (randomNumber < 0.75) {
    randomDirection = "left";
  } else {
    randomDirection = "right";
  }
  return randomDirection;
}

}