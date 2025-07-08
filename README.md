Day 6 - File Upload, Session, and Security Part 2 - Checkpoint 2

Challange:

- File Upload menggunakan middleware `multer` untuk upload gambar produk dengan validasi ukuran dan tipe file
- Implementasi middleware CORS dan Rate Limiting untuk mengontrol akses dan jumlah request

Detail Challange:

- Buat endpoint `/products/upload-image` untuk upload gambar produk dengan validasi ukuran dan tipe file
- Implementasi session-based login supplier dan simpan token login di cookies
- Tambahkan middleware CORS untuk mengizinkan akses hanya dari origin tertentu
- Implementasikan Rate Limiting untuk membatasi jumlah request dari IP yang sama
