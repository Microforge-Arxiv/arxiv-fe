import { Sidebar } from "@/components/dashboard/sidebar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full"
      >
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="h-full border-r">
            <Sidebar />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <main className="h-full p-6 overflow-y-auto">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
} 