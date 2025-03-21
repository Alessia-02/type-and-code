export const configurazione = {
  testo: "Y",

  dimensione: 0.8,
  interlinea: 0.7,
  allineamento: "centro",
  percorsoFont: "./assets/InputMonoCondensed-BoldItalic.ttf",

  sensibilitàMicrofonoBase: 6,
  densitàPuntiBase: 1,

  nascondiInterfaccia: false,
};

/**
 * Disegna punto
 * Metti qui quello che vuoi disegnare per ogni punto della font!
 *
 * @typedef {Object} Ingredienti
 * @property {number} x - La coordinata x del punto
 * @property {number} y - La coordinata y del punto
 * @property {number} angolo - L'angolo della curva della font in quel punto
 * @property {number} indice - Il numero del punto nella sequenza (0, 1, 2, 3, ...)
 * @property {number} unita - Unita' di misura: corrisponde al 10% della dimensione più piccola della finestra (larghezza o altezza)
 * @property {number} volume - Il volume del microfono - Varia da 0 a 1
 * @property {number} frameCount - Il numero di frame passati dall'avvio del programma
 * @property {number} [alpha] - Device orientation alpha angle (z-axis rotation) - Varia da 0 a 360
 * @property {number} [beta] - Device orientation beta angle (front-to-back tilt) - Varia da -90 a 90
 * @property {number} [gamma] - Device orientation gamma angle (left-to-right tilt) - Varia da -90 a 90
 * @property {object} [puntoSuccessivo] - Il punto successivo
 *
 * @param {Ingredienti} ingredienti
 */
export function disegnaPunto({
  x,
  y,
  angolo,
  indice,
  unita,
  volume,
  frameCount,
  alpha = 0,
  beta = 0,
  gamma = 0,
  puntoSuccessivo,
}) {
  let p = interpolate({ x, y }, puntoSuccessivo, frameCount, 3);
  let lunghezza = map(volume, 0, 1, 150, 200);
  let larghezza = map(sin(frameCount * 10 + indice), -1, 1, 50, 150);

  stroke("#FF1493");
  let i = indice + frameCount * 100;
  if (i % 2 == 0) fill("#FF1493");
  else if (i % 2 == 1) fill("#F400A1");
  // fill("#F400A1");
  ellipse(p.x, p.y, lunghezza, larghezza);

  push();
  if (indice % 2 == 0) fill("blue");
  else if (indice % 2 == 1) fill("white");
  noStroke();
  translate(x, y);
  rotate(angolo + frameCount * 10);
  ellipse(-lunghezza / 2, 0, larghezza, lunghezza / 2);
  pop();
  // image(img, x, y, 50, 50);
}

// let img;
/**
 * Carica le risorse necessarie
 * Esempio: carica immagini, suoni, ecc.
 */
export function caricamentoRisorse() {
  // img = loadImage(" ./assetsDigital Abstract Art Wallpaper.jpg");
}

/**
 * Imposta le impostazioni iniziali
 * Esempio: impostazioni di frame rate, misura degli angoli, ecc.
 */
export function impostazioni() {
  frameRate(30);
  angleMode(DEGREES);
  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);
}

/**
 * Disegna sotto i punti
 * @param {function} disegnaTesto - La funzione che disegna il testo
 */
export function sotto(disegnaTesto) {
  background("white");

  // // [INFO] Rimuovi il commento per disegnare il testo
  // fill("white");
  // disegnaTesto();
}

/**
 * Disegna sopra i punti
 * @param {function} disegnaTesto - La funzione che disegna il testo
 */
export function sopra(disegnaTesto) {
  // [INFO] Rimuovi il commento per disegnare il testo
  // fill("black");
  // disegnaTesto();
}

///

function interpolate(p1, p2, frameCount, cycleDuration) {
  // Calcolare la posizione di interpolazione tra p1 e p2
  let t = (frameCount % cycleDuration) / cycleDuration;

  // Interpolazione lineare tra p1 e p2
  let x = lerp(p1.x, p2.x, t);
  let y = lerp(p1.y, p2.y, t);

  // Restituire il punto interpolato
  return { x, y };
}
