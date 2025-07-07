let x: number = 20;
let y: number = 10;

function tambah(a: number, b: number): number {
  return a + b;
}

function kurang(a: number, b: number): number {
  return a - b;
}

function kali(a: number, b: number): number {
  return a * b;
}

function bagi(a: number, b: number): number {
  return a / b;
}

function modulus(a: number, b: number): number {
  return a % b;
}

console.log("Penjumlahan: " + x + " + " + y + " = " + tambah(x, y));
console.log("Pengurangan: " + x + " - " + y + " = " + kurang(x, y));
console.log("Perkalian: " + x + " x " + y + " = " + kali(x, y));
console.log("Pembagian: " + x + " / " + y + " = " + bagi(x, y));
console.log("Modulus: " + x + " % " + y + " = " + modulus(x, y));
