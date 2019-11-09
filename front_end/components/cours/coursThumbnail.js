import React from 'react';
import Link from 'next/link';
import dateToFormat from '../../helpers/date';

const CoursThumbnail = (props) => {
    const {
        cours: { id, nom, description, created_at }
    } = props;
    return (
        <article>
            <header>
                <Link href={`/cours?id=${id}`} as={`/cours/${id}`}>
                    <a>
                        <h2>{nom}</h2>
                    </a>
                </Link>
                <p>
                    posté le
                    {dateToFormat(created_at)}
                </p>
            </header>
            <section>
                <p>{description}</p>
            </section>
        </article>
    );
};

export default CoursThumbnail;
