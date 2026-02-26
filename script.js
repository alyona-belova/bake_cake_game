let step = 0;
let selectedOptions = {};

const steps = [
  {
    title: "Choose a cake base",
    options: [
      { name: "🕷️", image: "images/spider-base.png", layer: "base" },
      { name: "🐍", image: "images/hp-base.png", layer: "base" },
      { name: "🩷", image: "images/barbie-base.png", layer: "base" },
      { name: "🎤", image: "images/ts-base.png", layer: "base" },
    ],
  },
  {
    title: "Choose cream",
    options: [
      { name: "🕷️", image: "images/spider-cream.png", layer: "cream" },
      { name: "🐍", image: "images/hp-cream.png", layer: "cream" },
      { name: "🩷", image: "images/barbie-cream.png", layer: "cream" },
      { name: "🎤", image: "images/ts-cream.png", layer: "cream" },
    ],
  },
  {
    title: "Add decorations",
    multiple: true,
    options: [
      { name: "🕷️", image: "images/spider-decor.png", layer: "decorations" },
      { name: "🐍", image: "images/hp-decor.png", layer: "decorations" },
      { name: "🩷", image: "images/barbie-decor.png", layer: "decorations" },
      { name: "🎤", image: "images/ts-decor.png", layer: "decorations" },
    ],
  },
  {
    title: "Choose candles",
    options: [
      { name: "🕷️", image: "images/spider-candles.png", layer: "candles" },
      { name: "🐍", image: "images/hp-candles.png", layer: "candles" },
      { name: "🩷", image: "images/barbie-candles.png", layer: "candles" },
      { name: "🎤", image: "images/ts-candles.png", layer: "candles" },
    ],
  },
];

const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

function updateProgress() {
  const progress = (step / steps.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

function loadStep() {
  optionsDiv.innerHTML = "";
  nextBtn.style.display = "block";

  if (step >= steps.length) {
    showFinal();
    return;
  }

  updateProgress();

  const current = steps[step];
  document.getElementById("title").innerText = current.title;

  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.innerText = option.name;

    if (step === 0 && index === 0 && !selectedOptions[step]) {
      selectedOptions[step] = option;
      document.getElementById(option.layer).src = option.image;
      btn.classList.add("selected");
    }

    if (selectedOptions[step]?.name === option.name) {
      btn.classList.add("selected");
    }

    btn.onclick = () => {
      document
        .querySelectorAll(".option-btn")
        .forEach((b) => b.classList.remove("selected"));

      btn.classList.add("selected");

      selectedOptions[step] = option;
      document.getElementById(option.layer).src = option.image;
    };

    optionsDiv.appendChild(btn);
  });
}

nextBtn.onclick = () => {
  step++;
  loadStep();
};

function showFinal() {
  document.querySelector(".game").classList.add("hidden");
  document.getElementById("finalScreen").classList.remove("hidden");
}

function restartGame() {
  step = 0;

  selectedOptions = {};

  document.querySelector(".game").classList.remove("hidden");
  document.getElementById("finalScreen").classList.add("hidden");

  document.querySelectorAll(".layer").forEach((img) => (img.src = ""));

  updateProgress();
  loadStep();
}

loadStep();
