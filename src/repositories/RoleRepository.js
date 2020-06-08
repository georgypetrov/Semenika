import Repository from "./Repository";
import axios from "axios";
import store from "../store";

export default {
    uploadDocument(payload) {
        const token = store.getters["Auth/accessToken"];
        return axios.post(process.env.VUE_APP_API_URL+"/roledocument", payload, {
            headers:{
                'content-type': 'multipart/form-data',
                'Authorization': token
            }
        })
        // return Repository.post("/roledocument", payload);
    },
    addNewRole( payload ){
        return Repository.post("/roleadd", payload);
    },
    approveRole( payload ) {
        return Repository.post("/roledocumentapproval", payload);
    }
}