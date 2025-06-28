import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router';
import { Home } from '@/pages/home';
import { User } from '@/pages/user';
import { App } from './app';

const root = document.getElementById('root');

if (root) {
    createRoot(root).render(
        <HashRouter>
            <Routes>
                <Route path="/" element={ <App /> }>
                    <Route index element={ <Home /> } />
                    <Route path="user" element={ <User /> } />
                </Route>
            </Routes>
        </HashRouter>,
    );
}