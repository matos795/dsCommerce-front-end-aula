import './style.css';

type Props = {
    text: string;
}

export default function ButtomNextPage({ text }: Props) {
    return(
        <div className="dsc-btn-next-page">
            {text}
        </div>
    );
}