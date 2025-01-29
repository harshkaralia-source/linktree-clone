import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Linktree Clone",
  description: "Personalise all your links.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-poppins -mt-[90px]`}>
        <Navbar />
        <div className="">
          {children}
        </div>
      </body>
    </html>
  );
}
