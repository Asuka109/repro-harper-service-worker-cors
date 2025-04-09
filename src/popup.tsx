import { createRoot } from 'react-dom/client';
import { invariant } from './utils';
import { useState } from 'react';

function Popup() {
  const [input, setInput] = useState('');
  const [lintResults, setLintResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLint = async () => {
    setIsLoading(true);
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'lint',
        name: input,
      });
      console.log(response);
      setLintResults(response);
    } catch (error) {
      console.error('[Harper] Lint error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: '300px', padding: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="输入要检查的内容"
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <button
        type="button"
        onClick={handleLint}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '0.5rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {isLoading ? '检查中...' : '开始检查'}
      </button>

      {lintResults.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>检查结果：</h3>
          <ul style={{ margin: 0, padding: '0 0 0 1.5rem' }}>
            {lintResults.map((result, index) => (
              <li key={index}>{JSON.stringify(result)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const container = document.getElementById('root');
invariant(container, 'Root element not found');

const root = createRoot(container);
root.render(<Popup />);
