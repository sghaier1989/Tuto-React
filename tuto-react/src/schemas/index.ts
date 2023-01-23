import * as yup from "yup";

const validationSchema = yup.object().shape({
    firstName: yup.string()
        .min(5, "trop petit")
        .max(15, "trop long!")
        .required("Ce champ est obligatoire"),
    lastName: yup.string()
        .min(2, "trop petit")
        .max(15, "trop long!")
        .required("Ce champ est obligatoire"),
    email: yup.string()
        .email("email invalide")
        .required("l'email est obligatoire"),
    
});