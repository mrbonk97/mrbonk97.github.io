import { Metadata } from "next";

export const metadata: Metadata = {
  title: "악성메일 모의훈련 | 포트폴리오",
};

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return children;
}

export default Layout;
