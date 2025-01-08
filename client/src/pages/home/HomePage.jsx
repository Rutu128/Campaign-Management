import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <AuroraBackground>
      <div className="text-center p-8 text-black dark:text-white max-w-5xl mx-auto">
        {/* Welcome Section */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Campaign Manager Pro
          </h1>
          <p className="text-lg font-medium">
            Welcome, {user?.firstName || "Guest"}! Manage campaigns and invoices
            effortlessly with our secure and intuitive tools.
          </p>
        </header>

        {/* Features Section */}
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {/* Feature: Campaign Management */}
          <FeatureCard
            title="Campaign Management"
            description="Plan, execute, and track campaigns seamlessly with powerful tools."
            link="/campaigns"
            buttonText="Manage Campaigns"
          />

          {/* Feature: Invoice Generation */}
          <FeatureCard
            title="Invoice Generation"
            description="Generate and manage invoices with ease using advanced features."
            link="/invoices"
            buttonText="Generate Invoice"
          />
        </section>
      </div>
    </AuroraBackground>
  );
};

const FeatureCard = ({ title, description, link, buttonText }) => {
  return (
    <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      <Link
        to={link}
        className="inline-block px-5 py-2 text-sm font-medium text-black dark:text-white border border-gray-700 dark:border-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default HomePage;
