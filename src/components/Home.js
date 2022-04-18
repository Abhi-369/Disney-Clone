import { collection, onSnapshot, doc, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectNewDisney, selectOriginal, selectRecommend, selectTrending, setMovies } from '../features/movie/movieSlice'
import { selectUserName } from '../features/user/userSlice'
import db from '../firebase'
import ImgSlider from './ImgSlider'
import MovieSection from './MovieSection'
import Viewers from './Viewers'

const Home = (props) => {

    const ColRef = collection(db, "movies");

    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    let recommends = [];
    let newDisneys = [];
    let originals = [];
    let trending = [];

    useEffect(async () => {
        const q = query(ColRef);
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            switch (doc.data().type) {
                case 'recommend':
                    recommends = [...recommends, { id: doc.id, ...doc.data() }];
                    break;
                case 'new':
                    newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
                    break;
                case 'original':
                    originals = [...originals, { id: doc.id, ...doc.data() }]
                    break;
                case 'trending':
                    trending = [...trending, { id: doc.id, ...doc.data() }]
                    break;
            }
        });

        dispatch(setMovies({
            recommend: recommends,
            newDisney: newDisneys,
            original: originals,
            trending: trending,
        }))

    }, [userName])

    const RecommendMovies = useSelector(selectRecommend);
    const TrendingMovies = useSelector(selectTrending);
    const OriginalMovies = useSelector(selectOriginal);
    const NewdisneyMovies = useSelector(selectNewDisney);


    return (
        <Container>
            <ImgSlider />
            <Viewers />
            <MovieSection title="Recommeded for you" movies={RecommendMovies} />
            <MovieSection title="New Disney" movies={NewdisneyMovies} />
            <MovieSection title="Originals" movies={OriginalMovies} />
            <MovieSection title="Trending" movies={TrendingMovies} />
        </Container>
    )
}

const Container = styled.main`
position: relative;
min-height: calc(100vh - 250px);
overflow-x: hidden;
display: block;
top: 72px;
padding: 0 calc(3.5vw + 5px)
background: url('images/home-background.png');
&:after{
    background: url("/images/home-background.png") center center / cover no-repeat fixed; 
    content: " ";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
}
`
export default Home