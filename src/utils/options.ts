export interface IUrlOptions {
    method: string;
    headers: {
        'X-RapidAPI-Key': string;
        'X-RapidAPI-Host': string;
    };
}

export const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_KEY as string,
        'X-RapidAPI-Host': process.env.REACT_APP_HOST as string,
    }
};