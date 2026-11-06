import { Link, useParams } from 'react-router-dom';
import './styles.css';
import ButtonInverse from '../../../components/ButtonInverse';
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import * as forms from "../../../utils/forms";
import * as productService from '../../../services/product-service'

export default function ProductForm() {

    const params = useParams();

    const isEditing = params.productId !== 'create';

    const [formData, setFormData] = useState<any>({
        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
        },
        price: {
            value: "",
            id: "price",
            name: "price",
            type: "number",
            placeholder: "Preço",
            validation: function(value: any) { return Number(value) > 0 },
            message: "Favor informar um preço válido",
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "Imagem",
        }
    })

    useEffect(() => {

        const result = forms.toDirty(formData, "price");

        if (isEditing) {
            productService.findById(Number(params.productId))
                .then((response) => {
                    setFormData(forms.updateAll(formData, response.data));
                });
        }
    }, [isEditing, params.productId]);

    function handleInputChange(event: any) {
        const dataUpdated = forms.update(formData, event.target.name, event.target.value);
        const dataValidated = forms.validate(dataUpdated, event.target.name);
        setFormData(dataValidated);
    }

    function handleTurnDirty(name: string) {
        const newFormData = forms.toDirty(formData, name);
        setFormData(newFormData);
    }

    return (
        <main>
            <section id="product-form-container-section" className="dsc-container">
                <div className="dsc-product-form-container">
                    <form className="dsc-card dsc-form">
                        <h2>Dados do Produto</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput
                                    {...formData.name}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className='dsc-form-error'>{formData.name.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.price}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className='dsc-form-error'>{formData.price.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.imgUrl}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className='dsc-form-error'>{formData.imgUrl.message}</div>
                            </div>
                        </div>

                        <div className="dsc-product-form-buttons">
                            <Link to="/admin/products">
                                <ButtonInverse text="Cancelar" />
                            </Link>

                            <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}