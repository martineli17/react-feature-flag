import { useEffect, useRef, useState } from "react";
import { UserGetModel, UserModel } from "../../models/userModel";
import { AddNewUserAsync, GetUsersAsync } from "../../services/userService";

function FormVersion2() {
    const nameRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const cpfRef = useRef<HTMLInputElement>();
    const [users, setUsers] = useState<UserGetModel>();

    useEffect(() => {
        async function Execute() {
            setUsers(await GetUsersAsync());
        }
        Execute();
    }, []);

    const handleSubimit = async () => {
        const data: UserModel = {
            nome: nameRef.current.value,
            email: emailRef.current.value,
            cpf: cpfRef.current.value === "" ? null : cpfRef.current.value,
        }

        const success = await AddNewUserAsync(data);
        if (!success)
            alert("Falha ao adicionar usuário");
        else
            setUsers(await GetUsersAsync());
    }

    return (
        <>
            <label htmlFor='nome'>Nome</label>
            <input ref={nameRef} type="text" maxLength={25} id="nome" />
            <br />
            <label htmlFor='email'>E-mail</label>
            <input ref={emailRef} type="email" id="email" />
            <br />
            <label htmlFor='cpf'>CPF</label>
            <input ref={cpfRef} type="text" maxLength={11} id="cpf" />
            <br />
            <button onClick={handleSubimit}>Enviar</button>
            <hr />
            {
                users &&
                (
                    <table>
                        <thead>
                            <tr>
                                <th>Origem</th>
                            </tr>
                            <tr>
                                <td>{users.from}</td>
                            </tr>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>CPF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.users?.map(user => (
                                    <tr>
                                        <td >{user.nome}</td>
                                        <td>{user.email}</td>
                                        <td>{user.cpf}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </>
    )
}

export default FormVersion2;