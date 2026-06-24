/* ================================================================
   DEVSHOP CHALLENGE — STARTER SCRIPT
   ================================================================
   Your job: build the logic behind ONE Duolingo feature.

   Choose ONE:
     ❤️ Lives System
     🔥 Streak Tracker
     🎁 Random Rewards
     ⭐ XP & Scoring System

   This file is scaffolded in 6 steps, matching the game loop:
   Player Action -> Game Logic -> Update Game State -> Give Feedback -> Repeat

   Read every comment before you start typing. Replace anything
   in ALL_CAPS or marked TODO with your own code.
================================================================ */


/* ----------------------------------------------------------------
   STEP 1: GRAB YOUR DOM ELEMENTS
   ----------------------------------------------------------------
   JavaScript can't update what it can't see. These lines connect
   your HTML elements to variables you can control in this file.

   You probably won't need to change this step — these IDs already
   match index.html.
---------------------------------------------------------------- */
const statLabel = document.getElementById("statLabel");
const statValue = document.getElementById("statValue");
const message = document.getElementById("message");
const answerBtn = document.getElementById("answerBtn");
const resetBtn = document.getElementById("resetBtn");
const devLog = document.getElementById("devLog");


/* ----------------------------------------------------------------
   STEP 2: CREATE YOUR GAME STATE VARIABLE(S)
   ----------------------------------------------------------------
   This is the ONE piece of information your feature tracks.

   Ask yourself: what number or value changes as the player plays?

   Use `let`, not `const` — this value is going to change!

   Examples (pick the one that matches your feature, or write your own):

     Lives System:     let lives = 3;
     Streak Tracker:   let streak = 0;
     Random Rewards:   let lastReward = 0;
     XP & Scoring:     let xp = 0;

   TODO: Replace the line below with your own state variable.
---------------------------------------------------------------- */
let streak = 0; // 🔥 Streak Tracker — start with no streak


/* ----------------------------------------------------------------
   STEP 3 (OPTIONAL — Random Rewards teams need this):
   CREATE AN ARRAY OF POSSIBLE VALUES
   ----------------------------------------------------------------
   Arrays store multiple values in one variable. If your feature
   involves randomness (like surprise rewards), define your
   options here instead of hardcoding a single value.

   Example:
     const rewardOptions = [10, 15, 20, 50];

   If your feature does NOT use randomness, you can ignore this
   step or delete it.
---------------------------------------------------------------- */
// const rewardOptions = [/* TODO: add your possible values */];


/* ----------------------------------------------------------------
   STEP 4: SIMULATE A "CORRECT" OR "INCORRECT" ANSWER
   ----------------------------------------------------------------
   In a real app, this would come from checking user input.
   For this prototype, we'll randomly decide if the simulated
   answer is correct — this lets you test your logic by clicking
   the button repeatedly.

   You don't need to change this — but make sure you understand it!
     Math.random()       -> a random decimal between 0 and 1
     Math.random() > 0.5 -> true about half the time, false the rest
---------------------------------------------------------------- */
function isAnswerCorrect() {
  return Math.random() > 0.5;
}


/* ----------------------------------------------------------------
   STEP 5: BUILD YOUR GAME LOGIC (THE CORE OF YOUR CHALLENGE)
   ----------------------------------------------------------------
   This function runs every time the player clicks "Submit Answer."

   This is where you turn your IF -> THEN plan into real code.

   Before writing code here, finish this sentence on paper or in
   chat with your team:

     IF ________________________
     THEN ________________________

   Then translate it below. Some starter patterns are shown —
   delete the ones you don't need and build out your own.
---------------------------------------------------------------- */
function handleAnswer() {

  const correct = isAnswerCorrect();

  // --------------------------------------------------------------
  // TODO: Update your game state based on whether the answer
  // was correct or incorrect.
  //
  // Example pattern (Lives System):
  //
  //   if (correct) {
  //     message.textContent = "Correct! Keep going.";
  //   } else {
  //     gameState--;
  //     message.textContent = "Incorrect! You lost a life.";
  //   }
  //
  // Example pattern (Streak Tracker):
  //
  //   if (correct) {
  //     gameState++;
  //     message.textContent = `Nice! Streak is now ${gameState}.`;
  //   } else {
  //     gameState = 0;
  //     message.textContent = "Streak reset. Try again!";
  //   }
  // --------------------------------------------------------------

  if (correct) {
    streak++;            // right answer -> streak grows by 1
  } else {
    streak = 0;          // wrong answer -> streak resets to 0
  }


  // --------------------------------------------------------------
  // TODO: Add at least ONE more condition that checks a MILESTONE.
  // This is separate from the correct/incorrect check above —
  // it reacts to the current STATE, not the most recent action.
  //
  // Ask: what happens when gameState reaches a certain number?
  //
  // Example (Lives System hitting zero):
  //
  //   if (gameState <= 0) {
  //     message.textContent = "Game Over! Resetting...";
  //   }
  //
  // Example (XP hitting a level-up threshold):
  //
  //   if (gameState >= 100) {
  //     message.textContent = "Level Up! 🎉";
  //   } else if (gameState >= 50) {
  //     message.textContent = "Halfway there!";
  //   }
  // --------------------------------------------------------------

  // Milestone check — reacts to the SIZE of the streak (the state),
  // not just the most recent answer. Thresholds chosen by our team.
  if (streak >= 10) {
    message.textContent = `🔥🔥🔥 UNSTOPPABLE! ${streak} in a row!`;
  } else if (streak >= 5) {
    message.textContent = `🔥 You're on fire! Streak of ${streak}.`;
  } else if (streak >= 3) {
    message.textContent = `Streak building... ${streak} correct!`;
  } else if (streak >= 1) {
    message.textContent = `Nice! Streak is ${streak}.`;
  } else {
    message.textContent = "Streak reset — start a new one!";
  }


  // --------------------------------------------------------------
  // STEP 6: UPDATE THE SCREEN
  // --------------------------------------------------------------
  // Remember: changing a variable does NOT change what the player
  // sees. You have to update the DOM separately.
  // --------------------------------------------------------------
  statValue.textContent = streak;

  // This logs to YOUR dev console (in the browser, press F12 to see
  // the real one too) — it's for your team, not the player.
  console.log("Current streak:", streak, "| Correct?", correct);
  devLog.textContent = `streak = ${streak} | last answer correct = ${correct}`;
}


/* ----------------------------------------------------------------
   STEP 7: RESET BUTTON
   ----------------------------------------------------------------
   This puts everything back to its starting point.

   Notice the order:
     1. Reset the STATE (the variable)
     2. Reset the DOM (what the player sees)

   TODO: Update the starting value below to match Step 2.
---------------------------------------------------------------- */
function handleReset() {
  streak = 0; // matches Step 2 starting value

  statValue.textContent = streak;
  message.textContent = "Press \"Answer\" to begin!";
  devLog.textContent = "Waiting for input...";

  console.log("Game state reset.");
}


/* ----------------------------------------------------------------
   STEP 8: EVENT LISTENERS
   ----------------------------------------------------------------
   This connects your buttons to the functions above.
   You shouldn't need to change this part.
---------------------------------------------------------------- */
answerBtn.addEventListener("click", handleAnswer);
resetBtn.addEventListener("click", handleReset);


/* ================================================================
   ✅ CHECKLIST BEFORE YOU SHOWCASE
   ================================================================
   [ ] One state variable that clearly represents your feature
   [ ] At least 2 comparison operators used (>, <, >=, <=, ===)
   [ ] An if / else (or if / else if / else) chain with 3+ outcomes
   [ ] Feedback message updates for the player
   [ ] statLabel in index.html renamed to match your feature
   [ ] Reset button correctly returns everything to start values

   Stuck? Re-read Slide 4 (Example Game Logic) and Slide 7
   (Think Like a Game Designer) — your IF -> THEN sentence should
   turn almost directly into the if-statement you need here.
================================================================ */
