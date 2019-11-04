import React from 'react';
import Link from 'next/link';

const NiveauThumbnail = (props) => {
    const { niveaus: { id, nom, description, image }} = props;
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
};

export default NiveauThumbnail;
