import './style.css';

type Props = {
    text: string;
    onNextPage: () => void;
}

export default function ButtomNextPage({ text, onNextPage }: Props) {
    return(
        <div className="dsc-btn-next-page" onClick={() => onNextPage()}>
            {text}
        </div>
    );
}