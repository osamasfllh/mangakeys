document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Gantungan Kunci Game Genshin Impact - Raiden Shogun",
        img: "1.png",
        price: 20000,
      },
      {
        id: 2,
        name: "Gantungan Kunci One Piece Karakter ZoroPVC",
        img: "2.jpg",
        price: 25000,
      },
      {
        id: 3,
        name: "Bounty Poster Wanted One piece Younko Bounty",
        img: "3.jpg",
        price: 30000,
      },
      {
        id: 4,
        name: "Action Figure Hinata dan Sugawara",
        img: "4.jpg",
        price: 50000,
      },
      {
        id: 5,
        name: "Gantungan Kunci Anime Jujutsu Kaisen - Gojo",
        img: "5.jpg",
        price: 25000,
      },
      {
        id: 6,
        name: "Gantungan Kunci Anime Karakter Kimetsu no Yaiba - Nezuko",
        img: "6.jpg",
        price: 25000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // Cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // Jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // Ambil item yang mau di remove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // JIka item lebih dari 1
      if (cartItem.quantity > 1) {
        // Telusuri 1 1
        this.items = this.items.map((item) => {
          // Jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
