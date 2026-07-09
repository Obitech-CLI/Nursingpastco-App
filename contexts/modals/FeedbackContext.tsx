import { childrenNode, ErrorModalType, SuccessModalType } from "@/types/contexts"
import { createContext, useContext, useState } from "react"

const SuccessModalContext = createContext<SuccessModalType | null>(null)

function SuccessModalProvider({children}:childrenNode) {

    const [successMessage, setSuccessMessage] = useState<string>("")
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

    return (
        <SuccessModalContext.Provider value={{
            successMessage, setSuccessMessage, showSuccessModal, setShowSuccessModal
        }}>
            {children}
        </SuccessModalContext.Provider>
    )
}

const ErrorModalContext = createContext<ErrorModalType | null>(null)

function ErrorModalProvider({children}:childrenNode) {

    const [errorMessage, setErrorMessage] = useState<string>("")
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false)

    return (
        <ErrorModalContext.Provider value={{
            errorMessage, setErrorMessage, showErrorModal, setShowErrorModal
        }}>
            {children}
        </ErrorModalContext.Provider>
    )
}

export { 
    SuccessModalProvider, 
    ErrorModalProvider
}

export const useSuccessModal = () => {
    
    const context = useContext(SuccessModalContext)
    if (!context) { 
        throw new Error("no context available") 
    }

    return context;

}

export const useErrorModal = () => {
    
    const context = useContext(ErrorModalContext)
    if (!context) {
        throw new Error("no context available")
    };

    return context;
}