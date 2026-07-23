import { ErrorModal, SuccessModal } from "@/ui/modals/Feedback";
import "./globals.css";
import "./admin/manage/manage.css";
import { ErrorModalProvider, SuccessModalProvider } from "@/contexts/modals/FeedbackContext";
import { AppThemeProvider } from "@/contexts/ThemeProvider";
import { AuthFormProvider } from "@/contexts/user/AuthFormProvider";
import LoginUser from "./user/(auth)/login/LoginUser";
import CreateUser from "./user/(auth)/create/CreateUser";

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppThemeProvider>
        <SuccessModalProvider>
          <ErrorModalProvider>
            <AuthFormProvider>

            {children}

            <CreateUser />
            <LoginUser />
            <SuccessModal />
            <ErrorModal />
            
            </AuthFormProvider>
          </ErrorModalProvider>
        </SuccessModalProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
