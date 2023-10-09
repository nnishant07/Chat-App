import React from 'react'
import {Link as RouterLink} from "react-router-dom"
import FormProvider from '../../components/hook-form/FormProvider'
import { useState } from 'react'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, IconButton,Button, InputAdornment, Link, Stack, } from '@mui/material';
import { RHFTextField } from '../../components/hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { useCallback } from 'react';

const ProfileForm = () => {


    const ProfileSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        about: Yup.string().required("About is required"),  
        avatarUrl: Yup.string().required("Avatar is required").nullable(true),
    });

    const defaultValues = {
        name: "",
        about: "",
    }

    const methods = useForm({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const { reset,watch,control, setError,setValue, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods;

    const values = watch();

    const handleDrop = useCallback((acceptedFiles) =>{
        const file=acceptedFiles[0];
        const newFile= Object.assign(file,{
            preview: URL.createObjectURL(file)
        })

        if(file){
            setValue("avatarUrl",newFile,{shouldValidate: true})
        }
    }, [setValue] );

    const onSubmit = async (data) => {
        try {
            //submit data to backend
            console.log("Data",data);
        }
        catch (error) {
            console.log(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message,
            })
        }
    }
    return (
        <div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                <Stack spacing={3}>
                    {!!errors.afterSubmit && <Alert severity="error">
                        {errors.afterSubmit.message}
                    </Alert>}
                

                <RHFTextField name="name" label="Name" helperText={"This name is visible to your contacts"}/>
                <RHFTextField multiline rows={3} maxRow={5} name="about" label="About"/>
                </Stack>

                <Stack direction={"row"} justifyContent={'end'}>
                    <Button color="inherit" size="large" type="submit" variant='outline' sx={{bgcolor:"text.primary",
               color:(theme)=>theme.palette.mode === "light" ? "common.white" : "grey.800",
                '&hover':{
                    bgcolor: "text.primary",
                    color: (theme) => theme.palette.mode === 'light'? "common.white" : "grey.800",
                },
               }}>
                        Save
                    </Button>
                </Stack>
                </Stack>
                
            </FormProvider>
        </div>
    )
}

export default ProfileForm;