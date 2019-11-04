import React from 'react';
import Link from 'next/link';

import ReactMarkdown from 'react-markdown';
import dateToFormat from '../../helpers/date';

const CoursMain = (props) => {
    const { cours: { id, nom, created_at, contenu, niveau, categories }} = props;
    return (
        <article key={id} className="cours">
            <header>
                <h1 className="cours__title">{nom}</h1>

                <p className="cours__meta">
                    Posté le&nbsp;
                    {dateToFormat(created_at)}
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
            <style jsx>{`
                .cours {
                    display: block;
                    max-width: 640px;
                    margin: 0 auto;
                }
                .cours__meta {
                    color: gray;
                    font-style: italic;
                }
                h1 {
                    font-size: 36px;
                }
                h2 {
                    font-size: 30px;
                }
                h3 {
                    font-size: 24px;
                }
                p {
                    font-size: 18px;
                    line-height: 2;
                }
                table {
                    width: 100%;
                }
                td {
                    font-size: 18px;
                    line-height: 2;
                }
            `}</style>
        </article>
    );
};

export default CoursMain;
