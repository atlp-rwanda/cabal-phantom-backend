   exports.signupEmail = (Email,Password)=>{  
        return `
            <div style="font-size:15px;box-shadow:4px 4px 2px;padding:10px;color:#000">
             <h1 style="font-size:25px;color:#2E86C1;border-bottom: 4px solid #2E86C1;">Phantom App</h1>
             <p style="color:#000;font-size:17px">Thank you for registering on Phantom app.
             You should use the credentials below to sign in:<p>
             Email: <b style="color:#2E86C1">${Email}</b><br>
             Password: <b style="background-color:#2E86C1;color:#fff">${Password}</b>
            </div>
        `
    }

    exports.resetLink =(url)=>{
        return  `
                <div style="font-size:15px;box-shadow:4px 4px 2px;padding:10px;color:#000">
                <h1 style="font-size:25px;color:#2E86C1;border-bottom: 4px solid #2E86C1;">Phantom App</h1>
                <p style="color:#000;font-size:17px">Welcome Again To Phantom app. You May use the this Link provided To Reset your Password:<p>
                Reset Link: <b style="color:#2E86C1">${url}</b><br>
                <strong>NB:</strong><span style="color:OrangeRed">  remember that this link will be expires in 10 minutes </span>
                `
    }
