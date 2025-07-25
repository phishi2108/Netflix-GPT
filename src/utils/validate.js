export const checkValidateData = (email, password) => {
    const isEmailValid = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);//example@example.com
    const isPasswordValid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password);//drum@123


    if(!isEmailValid) return"Email Id is not Valid";
    if(!isPasswordValid) return"Password is not Valid";

    return null;

};
