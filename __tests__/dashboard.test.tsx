import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Page from '@/app/dashboard/(overview)/page';
//need to mock the children components of Page
// Mock the CardWrapper component
jest.mock('../app/ui/dashboard/cards', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-card-wrapper">Mock CardWrapper</div>,
  }));
  
  // Mock the RecentGames component
  jest.mock('../app/ui/dashboard/recentgames', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-recent-games">Mock RecentGames</div>,
  }));
  
  // Mock the Suspense fallback components
  jest.mock('../app/ui/skeletons', () => ({
    __esModule: true,
    CardsSkeleton: () => <div data-testid="mock-cards-skeleton">Mock CardsSkeleton</div>,
    GamesPreviewSkeleton: () => <div data-testid="mock-games-preview-skeleton">Mock GamesPreviewSkeleton</div>,
  }));
  
  describe('Page', () => {
    it('renders header and mock components', async () => {
      render(<Page />);
  
      // Check if the header is rendered
      expect(screen.getByText('Dashboard Home Page')).toBeInTheDocument();
  
      // Check if the mock components are rendered
      expect(screen.getByTestId('mock-card-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('mock-recent-games')).toBeInTheDocument();
    });
  });