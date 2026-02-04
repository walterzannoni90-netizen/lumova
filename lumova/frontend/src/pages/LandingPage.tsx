import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Code2,
  Rocket,
  Shield,
  Database,
  CreditCard,
  Check,
  ArrowRight,
  Star,
  Github,
  Twitter,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate complete React + Node.js projects in seconds, not hours.',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Production-ready code following modern best practices and patterns.',
  },
  {
    icon: Shield,
    title: 'Auth Ready',
    description: 'Built-in authentication with JWT, bcrypt, and secure session handling.',
  },
  {
    icon: Database,
    title: 'Database Integration',
    description: 'Pre-configured MongoDB/Mongoose models and connection handling.',
  },
  {
    icon: CreditCard,
    title: 'Payment Ready',
    description: 'Stripe integration prepared for subscription and one-time payments.',
  },
  {
    icon: Rocket,
    title: 'Deploy Anywhere',
    description: 'Deploy to Vercel, Netlify, Render, or any cloud platform.',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for trying out LUMOVA',
    features: [
      '3 projects per month',
      'Basic templates',
      'Community support',
      'Standard generation speed',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For serious developers and teams',
    features: [
      'Unlimited projects',
      'All templates & features',
      'Priority support',
      'Fast generation speed',
      'Custom integrations',
      'API access',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Dedicated support',
      'Custom AI training',
      'On-premise deployment',
      'SLA guarantee',
      'Team management',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Full Stack Developer',
    content: 'LUMOVA cut our project setup time from days to minutes. The generated code is clean and production-ready.',
    avatar: 'SC',
  },
  {
    name: 'Marcus Johnson',
    role: 'Startup Founder',
    content: 'We built our MVP in record time using LUMOVA. The auth and payment integrations saved us weeks.',
    avatar: 'MJ',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Tech Lead',
    content: 'The code quality is impressive. Our team uses LUMOVA for all new project scaffolding.',
    avatar: 'ER',
  },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">LUMOVA</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-400 hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-slate-400 hover:text-white transition-colors">
                Testimonials
              </a>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="hidden sm:block text-slate-400 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/10 border border-primary-500/30 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-400">AI-Powered Code Generation</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Build <span className="gradient-text">React + Node</span> Apps
            <br />
            <span className="text-white">in Seconds</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Describe your app, and LUMOVA generates a complete, production-ready project with 
            authentication, database, payments, and more.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
            >
              Start Building Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
            >
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { value: '10K+', label: 'Projects Generated' },
              { value: '5K+', label: 'Developers' },
              { value: '99%', label: 'Uptime' },
              { value: '4.9', label: 'Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Ship Faster</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              LUMOVA generates complete applications with all the features you need to launch quickly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="feature-card card group"
              >
                <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              How <span className="gradient-text">LUMOVA</span> Works
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From idea to deployed app in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Describe Your App',
                description: 'Tell LUMOVA what you want to build. Be as detailed or as brief as you like.',
              },
              {
                step: '02',
                title: 'AI Generates Code',
                description: 'Our AI creates a complete React + Node.js project with your chosen features.',
              },
              {
                step: '03',
                title: 'Deploy & Launch',
                description: 'Download your project or deploy directly to Vercel, Netlify, or Render.',
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-bold text-slate-800 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                    <ArrowRight className="w-8 h-8 text-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Start free, upgrade when you need more power.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`
                  card relative
                  ${plan.popular ? 'border-primary-500/50 ring-2 ring-primary-500/20' : ''}
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-slate-400">{plan.period}</span>}
                  </div>
                  <p className="text-slate-400 text-sm mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate(plan.name === 'Enterprise' ? '/register' : '/register')}
                  className={`
                    w-full py-3 px-4 rounded-lg font-medium transition-all duration-200
                    ${plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-dark-700 text-white hover:bg-dark-600 border border-slate-600'}
                  `}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-32 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Loved by <span className="gradient-text">Developers</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              See what our community has to say about LUMOVA.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="card">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card bg-gradient-to-br from-primary-600/10 to-purple-600/10 border-primary-500/30">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
              Join thousands of developers shipping faster with LUMOVA. Start for free today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/register')}
                className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">LUMOVA</span>
            </div>
            
            <div className="flex items-center gap-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} LUMOVA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
