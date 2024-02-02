let bStart, bPause, bResume, bStop;

let pChosenSides, sChosenSides;
let pSavageSides, sSavageSides;
let pDifficulty, sDifficulty;
let pThrows, sThrows;
let pIterations, sIterations;

let chosenSides;
let savageSides;
let difficulty;
let throws;
let iterations;
let running;

let iterationCounts;
let totalCounts;

let panelW, panelH;
let panelHalfW, panelHalfH;

let chosenBarW;
let savageBarW;

function setupSimulation() {
  chosenSides = sChosenSides.value();
  savageSides = sSavageSides.value();
  difficulty = sDifficulty.value();
  throws = sThrows.value();
  iterations = sIterations.value();

  resetIterationCounts();
  resetTotalCounts();

  chosenBarW = Math.floor(panelW / chosenSides);
  savageBarW = Math.floor(panelW / savageSides);
}

function resetIterationCounts() {
  iterationCounts = {
    index: 0,
    criticalFailures: 0,

    chosenSides: [],
    savageSides: [],

    chosenSuccesses: 0,
    savageSuccesses: 0,

    chosenFailures: 0,
    savageFailures: 0,

    chosenExplosions: 0,
    savageExplosions: 0,

    chosenOverSuccesses: 0,
    savageOverSuccesses: 0
  };

  for (let i = 0; i < chosenSides; ++i) {
    iterationCounts.chosenSides.push(0);
  }

  for (let i = 0; i < savageSides; ++i) {
    iterationCounts.savageSides.push(0);
  }
}

function resetTotalCounts() {
  totalCounts = {
    index: 0,
    criticalFailures: 0,

    chosenSides: [],
    savageSides: [],

    chosenSuccesses: 0,
    savageSuccesses: 0,

    chosenFailures: 0,
    savageFailures: 0,

    chosenExplosions: 0,
    savageExplosions: 0,

    chosenOverSuccesses: 0,
    savageOverSuccesses: 0
  };

  for (let i = 0; i < chosenSides; ++i) {
    totalCounts.chosenSides.push(0);
  }

  for (let i = 0; i < savageSides; ++i) {
    totalCounts.savageSides.push(0);
  }
}

function startSimulation() {
  bStart.attribute('disabled', '');
  bPause.removeAttribute('disabled');
  bResume.attribute('disabled', '');
  bStop.removeAttribute('disabled');

  sChosenSides.attribute('disabled', '');
  sSavageSides.attribute('disabled', '');
  sDifficulty.attribute('disabled', '');
  sThrows.attribute('disabled', '');
  sIterations.attribute('disabled', '');

  setupSimulation();

  running = true;

  loop();
}

function pauseSimulation() {
  bStart.attribute('disabled', '');
  bPause.attribute('disabled', '');
  bResume.removeAttribute('disabled');
  bStop.removeAttribute('disabled');

  noLoop();
}

function resumeSimulation() {
  bStart.attribute('disabled', '');
  bPause.removeAttribute('disabled');
  bResume.attribute('disabled', '');
  bStop.removeAttribute('disabled');

  loop();
}

function stopSimulation() {
  bStart.removeAttribute('disabled');
  bPause.attribute('disabled', '');
  bResume.attribute('disabled', '');
  bStop.attribute('disabled', '');

  sChosenSides.removeAttribute('disabled');
  sSavageSides.removeAttribute('disabled');
  sDifficulty.removeAttribute('disabled');
  sThrows.removeAttribute('disabled');
  sIterations.removeAttribute('disabled');

  running = false;

  noLoop();
}

function addIterationToTotal() {
  totalCounts.criticalFailures += iterationCounts.criticalFailures;

  for (let i = 0; i < iterationCounts.chosenSides.length; ++i) {
    totalCounts.chosenSides[i] += iterationCounts.chosenSides[i];
  }

  for (let i = 0; i < iterationCounts.savageSides.length; ++i) {
    totalCounts.savageSides[i] += iterationCounts.savageSides[i];
  }

  totalCounts.chosenSuccesses += iterationCounts.chosenSuccesses;
  totalCounts.savageSuccesses += iterationCounts.savageSuccesses;

  totalCounts.chosenFailures += iterationCounts.chosenFailures;
  totalCounts.savageFailures += iterationCounts.savageFailures;

  totalCounts.chosenExplosions += iterationCounts.chosenExplosions;
  totalCounts.savageExplosions += iterationCounts.savageExplosions;

  totalCounts.chosenOverSuccesses += iterationCounts.chosenOverSuccesses;
  totalCounts.savageOverSuccesses += iterationCounts.savageOverSuccesses;
}

function rollDie(sides) {
  return Math.floor(random(1, sides + 1));
}

function setup() {
  createCanvas(1280, 960);

  bStart = createButton('START');
  bStart.mousePressed(startSimulation);

  bPause = createButton('PAUSE');
  bPause.mousePressed(pauseSimulation);
  bPause.attribute('disabled', '');

  bResume = createButton('RESUME');
  bResume.mousePressed(resumeSimulation);
  bResume.attribute('disabled', '');

  bStop = createButton('STOP');
  bStop.mousePressed(stopSimulation);
  bStop.attribute('disabled', '');

  pChosenSides = createP('Chosen sides: 4');
  sChosenSides = createSlider(1, 100, 4, 1);
  sChosenSides.changed(() => pChosenSides.html('Chosen sides: ' + sChosenSides.value()));

  pSavageSides = createP('Savage sides: 6');
  sSavageSides = createSlider(1, 100, 6, 1);
  sSavageSides.changed(() => pSavageSides.html('Savage sides: ' + sSavageSides.value()));

  pDifficulty = createP('Difficulty: 4');
  sDifficulty = createSlider(2, 100, 4, 1);
  sDifficulty.changed(() => pDifficulty.html('Difficulty: ' + sDifficulty.value()));

  pThrows = createP('Throws: 10000');
  sThrows = createSlider(1000, 100000, 10000, 1000);
  sThrows.changed(() => pThrows.html('Throws: ' + sThrows.value()));

  pIterations = createP('Iterations: 100');
  sIterations = createSlider(10, 1000, 100, 10);
  sIterations.changed(() => pIterations.html('Iterations: ' + sIterations.value()));

  running = false;

  resetIterationCounts();
  resetTotalCounts();

  panelW = Math.floor(width / 2);
  panelH = Math.floor(height / 2);

  panelHalfW = Math.floor(panelW / 2);
  panelHalfH = Math.floor(panelH / 2);

  noLoop();

  startSimulation();
}

function draw() {
  if (!running) {
    return;
  }

  for (let i = 0; i < 10; ++i) {
    let chosenRoll = rollDie(chosenSides);
    let savageRoll = rollDie(savageSides);

    iterationCounts.chosenSides[chosenRoll - 1] += 1;
    iterationCounts.savageSides[savageRoll - 1] += 1;

    if (chosenRoll === 1 && savageRoll === 1) {
      iterationCounts.criticalFailures += 1;
    }

    if (chosenRoll === 1) {
      iterationCounts.chosenFailures += 1;
    }

    if (savageRoll === 1) {
      iterationCounts.savageFailures += 1;
    }

    if (chosenRoll === chosenSides) {
      let sum = chosenRoll;
      let tempRoll;

      do {
        tempRoll = rollDie(chosenSides);
        sum += tempRoll;

        if (tempRoll === 1) {
          iterationCounts.chosenFailures += 1;
        }
        else if (tempRoll >= difficulty) {
          iterationCounts.chosenSuccesses += 1;
        }

        iterationCounts.chosenSides[tempRoll - 1] += 1;
        iterationCounts.chosenExplosions += 1;
      }
      while (tempRoll === chosenSides);

      if (chosenRoll >= difficulty) {
        iterationCounts.chosenSuccesses += 1;
      }

      if (Math.floor((sum - difficulty) / 4) >= 1) {
        iterationCounts.chosenOverSuccesses += 1;
      }
      else if (Math.floor((chosenRoll - difficulty) / 4) >= 1) {
        iterationCounts.chosenOverSuccesses += 1;
      }
    }
    else {
      if (chosenRoll >= difficulty) {
        iterationCounts.chosenSuccesses += 1;
      }

      if (Math.floor((chosenRoll - difficulty) / 4) >= 1) {
        iterationCounts.chosenOverSuccesses += 1;
      }
    }

    if (savageRoll === savageSides) {
      let sum = savageRoll;
      let tempRoll;

      do {
        tempRoll = rollDie(savageSides);
        sum += tempRoll;

        if (tempRoll === 1) {
          iterationCounts.savageFailures += 1;
        }
        else if (tempRoll >= difficulty) {
          iterationCounts.savageSuccesses += 1;
        }

        iterationCounts.savageSides[tempRoll - 1] += 1;
        iterationCounts.savageExplosions += 1;
      }
      while (tempRoll === savageSides);

      if (savageRoll >= difficulty) {
        iterationCounts.savageSuccesses += 1;
      }

      if (Math.floor((sum - difficulty) / 4) >= 1) {
        iterationCounts.savageOverSuccesses += 1;
      }
      else if (Math.floor((savageRoll - difficulty) / 4) >= 1) {
        iterationCounts.savageOverSuccesses += 1;
      }
    }
    else {
      if (savageRoll >= difficulty) {
        iterationCounts.savageSuccesses += 1;
      }

      if (Math.floor((savageRoll - difficulty) / 4) >= 1) {
        iterationCounts.savageOverSuccesses += 1;
      }
    }    

    iterationCounts.index += 1;

    if (iterationCounts.index === throws) {
      addIterationToTotal();

      totalCounts.index += 1;

      if (totalCounts.index === iterations) {
        stopSimulation();
      }
      else {
        resetIterationCounts();
      }
    }
  }

  let iterationChosenThrows = iterationCounts.chosenSides.reduce((t, e) => t + e);
  let iterationSavageThrows = iterationCounts.savageSides.reduce((t, e) => t + e);

  let totalChosenThrows = totalCounts.chosenSides.reduce((t, e) => t + e);
  let totalSavageThrows = totalCounts.savageSides.reduce((t, e) => t + e);

  let p;
  let barW;
  let barH;
  
  background(245);

  // Iteration

  barW = chosenBarW;

  translate(0, 0);

  for (let i = 0; i < chosenSides; ++i) {
    p = iterationCounts.chosenSides[i] / iterationChosenThrows;
    barH = Math.floor(panelHalfH * p);

    fill(255);
    rect(i * barW, panelHalfH - barH, barW, barH);
    fill(0);
    text(Math.round(p * 10000) / 100 + '%', barW * i + 5, panelHalfH - barH - 5);
    text(i + 1, barW * i + 5, panelHalfH - barH - 25);
  }

  barW = savageBarW;

  translate(0, panelHalfH);

  for (let i = 0; i < savageSides; ++i) {
    p = iterationCounts.savageSides[i] / iterationSavageThrows;
    barH = Math.floor(panelHalfH * p);

    fill(255);
    rect(i * barW, panelHalfH - barH, barW, barH);
    fill(0);
    text(Math.round(p * 10000) / 100 + '%', barW * i + 5, panelHalfH - barH - 5);
    text(i + 1, barW * i + 5, panelHalfH - barH - 25);
  }

  barW = Math.floor(panelW / 5);

  translate(panelW, -panelHalfH);

  fill(255, 0, 0);
  p = iterationCounts.chosenFailures / iterationChosenThrows;
  barH = Math.floor(panelHalfH * p);
  rect(0, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', 5, panelHalfH - barH - 5);
  text('Failures', 5, panelHalfH - barH - 25);

  fill(0, 255, 0);
  p = iterationCounts.chosenSuccesses / iterationChosenThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW + 5, panelHalfH - barH - 5);
  text('Successes', barW + 5, panelHalfH - barH - 25);

  fill(0, 0, 255);
  p = iterationCounts.chosenExplosions / iterationChosenThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW * 2, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW * 2 + 5, panelHalfH - barH - 5);
  text('Explosions', barW * 2 + 5, panelHalfH - barH - 25);

  fill(0, 255, 255);
  p = iterationCounts.chosenOverSuccesses / iterationChosenThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW * 3, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW * 3 + 5, panelHalfH - barH - 5);
  text('Over Successes', barW * 3 + 5, panelHalfH - barH - 25);

  fill(255, 255, 0);
  p = iterationCounts.criticalFailures / iterationChosenThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW * 4, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW * 4 + 5, panelHalfH - barH - 5);
  text('Critical Failures', barW * 4 + 5, panelHalfH - barH - 25);

  translate(0, panelHalfH);

  fill(255, 0, 0);
  p = iterationCounts.savageFailures / iterationSavageThrows;
  barH = Math.floor(panelHalfH * p);
  rect(0, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', 5, panelHalfH - barH - 5);
  text('Failures', 5, panelHalfH - barH - 25);

  fill(0, 255, 0);
  p = iterationCounts.savageSuccesses / iterationSavageThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW + 5, panelHalfH - barH - 5);
  text('Successes', barW + 5, panelHalfH - barH - 25);

  fill(0, 0, 255);
  p = iterationCounts.savageExplosions / iterationSavageThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW * 2, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW * 2 + 5, panelHalfH - barH - 5);
  text('Explosions', barW * 2 + 5, panelHalfH - barH - 25);

  fill(0, 255, 255);
  p = iterationCounts.savageOverSuccesses / iterationSavageThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW * 3, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW * 3 + 5, panelHalfH - barH - 5);
  text('Over Successes', barW * 3 + 5, panelHalfH - barH - 25);

  fill(255, 255, 0);
  p = iterationCounts.criticalFailures / iterationSavageThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW * 4, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW * 4 + 5, panelHalfH - barH - 5);
  text('Critical Failures', barW * 4 + 5, panelHalfH - barH - 25);

  // Total

  barW = chosenBarW;

  translate(-panelW, panelHalfH);

  for (let i = 0; i < chosenSides; ++i) {
    p = totalCounts.chosenSides[i] / totalChosenThrows;
    barH = Math.floor(panelHalfH * p);

    fill(255);
    rect(i * barW, panelHalfH - barH, barW, barH);
    fill(0);
    text(Math.round(p * 10000) / 100 + '%', barW * i + 5, panelHalfH - barH - 5);
    text(i + 1, barW * i + 5, panelHalfH - barH - 25);
  }

  barW = savageBarW;

  translate(0, panelHalfH);

  for (let i = 0; i < savageSides; ++i) {
    p = totalCounts.savageSides[i] / totalSavageThrows;
    barH = Math.floor(panelHalfH * p);

    fill(255);
    rect(i * barW, panelHalfH - barH, barW, barH);
    fill(0);
    text(Math.round(p * 10000) / 100 + '%', barW * i + 5, panelHalfH - barH - 5);
    text(i + 1, barW * i + 5, panelHalfH - barH - 25);
  }

  barW = Math.floor(panelW / 5);

  translate(panelW, -panelHalfH);

  fill(255, 0, 0);
  p = totalCounts.chosenFailures / totalChosenThrows;
  barH = Math.floor(panelHalfH * p);
  rect(0, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', 5, panelHalfH - barH - 5);
  text('Failures', 5, panelHalfH - barH - 25);

  fill(0, 255, 0);
  p = totalCounts.chosenSuccesses / totalChosenThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW + 5, panelHalfH - barH - 5);
  text('Successes', barW + 5, panelHalfH - barH - 25);

  fill(0, 0, 255);
  p = totalCounts.chosenExplosions / totalChosenThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW * 2, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW * 2 + 5, panelHalfH - barH - 5);
  text('Explosions', barW * 2 + 5, panelHalfH - barH - 25);

  fill(0, 255, 255);
  p = totalCounts.chosenOverSuccesses / totalChosenThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW * 3, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW * 3 + 5, panelHalfH - barH - 5);
  text('Over Successes', barW * 3 + 5, panelHalfH - barH - 25);

  fill(255, 255, 0);
  p = totalCounts.criticalFailures / totalChosenThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW * 4, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW * 4 + 5, panelHalfH - barH - 5);
  text('Critical Failures', barW * 4 + 5, panelHalfH - barH - 25);

  translate(0, panelHalfH);

  fill(255, 0, 0);
  p = totalCounts.savageFailures / totalSavageThrows;
  barH = Math.floor(panelHalfH * p);
  rect(0, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', 5, panelHalfH - barH - 5);
  text('Failures', 5, panelHalfH - barH - 25);

  fill(0, 255, 0);
  p = totalCounts.savageSuccesses / totalSavageThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW + 5, panelHalfH - barH - 5);
  text('Successes', barW + 5, panelHalfH - barH - 25);

  fill(0, 0, 255);
  p = totalCounts.savageExplosions / totalSavageThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW * 2, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW * 2 + 5, panelHalfH - barH - 5);
  text('Explosions', barW * 2 + 5, panelHalfH - barH - 25);

  fill(0, 255, 255);
  p = totalCounts.savageOverSuccesses / totalSavageThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW * 3, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW * 3 + 5, panelHalfH - barH - 5);
  text('Over Successes', barW * 3 + 5, panelHalfH - barH - 25);

  fill(255, 255, 0);
  p = totalCounts.criticalFailures / totalSavageThrows;
  barH = Math.floor(panelHalfH * p);
  rect(barW * 4, panelHalfH - barH, barW, barH);
  fill(0);
  text(Math.round(p * 10000) / 100 + '%', barW * 4 + 5, panelHalfH - barH - 5);
  text('Critical Failures', barW * 4 + 5, panelHalfH - barH - 25);

  if (running) {
    translate(-panelW, -panelH - panelHalfH);

    fill(0);

    text('Throw: ' + (iterationCounts.index), 10, 20);
    text('Iteration: ' + (totalCounts.index), 10, 40);
    text('FPS: ' + Math.round(frameRate() * 10) / 10, 10, 60);
  }
}
