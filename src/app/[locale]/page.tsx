import { setRequestLocale } from "next-intl/server";
import HomeContentClient from "@/components/HomeContentClient/HomeContentClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContentClient />;
}
