import Link from 'next/link';
import { Paper } from '@material-ui/core';

class NiveauThumbnail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, nom, description, image } = this.props.niveaus;
        return (
            <div key={id}>
                <Link href={`/niveau?id=${id}`} as={`/niveau/${id}`}>
                    <div>
                        <img src={`http://localhost:1337/${image.url}`} alt={nom} />
                        <a>
                            <h2>{nom}</h2>
                        </a>
                    </div>
                </Link>
                <p>{description}</p>
            </div>
        );
    }
}

export default NiveauThumbnail;
