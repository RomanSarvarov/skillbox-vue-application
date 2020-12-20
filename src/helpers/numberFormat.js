export default {
  price(number) {
    return new Intl.NumberFormat().format(number);
  },
};
