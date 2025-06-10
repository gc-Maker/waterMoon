import React from 'react';
import ReactDOM from 'react-dom/client';

import AddCube from './pages/AddCube';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>
        <AddCube />
    </React.StrictMode>,
);
