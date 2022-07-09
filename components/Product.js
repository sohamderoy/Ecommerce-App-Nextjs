import { ProductStyle } from "../styles/ProductStyle";
import Link from "next/link";

const Product = ({ product }) => {
  const { title, price, image, slug } = product.attributes;
  console.log("s5", slug);
  return (
    <ProductStyle>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt={title} />
        </div>
      </Link>

      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductStyle>
  );
};

export default Product;
