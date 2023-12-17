import { render, screen } from 'test/utilities';
import PackingList from '.';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  const title = screen.getByText('Packing List');
  expect(title).toHaveTextContent('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  const inputField = screen.getByLabelText('New Item Name');
  expect(inputField).toBeVisible();
});

it(
  'has a "Add New Item" button that is disabled when the input is empty',
  () => {
    render(<PackingList />);
    const addButton = screen.getByRole('button', { name: 'Add New Item' });
    expect(addButton).toBeDisabled();
  },
);

it(
  'enables the "Add New Item" button when there is text in the input field',
  async () => {
    const { user } = render(<PackingList />);
    const inputField = screen.getByLabelText('New Item Name');

    await user.type(inputField, 'MacBook Pro');
    const addButton = screen.getByRole('button', { name: 'Add New Item' });
    expect(addButton).toBeEnabled();
  },
);

it(
  'adds a new item to the unpacked item list when the clicking "Add New Item"',
  async () => {
    const { user } = render(<PackingList />);
    const inputField = screen.getByLabelText('New Item Name');

    await user.type(inputField, 'MacBook Pro');
    const addButton = screen.getByRole('button', { name: 'Add New Item' });
    await user.click(addButton);
    expect(screen.getByLabelText('MacBook Pro')).not.toBeChecked();
  },
);
