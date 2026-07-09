import { type, ReactNode, SetStateAction } from "react"

export type childrenNode = {
    children: ReactNode;
}

export type SuccessModalType = {
    successMessage: string;
    setSuccessMessage: React.Dispatch<SetStateAction<string>>;
    showSuccessModal: boolean;
    setShowSuccessModal: React.Dispatch<SetStateAction<boolean>>;
}

export type ErrorModalType = {
    errorMessage: string;
    setErrorMessage: React.Dispatch<SetStateAction<string>>;
    showErrorModal: boolean;
    setShowErrorModal: React.Dispatch<SetStateAction<boolean>>;
}