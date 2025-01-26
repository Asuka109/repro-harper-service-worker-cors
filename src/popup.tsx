import { createRoot } from 'react-dom/client';
import { invariant } from './utils';

const container = document.getElementById('root');
invariant(container, 'Root element not found');

const root = createRoot(container);
root.render(<div style={{ width: '10rem', height: '10rem' }}>Hello World</div>);
