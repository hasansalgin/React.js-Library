import axios from 'axios'

const AuthService = {
    login: async(username,password)=>{
        const url = "https://api.escuelajs.co/api/v1/auth/login";
        const response = await axios.post(url,{
            email:username,
            password
        })
        //giriş başarılı ise access ve refresh token döner.
        console.log(response);
        if(response.data.access_token){
            localStorage.setItem("user",JSON.stringify(response.data));
        }
        //giriş başarılı ie tokenleri localstorage'a kaydet!
        return response.data;
    },

    logout: ()=>{
        localStorage.removeItem("user");
        //login durumunda kaydedilen tokenleri localStorage'dan temizler.
    },

    getCurrentUser: ()=>{
        return JSON.parse(localStorage.getItem("user"));
        //girişi yapılan kullanıcının token bilgisini getirmek için
    },
}

export default AuthService;

