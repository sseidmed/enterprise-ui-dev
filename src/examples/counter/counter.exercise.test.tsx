import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
import { render } from './test/utilities.solution';


test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  const user = render(<Counter initialCount={2}/>);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('2');
});

test(
  'it should reset the count when the "Reset" button is pressed',
  async () => {
    const { user } = render(<Counter initialCount={10}/>);

    const currentCount = screen.getByTestId('current-count');
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    
    await user.click(resetButton);
    expect(currentCount).toHaveTextContent('0');
  },
);
