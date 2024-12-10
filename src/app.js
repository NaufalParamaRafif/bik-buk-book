document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "How to Read a Book",
        img: "1.jpg",
        price: 300000,
      },
      {
        id: 2,
        name: "Crime and Punishment",
        img: "2.jpg",
        price: 265000,
      },
      {
        id: 3,
        name: "How To Prove It",
        img: "3.jpg",
        price: 255000,
      },
      {
        id: 4,
        name: "1984",
        img: "4.jpeg",
        price: 220000,
      },
      {
        id: 5,
        name: "Haji Murad",
        img: "5.jpg",
        price: 145000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.quantity * item.price;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
        const cartItem = this.items.find((item) => item.id === id);

        if(cartItem.quantity > 1) {
            this.items = this.items.map((item) => {
                if (item.id !== id){
                    return item
                } else {
                    item.quantity--;
                    item.total = item.quantity * item.price;
                    this.quantity--;
                    this.total -= item.price;
                    return item;
                }
            })
        } else if(cartItem.quantity === 1) {
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price;
        }
    }
  });
});

// Convertion to Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
