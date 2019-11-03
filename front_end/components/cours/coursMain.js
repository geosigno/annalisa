import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import dateToFormat from '../../helpers/date';
import './coursMain.scss';

class CoursMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, nom, created_at, contenu, niveau, categories } = this.props.cours;
        return (
            <article key={id} className="cours">
                <header>
                    <h1 className="cours__title">{nom}</h1>

                    <p className="cours__meta">
                        Posté le&nbsp;
                        <date>{dateToFormat(created_at)}</date>
                        &nbsp;dans niveau&nbsp;
                        <Link href={`/niveau/${niveau.id}`}>
                            <a>{niveau.nom}</a>
                        </Link>
                    </p>

                    {categories.map((category) => (
                        <Link key={category.id} href={`/categorie/${category.id}`}>
                            <a>{category.nom}</a>
                        </Link>
                    ))}

                    {/* {srcImage && <img src={`http://localhost:1337${srcImage}`} />} */}
                </header>
                <section>{contenu && <ReactMarkdown source={contenu} />}</section>
            </article>
        );
    }
}

export default CoursMain;
