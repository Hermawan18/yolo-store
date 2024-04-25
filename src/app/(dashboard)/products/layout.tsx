import RequestLogin from '@/app/components/RequiresLogin';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RequestLogin>{children}</RequestLogin>;
}
