"use strict";
let x = 20;
let y = 10;
function tambah(a, b) {
    return a + b;
}
function kurang(a, b) {
    return a - b;
}
function kali(a, b) {
    return a * b;
}
function bagi(a, b) {
    return a / b;
}
function modulus(a, b) {
    return a % b;
}
console.log("Penjumlahan: " + x + " + " + y + " = " + tambah(x, y));
console.log("Pengurangan: " + x + " - " + y + " = " + kurang(x, y));
console.log("Perkalian: " + x + " x " + y + " = " + kali(x, y));
console.log("Pembagian: " + x + " / " + y + " = " + bagi(x, y));
console.log("Modulus: " + x + " % " + y + " = " + modulus(x, y));
