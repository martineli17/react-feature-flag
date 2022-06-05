import { UserGetModel, UserModel } from "../models/userModel";

export async function AddNewUserAsync(user: UserModel): Promise<boolean> {
    let request: RequestInit = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const response = await fetch("http://localhost:14571/user/feature", request);
    console.log(response)
    return response.status === 201;
}

export async function AddUserAsync(user: UserModel): Promise<boolean> {
    let request: RequestInit = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const response = await fetch("http://localhost:14571/user", request);
    console.log(response)
    return response.status === 201;
}


export async function GetUsersAsync(): Promise<UserGetModel> {
    let request: RequestInit = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch("http://localhost:14571/user/get", request);
    console.log(response)
    return await response.json() as UserGetModel;
}