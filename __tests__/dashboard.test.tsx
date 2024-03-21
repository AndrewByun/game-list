import '@testing-library/jest-dom';
import {act, waitFor, render, screen} from '@testing-library/react';
import Page from '@/app/dashboard/(overview)/page';

describe('Page', () => {
    it('renders a heading', () => {
        // Render the Page component
        // render(<Page />);
        waitFor(()=>{
            render(<Page/>)
        })
        // Check if the heading text is present
        expect(screen.getByText('Dashboard Home Page')).toBeInTheDocument();
    });
});