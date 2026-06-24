/* ================================================================
   DEVSHOP CHALLENGE — STREAK TRACKER 🔥
   ----------------------------------------------------------------
   Early-finisher upgrades included:
     • A 4th+ milestone state (🏆 LEGENDARY at 20, 👑 MAX at the cap)
     • Compound conditions with &&  (jackpot roll + earning freezes)
     • Edge cases (streak capped at a max, exact-0 reset)
     • Bonus logic (rare 🎰 jackpot — a correct answer counts double)
     • UI variation (the streak number changes color by state)
     • 🧊 Streak Freeze — absorbs a wrong answer so your streak lives
================================================================ */


// STEP 1: GRAB YOUR DOM ELEMENTS
const statLabel = document.getElementById("statLabel");
const statValue = document.getElementById("statValue");
const message = document.getElementById("message");
const answerBtn = document.getElementById("answerBtn");
const resetBtn = document.getElementById("resetBtn");
const freezeBtn = document.getElementById("freezeBtn");
const extraStats = document.getElementById("extraStats");
const devLog = document.getElementById("devLog");


// STEP 2: GAME STATE VARIABLES
let streak = 0;       // 🔥 current streak
let bestStreak = 0;   // 🏆 record to beat
let freezes = 0;      // 🧊 streak freezes held in reserve


// STEP 3: CONSTANTS (thresholds + limits)
const MAX_STREAK = 25;        // edge case: streak can never go above this
const JACKPOT_CHANCE = 0.1;   // 🎰 10% of correct answers count double


// STEP 4: SIMULATE A "CORRECT" OR "INCORRECT" ANSWER
function isAnswerCorrect() {
  return Math.random() > 0.5;
}


// Helper: repaint the screen — number color, freeze count, best streak.
function updateUI() {
  statValue.textContent = streak;

  // UI VARIATION: color the streak number by which state we're in.
  if (streak >= 20)      statValue.style.color = "#f5b301"; // gold
  else if (streak >= 10) statValue.style.color = "#e03131"; // red hot
  else if (streak >= 5)  statValue.style.color = "#fd7e14"; // orange
  else if (streak >= 1)  statValue.style.color = "#2f9e44"; // green
  else                   statValue.style.color = "#868e96"; // grey (zero)

  extraStats.textContent = `🧊 Freezes: ${freezes} · 🏆 Best: ${bestStreak}`;
}


// STEP 5: GAME LOGIC
function handleAnswer() {
  const correct = isAnswerCorrect();

  // BONUS LOGIC + COMPOUND CONDITION (&&): a correct answer occasionally
  // hits the jackpot and counts DOUBLE — must be correct AND win the roll.
  const jackpot = correct && Math.random() < JACKPOT_CHANCE;

  if (correct) {
    streak += jackpot ? 2 : 1;

    // EDGE CASE: don't let the streak grow above the max.
    if (streak >= MAX_STREAK) {
      streak = MAX_STREAK;
    }

    // Track the record.
    if (streak > bestStreak) {
      bestStreak = streak;
    }

    // COMPOUND CONDITION (&&): earn a 🧊 freeze on every 5th streak.
    if (streak >= 5 && streak % 5 === 0) {
      freezes++;
    }
  } else {
    // 🧊 STREAK FREEZE: a wrong answer normally resets you to 0, but if you
    // have a freeze in reserve it gets used up and your streak survives.
    if (freezes > 0 && streak > 0) {
      freezes--;            // freeze absorbs the loss
    } else {
      streak = 0;           // EDGE CASE: back to exactly 0
    }
  }

  // MILESTONE CHAIN (uses >= and ===, with 6 outcomes incl. the 4th+ tiers).
  if (!correct && streak > 0) {
    // wrong answer but streak survived -> a freeze must have saved it
    message.textContent = `🧊 Streak Freeze used! Your ${streak} streak is safe.`;
  } else if (streak >= MAX_STREAK) {
    message.textContent = `👑 MAX STREAK! You maxed out at ${streak}!`;
  } else if (streak >= 20) {
    message.textContent = `🏆 LEGENDARY! ${streak} in a row!`;
  } else if (streak >= 10) {
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

  // Shout about the jackpot on top of whatever message we set.
  if (jackpot) {
    message.textContent = "🎰 JACKPOT! Double streak! " + message.textContent;
  }

  // STEP 6: UPDATE THE SCREEN
  updateUI();

  console.log("streak:", streak, "| correct?", correct, "| jackpot?", jackpot, "| freezes:", freezes);
  devLog.textContent = `streak=${streak} | correct=${correct} | jackpot=${jackpot} | freezes=${freezes} | best=${bestStreak}`;
}


// Stock up a 🧊 streak freeze so you can see it protect your streak.
function handleAddFreeze() {
  freezes++;
  message.textContent = `🧊 Streak Freeze added! You now have ${freezes}.`;
  updateUI();
}


// STEP 7: RESET BUTTON (state first, then the screen)
function handleReset() {
  streak = 0;
  bestStreak = 0;
  freezes = 0;

  message.textContent = "Press \"Answer\" to begin!";
  updateUI();
  devLog.textContent = "Waiting for input...";

  console.log("Game state reset.");
}


// STEP 8: EVENT LISTENERS
answerBtn.addEventListener("click", handleAnswer);
freezeBtn.addEventListener("click", handleAddFreeze);
resetBtn.addEventListener("click", handleReset);


// Paint the starting state when the page loads.
updateUI();
