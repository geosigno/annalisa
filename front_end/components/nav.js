import React from 'react';
import Link from 'next/link';

const links = [
    { key: 1, href: '/', label: "page d'accueil" },
    { key: 2, href: '/signin', label: 'se connecter' },
    { key: 3, href: '/signup', label: "s'enregistrer" }
];

const Nav = () => (
    <nav>
        <ul>
            <li>
                {links.map(({ key, href, label }) => (
                    <Link key={key} href={href}>
                        <a>{label}</a>
                    </Link>
                ))}
            </li>
        </ul>

        <style jsx>
            {`
                :global(body) {
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
                }
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
