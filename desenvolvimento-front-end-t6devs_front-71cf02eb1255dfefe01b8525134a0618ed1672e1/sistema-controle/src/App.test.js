import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders HomePage', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/T6Devs_Back/i); // Ajuste para o texto que aparece na HomePage
  expect(titleElement).toBeInTheDocument();
});