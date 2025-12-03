import './style.css';
import HeaderClient from '../../components/HeaderClient';
import SearchBar from '../../components/SearchBar';
import CatalogCard from '../../components/CatalogCard';
import ButtomNextPage from '../../components/ButtomNextPage';
import type { ProductDTO } from '../../models/product';

const product: ProductDTO = {
  id: 2,
  name: "smart tv",
  description: "é muito bonita",
  imgUrl: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/refs/heads/master/backend/img/2-big.jpg",
  price: 2500.99,
  categories: [
    {
      id: 2,
      name: "Eletronicos"
    },
    {
      id: 3,
      name: "Computadores"
    },
    {
      id: 4,
      name: "Importados"
    }
  ]
}

export default function Catalog() {
    return (
        <>
            <HeaderClient />
            <main>
                <section id="catalog-container-section" className="dsc-container">
                    <SearchBar />

                    <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
                        <CatalogCard product = {product}/>
                        <CatalogCard product = {product}/>
                        <CatalogCard product = {product}/>
                        <CatalogCard product = {product}/>
                        <CatalogCard product = {product}/>
                        <CatalogCard product = {product}/>
                        <CatalogCard product = {product}/>
                        <CatalogCard product = {product}/>
                        <CatalogCard product = {product}/>
                        <CatalogCard product = {product}/>
                    </div>

                    <ButtomNextPage text = "Carregar mais"/>
                </section>
            </main>
        </>
    );
}