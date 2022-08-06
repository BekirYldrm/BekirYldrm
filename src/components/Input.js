import React from "react";  

// username ve displayName4 karakterden az ise hatayı kullanıcıya gösterir.
//password 8 karakterden az ise veya özel karakter içerirse hatayı kullanıcıya gösterir.
// web sayfasının düzenini gösterir.
const Input = (props) => {  
    const { label, error, onChange, name, type } = props;
    const className = error ? "form-control is-invalid" : "form-control";
    return (
    <div className="form-group">
            <label>{label}</label>
            <input className={className} name={name} type={type} onChange={onChange} />
            <div className="invalid-feedback">{error} </div>
    </div>
    );
};

export default Input;