import { Footer } from "@/components/nav/footer";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
