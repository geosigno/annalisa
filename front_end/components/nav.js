import React from 'react';
import Link from 'next/link';

const links = [
    { key: 1, href: '/', label: "page d'accueil" },
    { key: 2, href: '/cours', label: 'cours' },
    { key: 3, href: '/signin', label: 'se connecter' },
    { key: 4, href: '/signup', label: "s'enregistrer" }
];

const Nav = () => (
    <nav>
        <ul>
            {links.map(({ key, href, label }) => {
                return (
                    <Link key={key} href={href}>
                        <a>{label}</a>
                    </Link>
                );
            })}
        </ul>

        <style jsx>
            {`
                nav {
                    text-align: center;
                }
                ul {
                    display: flex;
                    justify-content: space-between;
                }
                nav > ul {
                    padding: 4px 16px;
                }
                li {
                    display: flex;
                    padding: 6px 8px;
                }
                a {
                    color: #067df7;
                    text-decoration: none;
                    font-size: 13px;
                }
            `}
        </style>
    </nav>
);

export default Nav;
