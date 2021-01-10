export default {
  format(product) {
    // Format image.
    const image = this.formatImage(product.preview || null);

    // Format offers.
    const offers = this.formatOffers(product.offers || []);

    // Format colors.
    const colors = this.formatColors(product.colors);

    // Build object.
    const formattedProduct = {
      ...product,

      colors,
      image,
      offers,
    };

    // Remove trashdata.
    delete formattedProduct.preview;

    return formattedProduct;
  },
  formatColors(colors) {
    return colors.map((colorData) => colorData.color);
  },
  formatImage(image) {
    return image ? image.file.url : null;
  },
  formatOffers(offers) {
    if (!offers.length) {
      return [];
    }

    return offers.filter((offer) => offer.propValues.length > 0)
      .map(({ id, price, propValues }) => ({
        id,
        price,
        value: propValues[0].value,
      }));
  },
};
