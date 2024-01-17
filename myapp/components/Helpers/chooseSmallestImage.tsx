export default function chooseSmallestImage(images) {
  return images.reduce((smallest, image) => {
    if (image.height < smallest.height) return image;
    return smallest;
  }, images[0]);
}
