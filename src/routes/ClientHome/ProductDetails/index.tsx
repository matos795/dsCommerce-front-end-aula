import './style.css'

import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonInverse from '../../../components/ButtonInverse';
import ProductDetailsCard from '../../../components/ProductDetailsCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import type { ProductDTO } from '../../../models/product';
import * as productService from '../../../services/product-service'
import * as cartService from '../../../services/cart-sevice'
import { ContextCartCount } from '../../../utils/context-cart';

export default function ProductDetails() {

  const params = useParams();

  const navigate = useNavigate();

  const {setContextCartCount} = useContext(ContextCartCount);

  const [product, setProduct] = useState<ProductDTO>();

  function hanldleBuyClick() {
    if (product) {
      cartService.addProduct(product);
      setContextCartCount(cartService.getCart().items.length)
      navigate("/cart")
    }
  }

  useEffect(() => {

    productService.findById(Number(params.productId))
      .then(response => {
        setProduct(response.data);
      })
      .catch(() => {
        navigate("/catalogo");
      })
  }, []);

  return (
    <main>
      <section id="product-container-section" className="dsc-container">
        {
          product &&
          <ProductDetailsCard product={product} />
        }
        <div className="dsc-btn-page-container">
          <div onClick={hanldleBuyClick}>
            <ButtonPrimary text="Comprar" />
          </div>
          <Link to="/">
            <ButtonInverse text="Início" />
          </Link>
        </div>
      </section>
    </main>
  );

}