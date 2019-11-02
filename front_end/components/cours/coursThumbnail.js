import Link from 'next/link';

class CoursThumbnail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, nom, description, created_at } = this.props.cours;
        return (
            <article key={id}>
                <header>
                    <Link href={`/cours?id=${id}`} as={`/cours/${id}`}>
                        <a>
                            <h2>{nom}</h2>
                        </a>
                    </Link>
                    <p>
                        posté le
                        {created_at}
                    </p>
                </header>
                <section>
                    <p>{description}</p>
                </section>
            </article>
        );
    }
}

export default CoursThumbnail;
