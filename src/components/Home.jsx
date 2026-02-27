import Container from './Container';
import NotVerified from './user/NotVerified';
import TopRatedMovies from './user/TopRatedMovies';

export default function Home() {
    return (
        <div className='dark:bg-primary bg-white min-h-screen'>
            <Container>
                <NotVerified />

                {/* Slider */}

                {/* Most rated movies */}
                <TopRatedMovies />
            </Container>
        </div>
    );
};
