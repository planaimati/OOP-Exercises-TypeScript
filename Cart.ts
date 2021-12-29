interface cartInterface {
  id: number;
  cartItemList: cartItemInterface[];
  discount: number;
  discountCode: string;
  addItemToCart(item: cartItemInterface): void;
  deleteItemFromCart(item: cartItemInterface): void;
  calculatePrice(code: string): number;
}

interface cartItemInterface {
  name: string;
  category: string;
  price: number;
  discount: number;
  id: number;
  discountAmount: number;
  getDiscountAmount(): number;
  modifyPrice(): void;
  setName(name: string): void;
  setPrice(price: number): void;
  setDiscount(discount: number): void;
}

class Cart implements cartInterface {
  constructor(
    public id: number,
    public cartItemList: cartItemInterface[],
    public discount: number,
    public discountCode: string
  ) {}

  addItemToCart(item: cartItemInterface) {
    this.cartItemList.push(item);
  }

  deleteItemFromCart(cartItem: cartItemInterface) {
    const newArr = this.cartItemList.filter((item) => item.id !== cartItem.id);

    this.cartItemList = newArr;
  }

  calculatePrice(code: string) {
    const sum = this.cartItemList.reduce(
      (accumulator, current) => accumulator + current.price,
      0
    );

    const sumWithDiscount = (this.discount / 100) * sum;

    if (code === this.discountCode) {
      return sumWithDiscount;
    } else return sum;
  }
}

class CartItem implements cartItemInterface {
  constructor(
    public name: string,
    public category: string,
    public price: number,
    public discount: number,
    public id: number,
    public discountAmount: number
  ) {}

  getDiscountAmount() {
    this.discountAmount = (this.discount / 100) * this.price;

    return this.discountAmount;
  }

  modifyPrice() {
    const newPrice = this.price - (this.discount / 100) * this.price;

    this.price = newPrice;
  }

  setName(name: string) {
    this.name = name;
  }

  setPrice(price: number) {
    this.price = price;
  }

  setDiscount(discount: number) {
    this.discount = discount;
  }
}
