import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup";

import "./SignUp.css"
const SignUp = () => {
    const [readOnly, setReadOnly] = useState(true);

    type InitialValues = {
        email: string;
        password: string | RegExp;
        };
        
        const initialValues: InitialValues = {
            email: "",
            password: "",
        };
        
        // form schema
        const FormSchema = Yup.object().shape({
            email: Yup.string()
              .email("Invalid email")
              .required("email is required to sign up"),
            password: Yup.string()
              .min(8, "Password too short!")
              .max(20, "Password tooo Long!")
              .required("Password is required to sign up")
              .matches(
                /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/,
                "Password must have at least one letter one number and 6 characters at least in total."
              ),
            firstName: Yup.string().required("Name is required to sign up").matches(/\w+/)
        });
        
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={FormSchema}
    onSubmit={(values: InitialValues) => { 
        console.log(values);
    }}>
    {({errors, touched, handleChange}) => {
        return (
            <Form>
                    <Box sx={{width: "324px", height: "730px", display: "flex", flexDirection: "column", gap: "10px", p: 4, position: "relative"}}>
                    <IconButton sx={{position: "absolute", top: "10px", right: "0px"}}>
                    <CloseIcon />

                    </IconButton>
        <Typography sx={{fontWeight: "bolder"}}>
            sign up
        </Typography>
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Typography variant='subtitle2'>Email Address</Typography>
            <input type="email" name="email" id="email" placeholder="Enter your email..." className="input" onChange={handleChange}/>
        </Box>
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Typography variant='subtitle2'>First Name</Typography>
            <input type="text" name="firstName" id="firstName" placeholder="Enter your first name..." className="input" onChange={handleChange}/>
        </Box>
        <Box sx={{display: "flex", flexDirection: "column"}}>
        <Typography variant='subtitle2'>Password</Typography>
            <input type="password" name="password" id="password" placeholder="Enter your password..." className='input' onChange={handleChange} readOnly={readOnly}
            onFocus={ () => setReadOnly(false) }
            onBlur={ () => setReadOnly(true) }/>
        </Box>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 3}}>
            <Button type="submit" sx={{p: 2.7, width: "324px", height: "24px", background: "black", color: "white", "&:hover": { background: "#222", color: "white"}, textTransform: "none", fontWeight: "bolder", borderRadius: "20px"}}>Sign up</Button>
            <Typography variant='subtitle2' sx={{textDecoration: "underline"}}>Trouble signing up?</Typography>
        </Box>
        <Box>
        {errors.email && touched.email ? (
        <Typography variant="subtitle2" color="error">
            * {errors.email} *
        </Typography>
        ) : null}
        {errors.password && touched.password ? (
        <Typography variant="subtitle2" color="error">
            * {errors.password} *
        </Typography>
        ) : null}
        </Box>

        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
        <div className="hr-sect">
            <Typography variant='subtitle1' sx={{p:1, m:1}}>OR</Typography>
        </div>

        </Box>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2}}>
        <Button sx={{p: 2.7, width: "324px", height: "24px", background: "white", color: "black", border: "1px solid black", "&:hover": {}, textTransform: "none", fontWeight: "bolder", borderRadius: "20px", display: "flex", justifyContent: "space-evenly",gap:"20px"}}><img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/640px-Google_%22G%22_Logo.svg.png"} style={{width: "25px"}}/><Typography>sign up with Google</Typography></Button>
        <Button sx={{p: 2.7, width: "324px", height: "24px", background: "white", color: "black", border: "1px solid black", "&:hover": {}, textTransform: "none", fontWeight: "bolder", borderRadius: "20px", display: "flex", justifyContent: "space-evenly", gap:"20px"}}><img src={"https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-facebook_-512.png"} style={{width: "25px"}}/><Typography>sign up with Facebook</Typography></Button>
        <Button sx={{p: 2.7, width: "324px", height: "24px", background: "white", color: "black", border: "1px solid black", "&:hover": {}, textTransform: "none", fontWeight: "bolder", borderRadius: "20px", display: "flex", justifyContent: "space-evenly", gap:"20px"}}><img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/833px-Apple_logo_black.svg.png"} style={{width: "25px"}}/><Typography>sign up with Facebook</Typography></Button>
        </Box>
        <Box>
            <Typography variant='subtitle2' sx={{fontSize: "75%"}}>By clicking sign up or Continue with Google, Facebook, or Apple, you agree to Betsy's Terms of Use and Privacy Policy. Betsy may send you communications; you may change your preferences in your account settings. We'll never post without your permission.</Typography>
        </Box>
    </Box>
            </Form>
        )
    }}
</Formik>

  )
}

export default SignUp