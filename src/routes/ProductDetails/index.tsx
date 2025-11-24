import './style.css'

import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonInverse from '../../components/ButtonInverse';
import ProductDetailsCard from '../../components/ProductDetailsCard';
import HeaderClient from '../../components/HeaderClient';


export default function ProductDetails() {

    return (
        <>
          <HeaderClient />
          <main>
            <section id="product-container-section" className="dsc-container">
              <ProductDetailsCard />
              <div className="dsc-btn-page-container">
                <ButtonPrimary />
                <ButtonInverse />
              </div>
            </section>
          </main>
        </>
      );

}