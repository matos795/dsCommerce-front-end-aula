import './style.css'

import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonInverse from '../../../components/ButtonInverse';
import ProductDetailsCard from '../../../components/ProductDetailsCard';
import * as productService from '../../../services/product-service';
import { useParams } from 'react-router-dom';


export default function ProductDetails() {

  const params = useParams();

  const product = productService.findById(Number(params.productId));

  return (
    <main>
      <section id="product-container-section" className="dsc-container">
        {
          product &&
          <ProductDetailsCard product={product} />
        }
        <div className="dsc-btn-page-container">
          <ButtonPrimary text="Comprar" />
          <ButtonInverse text="Início" />
        </div>
      </section>
    </main>
  );

}