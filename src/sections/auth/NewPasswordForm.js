import React from 'react'
import FormProvider from '../../components/hook-form/FormProvider'
import { useState } from 'react'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, IconButton, Button, InputAdornment, Link, Stack } from '@mui/material';
import { RHFTextField } from '../../components/hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NewPassword } from '../../redux/slices/auth';

const NewPasswordForm = () => {
    const [queryParameters] = useSearchParams();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const NewPasswordSchema = Yup.object().shape({
        password: Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required"),
        passwordConfirm: Yup.string().required("Confirm Password is required").oneOf([Yup.ref('password'), null], "Password must match"),
    });

    const defaultValues = {
        password: "",
        passwordConfirm: ""
    }

    const methods = useForm({
        resolver: yupResolver(NewPasswordSchema),
        defaultValues,
    });

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods;

    const onSubmit = async (data) => {
        try {
            //submit data to backend
            // since we cannot provide token in data
            const token = queryParameters.get("token");
            dispatch(NewPassword({...data, token : token}));
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
                    {!!errors.afterSubmit && <Alert severity="error">
                        {errors.afterSubmit.message}
                    </Alert>}

                    <RHFTextField name="password" label="New Password" type={showPassword ? "text" : "password"} InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={() => {
                                    setShowPassword(!showPassword);
                                }}>
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    />
                    <RHFTextField name="passwordConfirm" label="Confirm Password" type={showPassword ? "text" : "password"} InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={() => {
                                    setShowPassword(!showPassword);
                                }}>
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    />

                    <Button fullWidth color="inherit" size="large" type="submit" variant="contained" sx={{
                        bgcolor: "text.primary",
                        color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                        '&hover': {
                            bgcolor: "text.primary",
                            color: (theme) => theme.palette.mode === 'light' ? "common.white" : "grey.800",
                        },
                    }}>
                        Submit
                    </Button>

                </Stack>

            </FormProvider>
        </div>
    )
}

export default NewPasswordForm;
