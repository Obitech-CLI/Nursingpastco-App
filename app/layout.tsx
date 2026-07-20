import { ErrorModal, SuccessModal } from "@/ui/modals/Feedback";
import "./globals.css";
import "./admin/manage/manage.css";
import { ErrorModalProvider, SuccessModalProvider } from "@/contexts/modals/FeedbackContext";
import { AppThemeProvider } from "@/contexts/modals/ThemeProvider";

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppThemeProvider>
        <SuccessModalProvider>
          <ErrorModalProvider>

            {children}

            <SuccessModal />
            <ErrorModal />
            
          </ErrorModalProvider>
        </SuccessModalProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
