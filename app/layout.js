import Wrapper from "@/components/globle/Wrapper";
import "./globals.css";

export const metadata = {
  title: "Jobify App"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
