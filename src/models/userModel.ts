export interface UserModel {
    nome: string;
    email: string;
    cpf?: string;
}

export interface UserGetModel {
   users: UserModel[];
   from: string;
}