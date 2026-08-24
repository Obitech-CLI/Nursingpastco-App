import { ConfirmModal, ErrorModal, SuccessModal } from "@/ui/modals/Feedback";
import "./globals.css";
import "./admin/manage/manage.css";
import { ConfirmModalProvider, ErrorModalProvider, SuccessModalProvider } from "@/contexts/modals/FeedbackContext";
import { AppThemeProvider } from "@/contexts/ThemeProvider";
import { AuthFormProvider } from "@/contexts/user/AuthFormProvider";
import LoginUser from "./user/(auth)/login/LoginUser";
import CreateUser from "./user/(auth)/create/CreateUser";
import { Toaster } from "sonner";
import { MenuProvider } from "@/contexts/modals/MenuContext";
import { MenuModal } from "@/ui/modals/Menu";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ManageNavProvider } from "@/contexts/admin/ManageNavProvider";

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppThemeProvider>
        <SuccessModalProvider>
          <ErrorModalProvider>
            <ConfirmModalProvider>
            <AuthFormProvider>
              <MenuProvider>
                <ManageNavProvider>

            <Header />
            {children}
            <Footer />

            <CreateUser />
            <LoginUser />
            <SuccessModal />
            <ErrorModal />
            <ConfirmModal />
            <MenuModal />
            <Toaster position="top-center"/>
            
               </ManageNavProvider>
             </MenuProvider>
            </AuthFormProvider>
            </ConfirmModalProvider>
          </ErrorModalProvider>
        </SuccessModalProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
