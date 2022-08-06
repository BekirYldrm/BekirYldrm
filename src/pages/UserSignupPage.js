import React from "react";
import {signup} from '../api/apiCalls';
import Input from "../components/Input";

//Kullanıcı arayüzünü sekillendiriğimiz ,belirli methodlar kullandığımız kısımdır.
class UserSignupPage extends React.Component{
    //değişkenleri componentte  state ile durumlarını tutuyoruz.
    state = {
        username:null,
        displayName:null,
        password:null,
        passwordRepeat:null,
        pendingApiCall : false,
        errors : {}
    };
    //Burda kullanıcının girdiği değerleri geliştirici için görülebilir yapıtık.
    //bir veya daha fazla degiskeni const ile tanımladık.aynı zamanda errors degiskeninin görevini bildirmis olduk .
    //nameyi setState ile cagırdık ve degiskenin degerini degistirdik.
    onChange = event => {
        const {name,value}= event.target;
        const errors = {...this.setState.errors};
        errors[name] = undefined;
        this.setState({
            [name]:value,
            errors
        });
    };
    // username ve diger degiskenlere this.state ile  tanımladık.
    //pendingApiCalli set state ile true ediyoruz.
    onClickSignup = async event =>{
        event.preventDefault();
        const{username,displayName,password}=this.state;
        const body ={
            username :username,
            displayName:displayName,
            password:password
        };
        this.setState({ pendingApiCall: true});

        try{
            const response  = await signup(body);
        }catch (error){
            if (error.response.data.validationErrors){
                this.setState({errors: error.response.data.validationErrors});
            }
        }

        this.setState({ pendingApiCall: false });
        
    };  

    //Burda input classını cagırdık ve icindeki fonksiyonu username displayName ve password için çalıştırmış olduk.
    //Yani sayfa düzenini oluşturmuş ve kullanıcının arayüzünde hatalı giris oldugunda bunu kullanıcıya  göstermis oluyoruz.
    //Aynı zamanda APİ call kullandıgımız icin arayüzde kullanıcının girmiş olduğu degerler backende erişelilebilir yapıldı.
    
    render(){
        const {pendingApiCall,errors} = this.state;
        const {username,displayName,password} = errors;
        return(

            <div className="container">
                <form>
                    <h1 className="text-center" > Sign Up</h1>
                    <Input name = "username"  label = "Username" error = {username}  onChange ={this.onChange} />
                    <Input name = "displayName"  label = "Display Name" error = {displayName}  onChange ={this.onChange} />
                    <Input name = "password"  label = "Password" error = {password}   type="password" onChange ={this.onChange} />
                    <div className="form-group">
                        <label>Password Repeat</label>
                        <input className="form-control" type="password" name="passwordRepeat" onChange={this.onChange}/>
                    </div>
                    <div className="text-center">
                        <button  className="btn btn-primary" onClick={this.onClickSignup} disabled={pendingApiCall}>
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"> </span>} Sign Up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
export default UserSignupPage;