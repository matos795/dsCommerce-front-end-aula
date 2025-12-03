import './style.css'

type Props = {
    name : String;
}

export default function ProductCategory({ name } : Props) {

    return (
        <div className="dsc-category">
            {name}
        </div>
    );
}