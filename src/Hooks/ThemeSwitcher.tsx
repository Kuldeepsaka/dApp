import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleTheme } from '../store/slices/themeSlice';
import Button from 'react-bootstrap/Button';

export function ThemeSwitcher() {
    const mode = useAppSelector((state) => state.theme.mode);
    const dispatch = useAppDispatch();

    return (
        <Button
            variant={mode === 'light' ? 'outline-dark' : 'outline-light'}
            onClick={() => dispatch(toggleTheme())}
        >
            {mode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Button>
    );
}
