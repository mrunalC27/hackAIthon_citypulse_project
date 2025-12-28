import React from 'react';
import { Building2, Users, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Our Mission',
      description: 'To bridge the gap between citizens and local authorities, making civic engagement seamless and impactful.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community First',
      description: 'We believe that every citizen\'s voice matters. CityPulse ensures that all complaints are heard and addressed.',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Transparency',
      description: 'Real-time tracking and updates keep citizens informed about the status of their complaints at every step.',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About CityPulse</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            CityPulse is a smart civic complaint management system designed to help cities respond faster and more efficiently to citizen concerns.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {values.map((value, index) => (
            <div 
              key={value.title}
              className="bg-card rounded-2xl border border-border shadow-card p-6 animate-fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent text-accent-foreground flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">How CityPulse Works</h2>
          
          <div className="space-y-6">
            {[
              { step: '1', title: 'Submit a Complaint', description: 'Citizens report civic issues through our easy-to-use form, providing details about the problem.' },
              { step: '2', title: 'Smart Prioritization', description: 'Our system analyzes complaints based on urgency, impact, and available resources.' },
              { step: '3', title: 'Team Assignment', description: 'Relevant teams are automatically notified and assigned to handle the complaint.' },
              { step: '4', title: 'Track & Resolve', description: 'Citizens receive real-time updates as their complaint progresses to resolution.' },
            ].map((item, index) => (
              <div 
                key={item.step} 
                className="flex gap-4 animate-slide-in-right"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center bg-gradient-to-br from-primary/10 to-accent/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <a
            href="mailto:support@citypulse.gov"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors btn-hover"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
