let brojSeq = 1000;

let rangeInput = document.querySelector("#rangeInput");
console.log(rangeInput);

rangeInput.addEventListener("change", init);

function init() {
  if (document.getElementById("radArc").checked) {
    brojSeq = rangeInput.value;
    drawArcs();
  } else if (document.getElementById("radKvad").checked) {
    brojSeq = rangeInput.value;
    drawLines();
  }

  // console.log(brojSeq);
}

function drawLines() {
  if (canvas.getContext) {
    let velicine = RecamanGen(brojSeq);
    let context = canvas.getContext("2d");

    // console.log("Canvas je pokrenut");

    let format = w / h;
    let grafW = velicine.reduce(maxIzNiza);
    let grafH = Math.ceil(brojSeq);
    let zum = 1;

    let x = 0;
    let y = h / 2; // y coordinate
    canvas.width = w;
    canvas.height = h;

    // context.moveTo(x, y);
    let visina = 0;
    let brDole = 1;
    let brGore = 1;
    // console.log(velicine);
    // console.log("w je " + w);
    // console.log("h je " + h);
    // console.log("grafW je " + grafW);
    // console.log("grafH je " + grafH);

    for (let i = 0; i < brojSeq; i++) {
      let color = "hsla(" + i + ", 60%, 80%, 0.5)";
      context.strokeStyle = color;

      if (i % 2 == 0) {
        visina = brGore * zum + y;
        brGore++;
      } else if (i % 2 != 0) {
        visina = y + brDole * zum * -1;
        brDole++;
      }

      if (grafW / grafH > format) {
        zum = (w - 20) / grafW;
      } else {
        zum = (h - 20) / grafH;
      }
      // console.log("zum je " + zum);
      context.lineWidth = zum / 2 < 1 ? 1 : Math.floor(zum / 2);

      context.beginPath();
      context.moveTo(x + context.lineWidth, y);
      context.lineTo(x + context.lineWidth, visina);
      x = velicine[i] * zum;
      context.lineTo(x + context.lineWidth, visina);
      context.lineTo(x + context.lineWidth, y);

      context.stroke();
    }
    // context.closePath();
  } else {
    console.log("Browser ne podrzava canvas");
  }
}

let canvas = document.getElementById("canvas");
let w =
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * 0.98;
let h =
  (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) -
    35) *
  0.98;

function drawArcs() {
  // console.log(w);

  if (canvas.getContext) {
    let velicine = RecamanGen(brojSeq);
    let context = canvas.getContext("2d");

    console.log("Canvas je pokrenut");

    let zum = nadjiZum(velicine, w, h);

    let x = 0;

    // context.beginPath();
    let y = h / 2; // y coordinate

    let startAngle = 0; // Starting point on circle
    let endAngle = Math.PI; // End point on circle
    canvas.width = w;
    canvas.height = h;
    context.lineWidth = zum / 2 < 1 ? 1 : Math.floor(zum / 2);

    for (let j = 0; j < brojSeq; j++) {
      // let color = 'hsla(' + (Math.random() * 360).toString(3) + ', 60%, 80%, 0.5)';
      let color = "hsla(" + j + ", 60%, 80%, 0.5)";
      context.strokeStyle = color;
      context.beginPath();

      let x1 = velicine[j];
      let x2 = velicine[j + 1];
      x = (x1 + x2) / 2; // x coordinate
      context.moveTo(x1 > x2 ? x1 * zum : x2 * zum, y); // preskakanje sa krajnje na pocetnu tacku
      let radius = Math.abs(x - x2); // Arc radius
      let anticlockwise = j % 2 != 0; // clockwise or anticlockwise

      context.arc(
        x * zum,
        y,
        radius * zum,
        startAngle,
        endAngle,
        anticlockwise
      );
      context.stroke();
    }

    // console.log(RecamanGen(brojSeq));
    // console.log(max);
  } else {
    console.log("Browser ne podrzava canvas");
  }
}

function nadjiZum(velicine, w, h) {
  let format = w / h;
  let grafW = velicine.reduce(maxIzNiza);
  let grafH = maxRadius(velicine) * 2;
  let zum = 1;
  if (grafW / grafH > format) {
    zum = ((w - 20) / grafW) * 0.98;
  } else {
    zum = ((h - 20) / grafH) * 0.98;
  }
  return zum;
}

// genereise niz Racaman brojeva za red velniza

function RecamanGen(velniza) {
  let an = 0;
  let anp = 0;
  let niz = [0];

  for (let i = 1; i < velniza; i++) {
    anp = niz[i - 1];
    an = anp - i;
    if (an > 0 && !niz.includes(an)) {
      niz.push(an);
    } else if (an < 0 || niz.includes(an)) {
      niz.push(anp + i);
    }
  }

  return niz;
}

// racuna maksimalni radius Recaman niza

function maxRadius(niz) {
  let nizAlt = [];
  for (let i = 0; i < niz.length; i += 2) {
    let x1 = niz[i];
    let x2 = niz[i + 1];
    x = (x1 + x2) / 2;
    let radius = Math.abs(x - x2);

    if (!isNaN(radius)) {
      nizAlt.push(radius);
    }
  }

  let max = nizAlt.reduce(maxIzNiza);

  // console.log(nizAlt);
  // console.log(max);
  return max;
}

// trazi maximum niza

function maxIzNiza(a, b) {
  return Math.max(a, b);
}
