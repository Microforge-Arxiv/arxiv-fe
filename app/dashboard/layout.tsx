import { Sidebar } from "@/components/dashboard/sidebar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen"
    >
      <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <main className="h-full p-6">
          {children}
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
} 