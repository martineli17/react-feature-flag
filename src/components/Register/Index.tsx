import { useFlagContext } from "../../contexts/FlagsContext";
import FormVersion1 from "./FormVersion1";
import FormVersion2 from "./FormVersion2";

function Register(){
    const { isEnabled } = useFlagContext();
    const isVersion2 = isEnabled("novo_menu");

    return (
        <>
            {
                isVersion2
                ? <FormVersion2 />
                : <FormVersion1 />
            }
        </>
    )
}

export default Register;