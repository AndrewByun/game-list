import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '@/app/dashboard/gamelist/page';

jest.mock('../app/ui/gamelist/search', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid='mock-search' />),
}));

jest.mock('../app/ui/gamelist/table', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid='mock-table' />),
}));

jest.mock('../app/ui/gamelist/pagination', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid='mock-pagination' />),
}));

jest.mock('../app/lib/data', () => ({
  __esModule: true,
  fetchGamesPages: jest.fn(() => Promise.resolve(10)),
}));

describe('Gameslist Page should render a header and mock components', () => {
  it('renders a header and child components', async () => {
    render(<Page searchParams={{
        query: '',
        page: '1',
    }}/>);

    expect(screen.getByText('Games')).toBeInTheDocument();

    expect(screen.getByTestId('mock-search')).toBeInTheDocument();

    expect(screen.getByTestId('mock-table')).toBeInTheDocument();

    expect(screen.getByTestId('mock-pagination')).toBeInTheDocument();
  });
});
