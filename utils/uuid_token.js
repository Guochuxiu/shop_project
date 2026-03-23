import { v4 as uuidv4 } from 'uuid';

export default function getUUID() {
    //先从本地存储拿uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    if (!uuid_token) {
        //如果本地存储没有uuid，就生成一个并存储到本地
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    return uuid_token;
}