import Container from './Container';
import HeroSlidShow from './user/HeroSlidShow';
import NotVerified from './user/NotVerified';
import TopRatedMovies from './user/TopRatedMovies';
import TopRatedTVSeries from './user/TopRatedTVSeries';
import TopRatedWebSeries from './user/TopRatedWebSeries';

export default function Home() {
    return (
        <div className='dark:bg-primary bg-white min-h-screen'>
            <Container className='px-2 xl:p-0'>
                <NotVerified />

                {/* Slider */}
                <HeroSlidShow />

                {/* Most rated movies */}
                <TopRatedMovies />

                {/* Most rated Web series */}
                <TopRatedWebSeries />

                {/* Most rated tv series */}
                <TopRatedTVSeries />
            </Container>
        </div>
    );
};
