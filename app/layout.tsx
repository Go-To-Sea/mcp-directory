import '@/app/globals.css'

export default function RootLayout({
  children,
<<<<<<< HEAD
}: {
  children: React.ReactNode
}) {
=======
}: Readonly<{
  children: React.ReactNode;
}>) {
>>>>>>> 84221426db846cb10a4369a8d33c32e1991528b7
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
