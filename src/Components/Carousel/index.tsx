/**
 * @file this is the carousel component
 * @date 2023-11-08
 * @author Frank su
 * @lastModify Frank su 2023-11-08
 */
import { FC, useState, useEffect } from 'react';
import style from './style.scss';
import { moiveData } from '~/Api/mockMovieData';

// the props data type
interface CarouselProps {
    data: moiveData[] | undefined;
    isLoading: boolean;
    error: boolean;
}

const Carousel: FC<CarouselProps> = ({ data, isLoading = true, error }): JSX.Element => {
    /**
     * this hooks is the carsouel rendered data which only have 6 cards can be render at one time
     */
    const [carouselRenderData, setCarouselRenderData] = useState<moiveData[]>();

    /**
     * this hooks is record the last card id
     */
    const [lastCardId, changeLastCarId] = useState<number>();

    /**
     * this function is about when press left arrow what happend
     * @param {}
     */
    const handleLeftArrowPress = () => {
        if (carouselRenderData && data) {
            const temporaryData = [...carouselRenderData];
            temporaryData.splice(5.1);

            for (let l = 0; l < data.length; l++) {
                if (carouselRenderData[0].id === data[l].id) {
                    if (l - 1 >= 0) {
                        temporaryData.unshift(data[l - 1]);
                    } else {
                        temporaryData.unshift(data[data.length - 1]);
                    }
                }
            }
            changeLastCarId(temporaryData[5].id);
            setCarouselRenderData(temporaryData);
            localStorage.setItem('currentCard', `${temporaryData[2].id}`);
        }
    };
    /**
     * this function is about when press left arrow what happend
     * @param {}
     */
    const handleRightArrowPress = () => {
        if (carouselRenderData && data) {
            const temporaryData = [...carouselRenderData];
            temporaryData.splice(0, 1);
            for (let l = 0; l < data.length; l++) {
                if (data[l].id === lastCardId) {
                    if (l + 1 < data.length) {
                        temporaryData.push(data[l + 1]);
                        changeLastCarId(data[l + 1].id);
                    } else {
                        temporaryData.push(data[0]);
                        changeLastCarId(data[0].id);
                    }
                }
            }
            setCarouselRenderData(temporaryData);
            localStorage.setItem('currentCard', `${temporaryData[2].id}`);
        }
    };

    /**
     * this function is about when enter button press
     * @param {}
     */
    const handleEnterPress = () => {
        window.location.href = '/program';
    };
    /**
     * this function is about left and right and enter key event
     * @param {KeyboardEvent} e
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onkeydown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                handleEnterPress();
                break;
            case 'ArrowLeft':
                handleLeftArrowPress();
                break;
            case 'ArrowRight':
                handleRightArrowPress();
                break;
        }
    };

    /**
     * this is the error style
     */

    const handleError = () => {
        return (
            <div className={style.carousel_error}>
                An unknown error occurred. please try again later
            </div>
        );
    };

    /**
     * this use effact is to set the carousel data when component load
     */
    useEffect(() => {
        const intitalCarouselData: moiveData[] = [];
        if (data) {
            for (let l = 0; l < 6; l++) {
                if (data[l]) {
                    intitalCarouselData.push(data[l]);
                }
            }
            setCarouselRenderData(intitalCarouselData);
            changeLastCarId(intitalCarouselData[5].id);
        }
    }, [data]);

    /**
     * this use effact is using to add key event to the window, and remove the key event when component unmount
     */

    useEffect(() => {
        window.addEventListener('keydown', onkeydown);
        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, [carouselRenderData, onkeydown]);

    // accordin to different loading stause to render different ui
    if (isLoading) {
        return (
            <div className={style.carousel_container}>
                {[1, 2, 3, 4, 5, 6].map((item) => {
                    return <div className={style.carousel_skeleton} key={item} />;
                })}
            </div>
        );
    } else {
        if (!error) {
            return (
                <div className={style.carousel_container}>
                    {carouselRenderData
                        ? carouselRenderData.map((item, index) => {
                              return (
                                  <div
                                      className={
                                          index === 2
                                              ? style.carousel_item_selected
                                              : style.carousel_item
                                      }
                                      key={item.id}
                                  >
                                      <img src={item.image} />
                                  </div>
                              );
                          })
                        : handleError()}
                </div>
            );
        } else {
            return handleError();
        }
    }
};
export default Carousel;
