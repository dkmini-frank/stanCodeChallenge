/**
 * @file Project index file
 * @date 2023-11-08
 * @author Frank Su
 * @lastModify Frank Su 2023-11-08
 */
import RootRouter from './Route';
import { Provider } from 'react-redux';
import store from './Store/rootStore';
import ReactDOM from 'react-dom/client';
import './global.css';
ReactDOM.createRoot(document.getElementById('root') ?? document.body).render(
    <Provider store={store}>
        <RootRouter />
    </Provider>,
);
