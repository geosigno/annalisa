import React from 'react';
import Link from 'next/link';

const CategorieThumbnail = (props) => {
    const { categories: { id, nom, description }} = props;
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

export default CategorieThumbnail;