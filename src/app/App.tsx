import {Suspense, useState} from "react";
import {StoreProvider} from "./providers/StoreProvider";
import {MainPage} from "../pages/MainPage";
import {ThemeProvider, Theme, Button} from "@gravity-ui/uikit";
import {LOCAL_STORAGE_THEME_KEY} from "../shared/consts/localstorage";
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

function App() {
    const [theme, setTheme] = useState<Theme>(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme)

    const switchTheme = (theme: Theme): void => {
        if (theme === "light-hc") {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, 'dark')
            setTheme('dark')
        } else {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, 'light-hc')
            setTheme('light-hc')
        }
    }

    return (
        <Suspense fallback={''}>
            <StoreProvider>
                <ThemeProvider theme={theme}>
                    <Button onClick={() => switchTheme(theme)}>{theme === 'dark' ? 'Светлая' : 'Тёмная'}</Button>
                    <MainPage/>
                </ThemeProvider>
            </StoreProvider>
        </Suspense>
    );
}

export default App;
