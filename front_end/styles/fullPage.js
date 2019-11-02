import css from 'styled-jsx/css';

export default css.global`
    .fullPage {
        background: linear-gradient(45deg, #83a4d4, #b6fbff);
    }
    .fullPage__container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }
    .fullPage form {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 400px;
        border-radius: 8px;
        padding: 48px;
        background-color: white;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        transition: background-color 5000s ease-in-out 0s;
    }
`;
