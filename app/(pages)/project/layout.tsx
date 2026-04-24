import { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로젝트 | 포트폴리오",
};

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return children;
}

export default Layout;
