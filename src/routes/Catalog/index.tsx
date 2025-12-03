import './style.css';
import HeaderClient from '../../components/HeaderClient';
import SearchBar from '../../components/SearchBar';
import CatalogCard from '../../components/CatalogCard';
import ButtomNextPage from '../../components/ButtomNextPage';


export default function Catalog() {
    return (
        <>
            <HeaderClient />
            <main>
                <section id="catalog-container-section" className="dsc-container">
                    <SearchBar />

                    <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                    </div>

                    <ButtomNextPage text = "Carregar mais"/>
                </section>
            </main>
        </>
    );
}