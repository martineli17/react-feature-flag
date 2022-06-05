import { useFlagContext } from '../contexts/FlagsContext';

function Menu() {
    const { isEnabled } = useFlagContext();
    const isNewMenu = isEnabled("novo_menu");
    return (
        <div className="App">
            {isNewMenu ? <span>Flag Ativada</span> : <span>Flag Desativada</span>}
        </div>
    );
}

export default Menu;
