import { render, screen } from '@testing-library/react';
import ProgramCardProps from '../../ProgramCard';
import { mockCarouselData } from '../../../Api/mockMovieData';
import '@testing-library/jest-dom/extend-expect';

test('should render header component', () => {
    render(<ProgramCardProps data={mockCarouselData[0]} isLoading={false} errorStatus={false} />);
    const programCard = screen.getByTestId('programCard-normal');
    expect(programCard).toBeInTheDocument();
    expect(programCard).toHaveTextContent('Dr. Death');
    expect(programCard).toHaveTextContent(
        'Dr. Death tells the terrifying true story of Dr. Christopher Duntsch (Joshua Jackson), a brilliant but sociopathic neurosurgeon whose patients leave his operating room either permanently maimed or dead, and the two doctors who set out to stop him.',
    );
});
test('when component is loading', () => {
    render(<ProgramCardProps data={mockCarouselData[0]} isLoading={true} errorStatus={false} />);
    const programCard = screen.getByTestId('programCard-isLoading');
    expect(programCard).toBeInTheDocument();
});
test('when component is error', () => {
    render(<ProgramCardProps data={mockCarouselData[0]} isLoading={false} errorStatus={true} />);
    const programCard = screen.getByTestId('programCard-error');
    expect(programCard).toBeInTheDocument();
    expect(programCard).toHaveTextContent('An unknown error occurred. please try again later');
});
