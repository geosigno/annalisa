import Link from 'next/link';

class CategorieThumbnail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, nom, description } = this.props.categories;
        return (
            <div key={id}>
                <Link href={`/categorie?id=${id}`} as={`/categorie/${id}`}>
                    <a>
                        <h2>{nom}</h2>
                    </a>
                </Link>
                <p>{description}</p>
            </div>
        );
    }
}

export default CategorieThumbnail;
