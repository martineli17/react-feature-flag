import { useEffect, useRef, useState } from "react";
import { UserGetModel, UserModel } from "../../models/userModel";
import { AddUserAsync, GetUsersAsync } from "../../services/userService";

function FormVersion1() {
    const nameRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
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
        }

        const success = await AddUserAsync(data);
        if (!success)
            alert("Falha ao adicionar usuário");
        else {
            const userResponse = await GetUsersAsync();
            setUsers(userResponse);
        }
    }

    return (
        <>
            <label htmlFor='nome'>Nome</label>
            <input ref={nameRef} type="text" maxLength={25} id="nome" />
            <br />
            <label htmlFor='email'>E-mail</label>
            <input ref={emailRef} type="email" id="email" />
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

export default FormVersion1;