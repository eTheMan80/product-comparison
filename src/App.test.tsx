import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest'
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

describe('App Component', () => {
  it('renders header correctly', async () => {
    const app = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const header = (await app.findByTestId('header')) as HTMLHeadingElement;
    expect(header).toBeTruthy();
    app.unmount();
  });

  it('renders sort dropdown', async () => {
    const app = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const selectElement = (await app.findByTestId('select')) as HTMLSelectElement
    const firstOptionElement = (await app.findByTestId('price')) as HTMLOptionElement
    const secondOptionElement = (await app.findByTestId('rating')) as HTMLOptionElement

      await userEvent.selectOptions(selectElement, 'price');
      expect(firstOptionElement.selected).toBeTruthy();
      expect(secondOptionElement.selected).toBeFalsy();

      app.unmount()

  });
});
