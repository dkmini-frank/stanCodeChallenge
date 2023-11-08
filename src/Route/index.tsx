/**
 * @file Project Router File
 * @date 2023-11-08
 * @author Frank Su
 * @lastModify Frank Su 2023-11-08
 */
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Homepage from '../Pages/Homepage';
import ProgramPage from '../Pages/ProgramPage';
/* <------------------------------------ **** Lazy Loading all the pages START **** ------------------------------------ */

/* <------------------------------------ **** Lazy Loading all the pages END **** ------------------------------------ */

const RootRouter = (): JSX.Element => {
    return (
        <Suspense
            fallback={
                /* <------------------------------------ **** Loading Animation START **** ------------------------------------ */
                <div>123</div>
                /* <------------------------------------ **** Loading Animation END **** ------------------------------------ */
            }
        >
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/program" element={<ProgramPage />} />
                </Routes>
            </Router>
        </Suspense>
    );
};

export default RootRouter;
