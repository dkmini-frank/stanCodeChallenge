/**
 * @file Program Page
 * @date 2023-11-08
 * @author Frank Su
 * @lastModify Frank Su 2023-11-08
 */

import { useEffect, useState } from 'react';
import Header from '~/Components/Header';
import ProgramCard from '~/Components/ProgramCard';
import style from './style.scss';
import { moiveData, fetchData } from '~/Api/mockMovieData';

const ProgramPage = (): JSX.Element => {
    // whether the page show the loading skeleto
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // this state is the selected movie detial
    const [movieDetail, setMovieDetail] = useState<moiveData | undefined>(undefined);
    // this state control the data fetch from back end
    const [backEndData, setBackEndData] = useState<moiveData[] | undefined>();
    // this state control show the error
    const [errorStatus, setErrorStatus] = useState<boolean>(false);

    /**
     * this effect will mock to fetch the data from the back end
     * @param {}
     */
    useEffect(() => {
        /**
         * this function is to get the movie detail
         */
        const handleGetMovieDetail = () => {
            if (backEndData)
                for (let l = 0; l < backEndData.length; l++) {
                    if (`${backEndData[l].id}` == localStorage.getItem('currentCard')) {
                        return backEndData[l];
                    }
                }
        };
        // instate with the ajax call, I am using a promise instead of real ajaxcall
        // so I also give the ajax call example here
        const mockData = async () => {
            try {
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
        setMovieDetail(handleGetMovieDetail());
    }, [backEndData]);
    return (
        <div className={style.programPage_container}>
            <Header />
            <ProgramCard data={movieDetail} isLoading={isLoading} errorStatus={errorStatus} />
        </div>
    );
};
export default ProgramPage;
