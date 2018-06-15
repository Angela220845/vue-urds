import axios from 'axios';
export class BaseApi {
    constructor() {
        this.$axios = axios;
    }
}