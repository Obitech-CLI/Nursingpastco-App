import { ErrorModal, SuccessModal } from "@/ui/modals/Feedback";
import "./globals.css";
import { ErrorModalProvider, SuccessModalProvider } from "@/contexts/modals/FeedbackContext";

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SuccessModalProvider>
          <ErrorModalProvider>

            {children}

            <SuccessModal />
            <ErrorModal />
            
          </ErrorModalProvider>
        </SuccessModalProvider>
      </body>
    </html>
  );
}
