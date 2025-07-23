// Load images
let dog1 = new Image();
dog1.src = "./ddoggo.png";

let fence1 = new Image();
fence1.src = "fence.png";

let biscuit1 = new Image();
biscuit1.src = "Dog_biscuit.png";

// Canvas setup
let c = document.querySelector("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
let ctx = c.getContext("2d");

// Lane positions
let itemSide = [-10, 100, 210, 320, 430]; // y-values for lanes
const moveX = 70;
const minX = 0;
const maxX = 400;

// Dog position (starts in lane 1)
let x1 = 200;
let currentLaneIndex = 1;
let y1 = itemSide[currentLaneIndex];

// Objects (fence, biscuit)
let x2 = 480;
let y2 = random_item(itemSide);

let x3 = 480;
let y3 = random_item(itemSide);

// Drawing variables
let spriteH, spriteW, spriteH1, spriteW1, spriteH2, spriteW2;
let currentImageIndex = 0;
let frames = 0;
let loop = 0;

// Draw grass stripes (optional)
function drawGrassLanes() {
    const laneColors = ["#b0e57c", "#c1f0a8", "#a3d977", "#9ad06e", "#8dcf5f"];
    for (let i = 0; i < itemSide.length; i++) {
        ctx.fillStyle = laneColors[i % laneColors.length];
        ctx.fillRect(0, itemSide[i], c.width, 100);
    }
}

// Random helper
function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

// Main draw loop
function draw() {
    frames += 1;
    x2 -= 1;
    x3 -= 1;

    if (frames % 17 === 0) {
        ctx.clearRect(0, 0, c.width, c.height);

        drawGrassLanes();

        currentImageIndex = (currentImageIndex === 2) ? 0 : currentImageIndex + 1;

        // Dog
        ctx.drawImage(dog1, spriteW * currentImageIndex, 0, spriteW, spriteH, x1, y1, spriteW, spriteH);

        // Keep dog within bounds
        if (x1 < minX) x1 = minX;
        if (x1 > maxX) x1 = maxX;

        // Fence
        if (x2 < -45) {
            x2 = c.width;
            y2 = random_item(itemSide);
        }
        ctx.drawImage(fence1, 0, 0, spriteW1, spriteH1, x2, y2, spriteW1 + 30, spriteH1 + 30);

        // Biscuit
        if (x3 < -45) {
            x3 = c.width;
            y3 = random_item(itemSide);
        }
        ctx.drawImage(biscuit1, 0, 0, spriteW2, spriteH2, x3, y3 + 30, 50, 50);
    }

    requestAnimationFrame(draw);
}

// Wait for images to load
dog1.addEventListener("load", () => {
    spriteH = dog1.height;
    spriteW = spriteH + 4;
    draw();
});

fence1.addEventListener("load", () => {
    spriteH1 = fence1.height;
    spriteW1 = fence1.width;
});

biscuit1.addEventListener("load", () => {
    spriteH2 = biscuit1.height;
    spriteW2 = biscuit1.width;
});

// Keyboard controls
window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) return;

    switch (event.key) {
        case "ArrowDown":
        case "Down":
            if (currentLaneIndex < itemSide.length - 1) {
                currentLaneIndex++;
                y1 = itemSide[currentLaneIndex];
            }
            break;

        case "ArrowUp":
        case "Up":
            if (currentLaneIndex > 0) {
                currentLaneIndex--;
                y1 = itemSide[currentLaneIndex];
            }
            break;

        case "ArrowLeft":
        case "Left":
            if (x1 > minX) x1 -= moveX;
            break;

        case "ArrowRight":
        case "Right":
            if (x1 < maxX) x1 += moveX;
            break;

        // Optionally handle Enter or Escape here
    }

    event.preventDefault();
}, true);
