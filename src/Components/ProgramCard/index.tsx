/**
 * @file
 * @date 2023-11-08
 * @author Frank Su
 * @lastModify Frank Su 2023-11-08
 */

import { FC, useEffect } from 'react';
import { moiveData } from '~/Api/mockMovieData';
import style from './style.scss';
// program card props interface
interface ProgramCardProps {
    data: moiveData | undefined;
    isLoading: boolean;
    errorStatus: boolean;
}
const ProgramCard: FC<ProgramCardProps> = ({ data, isLoading, errorStatus }): JSX.Element => {
    // this useEffect will handle backspace key function and redirect to homepage
    useEffect(() => {
        const onkeydown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Backspace':
                    console.log('123');
                    window.location.href = '/';
                    break;
            }
        };

        window.addEventListener('keydown', onkeydown);
        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    if (isLoading) {
        return (
            <div className={style.program_wrapper} data-testid="programCard-isLoading">
                <div className={style.program_imageWrapper_skeleto} />
                <div className={style.program_contentWrapper_skeleto}>
                    <div className={style.program_content_skeletoOne}></div>
                    <div className={style.program_content_skeletoTwo}></div>
                    <div className={style.program_content_skeletoThree}></div>
                </div>
            </div>
        );
    } else {
        if (!errorStatus) {
            return (
                <div className={style.program_wrapper} data-testid="programCard-normal">
                    <img src={data?.image} />

                    <div className={style.program_contentWrapper}>
                        <h1>{data?.title}</h1>
                        <h2>
                            {`${data?.rating} | ${data?.year} | ${data?.type} | ${data?.genre} | ${data?.language}`}
                        </h2>
                        <p>{data?.description}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={style.program_error} data-testid="programCard-error">
                    An unknown error occurred. please try again later
                </div>
            );
        }
    }
};
export default ProgramCard;
