Day 4 - Prisma Transaction and Middleware - Checkpoint 2

(Case CRUD Stock)

Challange 2:

- Setup Prisma Schema untuk tabel Products, Stocks, dan Suppliers
- Mengelola update stok barang dari beberapa supplier secara bersamaan menggunakan Batch Queries
- Validasi stok barang untuk memastikan stok baru tidak bernilai negatif
- Exception Handling dengan Middleware untuk menangani error terkait stok barang, seperti stok negatif atau supplier tidak ditemukan

Detail Challange:

- Buat endpoint /suppliers/stock dengan Transactions dan Batch Queries untuk memperbarui stok barang dari beberapa supplier sekaligus
- Tambahkan Custom Validation agar stok yang diperbarui tidak boleh bernilai negatif
- Buat Middleware untuk menangani error dengan Exception Handling, seperti stok tidak valid atau supplier tidak ditemukan
