import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, ArrowRight, CheckCircle2, Users, BarChart3 } from 'lucide-react';

const Index: React.FC = () => {
  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Easy Complaint Registration',
      description: 'Submit civic complaints quickly with our streamlined form process.',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Smart Prioritization',
      description: 'AI-powered system to prioritize complaints based on urgency and impact.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Transparent Tracking',
      description: 'Track your complaint status in real-time from submission to resolution.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/30" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Serving citizens since 2024
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              CityPulse
            </h1>
            
            <p className="text-xl md:text-2xl text-primary font-medium mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Smartly prioritize and resolve civic complaints
            </p>
            
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              CityPulse empowers citizens to report civic issues efficiently while enabling authorities 
              to manage and resolve complaints with smart prioritization. Together, we build better cities.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all btn-hover shadow-lg shadow-primary/25"
              >
                Register Complaint
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-card border border-border text-foreground font-semibold hover:bg-secondary transition-all btn-hover"
              >
                <Shield className="w-5 h-5" />
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/50 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How CityPulse Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform bridges the gap between citizens and local authorities, 
              making civic engagement seamless and effective.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-background border border-border card-hover animate-fade-in"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent text-accent-foreground flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '10K+', label: 'Complaints Resolved' },
              { value: '50+', label: 'City Zones' },
              { value: '98%', label: 'Resolution Rate' },
              { value: '24h', label: 'Avg. Response Time' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Make Your Voice Heard?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of citizens who are actively improving their communities through CityPulse.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all btn-hover shadow-lg shadow-primary/25"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 CityPulse. Building better cities, one complaint at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
