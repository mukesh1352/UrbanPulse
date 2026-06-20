import "./globals.css";
import Sidebar from "@/components/sidebar/sidebar";
import QueryProvider from "@/providers/query-provider";
import LiveSocketProvider from "@/components/live/live-socket-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950">

        <QueryProvider>

          <LiveSocketProvider />

          <div className="flex">

            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">
              {children}
            </main>

          </div>

        </QueryProvider>

      </body>
    </html>
  );
}