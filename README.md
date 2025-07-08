Day 4 - Authentication, Authorization, and Security - Checkpoint 2

(Case Login & CRUD Products)

Challange:

- Setup tabel Users dan Products
- Input Validation pada endpoint CRUD Products untuk memvalidasi input terkait produk (misalnya nama produk minimal 3 karakter)
- Implementasi Encryption untuk mengenkripsi data sensitif yang dikirimkan saat login
- Implementasi Hashing untuk menyimpan password supplier dengan aman
- Implementasi Authentication JWT untuk mengelola akses produk

Detail Challange:

- Gunakan Hashing dengan bcrypt untuk menyimpan password supplier
- Gunakan Encryption untuk mengenkripsi data sensitif
- Buat endpoint `/suppliers/login` dengan JWT Authentication
- Buat endpoint `/suppliers/products` yang hanya bisa diakses oleh supplier yang sudah login
- Buat endpoint `/products/add` dengan validasi input (misalnya harga tidak boleh negatif dan nama produk minimal 3 karakter)
- Implementasikan middleware Authorization agar hanya supplier tertentu yang bisa mengupdate produk tertentu
