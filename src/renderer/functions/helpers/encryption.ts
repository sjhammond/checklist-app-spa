import crypto from 'crypto'; 

export const encryptDecryptData = (data:string, mode:string) => {
    const algorithm = 'aes-256-ctr';
    const key = '08d5ff9b9665f9f928e9a9aa8e5a40368ad3b5e194e7224abd20e773aa97bbe3';  

    switch (mode) {
        case 'encrypt': 
            const cipher = crypto.createCipher(algorithm, key);
            let crypted = cipher.update(data,'utf8','hex');
            crypted += cipher.final('hex');
            return crypted;
        
        case 'decrypt':
            const decipher = crypto.createDecipher(algorithm, key);
            let dec = decipher.update(data,'hex','utf8');
            dec += decipher.final('utf8');
            return dec;

        default:
            return console.error('Encrpytion/Decryption failed: no mode specified.');
    }
}