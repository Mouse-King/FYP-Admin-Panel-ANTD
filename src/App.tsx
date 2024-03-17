import React from 'react';
import { ConfigProvider, theme as a } from 'antd';
import { Suspense, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { history, HistoryRouter } from '@/routes/history';
import RenderRouter from './routes';
import { setGlobalState } from './stores/global.store';

const App: React.FC = () => {
    const { locale } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.global);
    const dispatch = useDispatch();
    const setTheme = (dark = true) => {
        dispatch(
            setGlobalState({
                theme: dark ? 'dark' : 'light',
            }),
        );
    };

    useEffect(() => {
        setTheme(theme === 'dark');
        if (!localStorage.getItem('theme')) {
            const mql = window.matchMedia('(prefers-color-scheme: dark)');
            function matchMode(e: MediaQueryListEvent) {
                setTheme(e.matches);
            }
            mql.addEventListener('change', matchMode);
        }
    }, []);

    return (
        <ConfigProvider
            componentSize="middle"
            theme={{ token: { colorPrimary: '#13c2c2' }, algorithm: theme === 'dark' ? a.darkAlgorithm : a.defaultAlgorithm }}
        >
            <IntlProvider locale={locale.split('_')[0]}>
                <HistoryRouter history={history}>
                    <Suspense fallback={null}>
                        <RenderRouter />
                    </Suspense>
                </HistoryRouter>
            </IntlProvider>
        </ConfigProvider>
    );
};

export default App;
