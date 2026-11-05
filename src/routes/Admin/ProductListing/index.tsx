import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import './styles.css';
import { useEffect, useState } from 'react';
import type { ProductDTO } from '../../../models/product';
import * as productService from '../../../services/product-service'
import SearchBar from '../../../components/SearchBar';
import ButtomNextPage from '../../../components/ButtomNextPage';
import DialogInfo from '../../../components/DialogInfo';
import DialogConfirmation from '../../../components/DialogConfirmation';

type QueryParams = {
    page: number,
    name: string
}

export default function ProductListing() {

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: "Operação com Sucesso!"
    });

    const [dialogConfirmationData, setDialogConfirmationData] = useState({
        visible: false,
        message: "Tem certeza?",
        id: 0
    });

    const [isLastPage, setIsLastPage] = useState(false);

    const [products, setProducts] = useState<ProductDTO[]>([]);

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ""
    })

    useEffect(() => {
        productService.findPageRequest(queryParams.page, queryParams.name)
            .then(response => {
                const nextPage = response.data.content
                setProducts(products.concat(nextPage));
                setIsLastPage(response.data.last);
            })
    }, [queryParams])

    function handleSearch(searchText: string) {
        setProducts([]);
        setQueryParams({ ...queryParams, page: 0, name: searchText });
    }

    function handleNextPageClick() {
        const newPage = queryParams.page + 1
        setQueryParams({ ...queryParams, page: newPage })
    }

    function handleDialogInfoClose() {
        setDialogInfoData({ ...dialogInfoData, visible: false });
    }

    function handleDeleteClick(productId: number) {
        setDialogConfirmationData({ ...dialogConfirmationData, visible: true, id: productId });
    }

    function handleDialogConfirmationAnswer(answer: boolean, productId: number) {
        if (answer) {
            productService.deleteById(productId)
                .then(() => {
                    setProducts([]);
                    setQueryParams({ ...queryParams, page: 0 });
                    setDialogInfoData({ ...dialogInfoData, visible: true, message: "Produto deletado com sucesso!" });
                })
                .catch((error) => {
                    setDialogInfoData({ ...dialogInfoData, visible: true, message: error.response.data.error });
                })
        }
        setDialogConfirmationData({ ...dialogConfirmationData, visible: false });
    }

    return (
        <main>
            <section id="product-listing-container-section" className="dsc-container">

                <h2 className="dsc-section-title dsc-mb20">Cadastro de Produtos</h2>

                <div className="dsc-btn-page-container dsc-mb20">
                    <div className="dsc-btn dsc-btn-white">Novo</div>
                </div>

                <SearchBar onSearch={handleSearch} />

                <table className="dsc-table dsc-mb20 dsc-mt20">
                    <thead>
                        <tr>
                            <th className="dcs-tb576">ID</th>
                            <th></th>
                            <th className="dcs-tb768">Preço</th>
                            <th className="dsc-txt-left">Nome</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                                <tr key={product.id}>
                                    <td className="dcs-tb576">{product.id}</td>
                                    <td><img className="dsc-product-listing-image" src={product.imgUrl} alt={product.name} /></td>
                                    <td className="dcs-tb768">R$ {product.price.toFixed(2)}</td>
                                    <td className="dsc-txt-left">{product.name}</td>
                                    <td><img className="dsc-product-listing-btn" src={editIcon} alt="Editar" /></td>
                                    <td><img onClick={() => handleDeleteClick(product.id)} className="dsc-product-listing-btn" src={deleteIcon} alt="Deletar" /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {
                    !isLastPage &&
                    <ButtomNextPage onNextPage={handleNextPageClick} text="Carregar mais" />
                }
            </section>
            {
                dialogInfoData.visible &&
                <DialogInfo
                    message={dialogInfoData.message}
                    onDialogClose={handleDialogInfoClose} />
            }

            {
                dialogConfirmationData.visible &&
                <DialogConfirmation
                    id={dialogConfirmationData.id}
                    message={dialogConfirmationData.message}
                    onDialogAnswer={handleDialogConfirmationAnswer} />
            }
        </main>
    );
}