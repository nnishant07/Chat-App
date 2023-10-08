import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import * as Yup from 'yup'
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from '../../components/hook-form/FormProvider';
import  RHFTextField  from '../../components/hook-form/RHFTextField';
import  RHFAutocomplete  from '../../components/hook-form/RHFAutocomplete';

const MEMBERS = ["Name1", "Name2", "Name3"];

// TODO => Refactor
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({handleClose}) => {
  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Enter the name of group"),
    members: Yup.array().min(2, "Must have atleast 2 members"),
  });
  const defaultValues = {
    title: "",
    members: [],
  }
  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  })

  const { reset, 
      watch,
      setError, 
      handleSubmit, 
      formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
    } = methods

  const onSubmit = async(data) => {
    try{
      // API call
      console.log("DATA", data);
    } 
    catch(error){
      console.log("error", error);
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

      <Stack spacing={3}>
        <RHFTextField name="title" label="Title"/>
        <RHFAutocomplete name="members" label="Members" multiple freeSolo options={MEMBERS.map((option) => option)} ChipProps={{size: "medium"}} />
      </Stack>
      <Stack spacing={2} direction={"row"} alignItems={"center"} justifyContent={"end"}>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Stack>

    </FormProvider>
  )
}

export const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} TransitionComponent={Transition} keepMounted sx={{ p: 4 }}>
      <DialogTitle sx={{mb: 3}}>Create New Group</DialogTitle>
      <DialogContent>
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroup