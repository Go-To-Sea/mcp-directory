import { HiOutlineMail } from "react-icons/hi";

export default function About() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center mb-8">
        <div className="text-sm text-gray-500">
          <a href="/" className="hover:text-primary">Home</a>
          <span className="mx-2">›</span>
          <span>About</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 rounded-2xl"></div>
        
        <div className="relative">
          {/* Main Title and Contact */}
          <h1 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            About MCP.ad
          </h1>
          <h2 className="text-sm text-gray-600 dark:text-gray-400 mb-8 flex items-center gap-1">
            Have any questions? Feel free to reach out at{' '}
            <a href="mailto:support@mcp.ad" className="text-primary font-medium inline-flex items-center gap-1 transition-transform hover:scale-105">
              <HiOutlineMail className="w-4 h-4" />
              support@mcp.ad
            </a>
          </h2>

          {/* Welcome Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Welcome to MCP.ad</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At MCP.ad, we're dedicated to building the most comprehensive platform for Model Context Protocol (MCP) resources. Our mission is to connect developers, AI enthusiasts, and businesses with the tools they need to leverage the power of AI through MCP integration.
            </p>
          </section>

          {/* Vision Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We envision a future where AI integration is seamless and accessible to everyone. Through MCP.ad, we aim to create a vibrant ecosystem where developers can share their MCP servers and clients, making AI capabilities more accessible and powerful for all users.
            </p>
          </section>

          {/* What We Do Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">What We Do</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              MCP.ad serves as a central hub for the Model Context Protocol community. We provide:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-300">
              <li>A curated directory of MCP servers and clients</li>
              <li>Resources for implementing MCP in your projects</li>
              <li>Community-driven documentation and guides</li>
              <li>Platform for sharing and discovering new MCP integrations</li>
            </ul>
          </section>

          {/* For Everyone Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">For Everyone</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Whether you're a developer looking to share your MCP server, a business seeking to integrate AI capabilities, or an enthusiast exploring the possibilities of AI integration, MCP.ad is your go-to resource. We welcome contributions from all members of the community.
            </p>
          </section>

          {/* Journey Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Our Journey</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Founded by a team passionate about AI integration and open-source development, MCP.ad started as a project to organize and share MCP resources. Today, we've grown into a thriving platform that serves developers and organizations worldwide, facilitating the adoption of Model Context Protocol technology.
            </p>
          </section>

          {/* Contact Section - 调整样式以适应新的背景 */}
          <section className="bg-primary/5 dark:bg-primary/10 p-6 rounded-xl text-center backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Have questions or suggestions? We'd love to hear from you. Reach out to us anytime at:
            </p>
            <a 
              href="mailto:support@mcp.ad" 
              className="text-primary text-lg font-medium inline-flex items-center gap-1 transition-transform hover:scale-105"
            >
              <HiOutlineMail className="w-4 h-4" />
              support@mcp.ad
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}