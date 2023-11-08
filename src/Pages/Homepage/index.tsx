/**
 * @file
 * @date 2023-11-08
 * @author Frank su
 * @lastModify  2023-11-08
 */
import style from './style.scss';
import Header from '~/Components/Header';
import Carousel from '~/Components/Carousel';
import { fetchData, moiveData } from '~/Api/mockMovieData';
import { useState, useEffect } from 'react';

const Homepage = (): JSX.Element => {
    // this state is to control show the loading or not
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // this state control the data fetch from back end
    const [backEndData, setBackEndData] = useState<moiveData[] | undefined>();
    // this state control show the error
    const [errorStatus, setErrorStatus] = useState<boolean>(false);
    useEffect(() => {
        const mockData = async () => {
            try {
                // instate with the ajax call, I am using a promise instead of real ajaxcall
                // so I also give the ajax call example here
                const response = await fetchData();
                // let response = await fetch(url,paylaod)
                //  response = await response.json();
                setBackEndData(response);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setErrorStatus(true);
            }
        };
        void mockData();
    });

    return (
        <div className={style.homepage_container}>
            <Header />
            <Carousel data={backEndData} isLoading={isLoading} error={errorStatus} />
        </div>
    );
};
export default Homepage;
