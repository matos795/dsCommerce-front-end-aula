import './style.css';
import SearchBar from '../../../components/SearchBar';
import CatalogCard from '../../../components/CatalogCard';
import ButtomNextPage from '../../../components/ButtomNextPage';
import { useEffect, useState } from 'react';
import type { ProductDTO } from '../../../models/product';
import * as productService from '../../../services/product-service'

export default function Catalog() {

  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [productName, setProductName] = useState("");

  useEffect(() => {
    productService.findPageRequest(0, productName)
    .then(response => {
      setProducts(response.data.content);
    })
  }, [productName])

  function handleSearch(searchText: string) {
    setProductName(searchText);
  }

  return (
    <main>
      <section id="catalog-container-section" className="dsc-container">
        <SearchBar onSearch={handleSearch} />

        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">

          {
            products.map(product => <CatalogCard key={product.id} product={product} />)
          }
        </div>

        <ButtomNextPage text="Carregar mais" />
      </section>
    </main>
  );
}