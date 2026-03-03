let step = 0;
let selectedOptions = {};

const steps = [
  {
    title: "Choose a cake base",
    options: [
      { name: "🕷️", image: "images/spider-base.png", layer: "base" },
      { name: "🐍", image: "images/hp-base.png", layer: "base" },
      { name: "🎀", image: "images/barbie-base.png", layer: "base" },
      { name: "🎤", image: "images/ts-base.png", layer: "base" },
    ],
  },
  {
    title: "Choose cream",
    options: [
      { name: "🕷️", image: "images/spider-cream.png", layer: "cream" },
      { name: "🐍", image: "images/hp-cream.png", layer: "cream" },
      { name: "🎀", image: "images/barbie-cream.png", layer: "cream" },
      { name: "🎤", image: "images/ts-cream.png", layer: "cream" },
    ],
  },
  {
    title: "Add decorations",
    multiple: true,
    options: [
      { name: "🕷️", image: "images/spider-decor.png", layer: "decorations" },
      { name: "🐍", image: "images/hp-decor.png", layer: "decorations" },
      { name: "🎀", image: "images/barbie-decor.png", layer: "decorations" },
      { name: "🎤", image: "images/ts-decor.png", layer: "decorations" },
    ],
  },
  {
    title: "Choose candles",
    options: [
      { name: "🕷️", image: "images/spider-candles.png", layer: "candles" },
      { name: "🐍", image: "images/hp-candles.png", layer: "candles" },
      { name: "🎀", image: "images/barbie-candles.png", layer: "candles" },
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

  document.getElementById("finalBase").src = selectedOptions[0]?.image || "";
  document.getElementById("finalCream").src = selectedOptions[1]?.image || "";
  document.getElementById("finalDecorations").src = selectedOptions[2]?.image || "";
  document.getElementById("finalCandles").src = selectedOptions[3]?.image || "";

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function restartGame() {
  step = 0;
  selectedOptions = {};

  document.querySelector(".game").classList.remove("hidden");
  document.getElementById("finalScreen").classList.add("hidden");

  document.querySelectorAll(".layer").forEach((img) => (img.src = ""));
  document.querySelectorAll(".final-layer").forEach((img) => (img.src = ""));

  updateProgress();
  loadStep();
}

loadStep();

document.getElementById("downloadBtn")?.addEventListener("click", function() {
  const layers = [
    document.getElementById("finalBase"),
    document.getElementById("finalCream"),
    document.getElementById("finalDecorations"),
    document.getElementById("finalCandles")
  ];
  
  let maxWidth = 0;
  let maxHeight = 0;
  let imagesToLoad = [];
  
  layers.forEach((img) => {
    if (img.src) {
      imagesToLoad.push(img);
    }
  });
  
  if (imagesToLoad.length === 0) return;
  
  let loadedCount = 0;
  const loadedImages = [];
  
  imagesToLoad.forEach((img, index) => {
    const layerImg = new Image();
    layerImg.crossOrigin = "anonymous";
    layerImg.onload = function() {
      loadedImages[index] = layerImg;
      maxWidth = Math.max(maxWidth, layerImg.width);
      maxHeight = Math.max(maxHeight, layerImg.height);
      
      loadedCount++;
      
      if (loadedCount === imagesToLoad.length) {
        const padding = 0.2;
        const canvasWidth = Math.round(maxWidth * (1 + padding));
        const canvasHeight = Math.round(maxHeight * (1 + padding));
        
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const startX = (canvasWidth - maxWidth) / 2;
        const startY = (canvasHeight - maxHeight) / 2;
        
        loadedImages.forEach(img => {
          const x = startX + (maxWidth - img.width) / 2;
          const y = startY + (maxHeight - img.height) / 2;
          ctx.drawImage(img, x, y, img.width, img.height);
        });
        
        const link = document.createElement("a");
        link.download = "my-birthday-cake.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    };
    layerImg.src = img.src;
  });
});
