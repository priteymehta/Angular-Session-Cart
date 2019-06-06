export interface ILoginRequest {
    id : string;
    password : string; 
}

export interface ILoginResponse{
    isSuccess : boolean;
    message : string;
}
