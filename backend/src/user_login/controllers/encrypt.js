const bcrypt =require("bcryptjs");

const encrypt ={};

encrypt.matchPassword = async (password, savedPassword) => {
    try{
        return await bcrypt.compare(password, savedPassword);
    } catch(e){
        console.log(e);
    }
};

module.exports = encrypt;
