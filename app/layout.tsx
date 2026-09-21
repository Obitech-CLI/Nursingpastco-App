import { ConfirmModal, ErrorModal, SuccessModal } from "@/ui/modals/Feedback";
import "./globals.css";
import "./admin/manage/manage.css";
import "./(public)/info.css";
import {
  ConfirmModalProvider,
  ErrorModalProvider,
  SuccessModalProvider,
} from "@/contexts/modals/FeedbackContext";
import { AppThemeProvider } from "@/contexts/ThemeProvider";
import { Toaster } from "sonner";
import { MenuProvider } from "@/contexts/modals/MenuContext";
import { MenuModal } from "@/ui/modals/Menu";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ManageNavProvider } from "@/contexts/admin/ManageNavProvider";
import {
  Poppins,
  Playfair,
  Merriweather,
  Montserrat,
  Raleway,
} from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${playfair.variable} 
        ${merriweather.variable} ${raleway.variable} ${montserrat.variable}`}
      >
        <AppThemeProvider>
          <SuccessModalProvider>
            <ErrorModalProvider>
              <ConfirmModalProvider>
                <MenuProvider>
                  <ManageNavProvider>
                    <Header />
                    {children}
                    <Footer />

                    <SuccessModal />
                    <ErrorModal />
                    <ConfirmModal />
                    <MenuModal />
                    <Toaster position="top-center" />
                  </ManageNavProvider>
                </MenuProvider>
              </ConfirmModalProvider>
            </ErrorModalProvider>
          </SuccessModalProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
