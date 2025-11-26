import Dashboard from "@/components/landing/dashboard";
import Footer from "@/components/landing/footer";


export default function DashboardPage() {
  return (
    <div className="bg-muted/40">
      <div className="flex flex-col gap-8">
        <Dashboard />
        <Footer />
      </div>
    </div>
  );
}
