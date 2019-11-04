import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loader = (props) => {
    const { size } = props;

    let loaderSize = 128;
    let loaderHeight = '100vh';

    if (size === 'small') {
        loaderSize = 64;
        loaderHeight = '128px';
    }

    return (
        <div className="loader-container">
            <CircularProgress size={loaderSize} />
            <style jsx>{`
                .loader-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: ${loaderHeight};
                }
            `}</style>
        </div>
    );
};

export default Loader;
