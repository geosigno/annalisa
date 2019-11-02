import ReactMarkdown from 'react-markdown';

class CoursMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, nom, created_at, contenu } = this.props.cours;
        return (
            <article key={id}>
                <header>
                    <h1>{nom}</h1>

                    <p>
                        Posté le
                        {created_at}
                    </p>

                    {/* {srcImage && <img src={`http://localhost:1337${srcImage}`} />} */}
                </header>
                <section>{contenu && <ReactMarkdown source={contenu} />}</section>
            </article>
        );
    }
}

export default CoursMain;
