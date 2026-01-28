'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Brain, CheckCircle2, Code2, GraduationCap, Lightbulb, Link2, ListTodo, Menu, Moon, Search, Sparkles, Sun, Zap, BookMarkedIcon as BookmarkedIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Hook for scroll animations
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref) {
      observer.observe(ref)
    }

    return () => {
      if (ref) observer.unobserve(ref)
    }
  }, [ref])

  return { ref: setRef, isVisible }
}

// Theme Toggle Component
function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement
    if (root.classList.contains('dark')) {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="transition-all duration-300 ease-out relative h-10 w-10"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 block dark:hidden" strokeWidth={2} />
      <Moon className="h-5 w-5 hidden dark:block" strokeWidth={2} />
    </Button>
  )
}

// Header Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300 ease-out">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 transition-all duration-300 ease-out hover:scale-105">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent via-accent to-accent-alt shadow-md transition-all duration-300 ease-out hover:shadow-lg">
              <Brain className="h-6 w-6 text-accent-foreground transition-all duration-300 ease-out hover:scale-110" />
            </div>
            <span className="text-xl font-semibold text-foreground">Second Brain</span>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {['Features', 'Benefits', 'Use Cases', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm text-muted-foreground transition-all duration-300 ease-out hover:text-accent hover:font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="transition-all duration-300 ease-out hover:bg-secondary"
              onClick={() => router.push('/login')}
            >
              Sign In
            </Button>
            <Button 
            className="bg-gradient-to-r from-accent to-accent-alt text-accent-foreground transition-all duration-300 ease-out hover:shadow-lg hover:shadow-accent/30"
            onClick={() => router.push("/dashboard")}
            >

              Get Started Free
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden transition-all duration-300 ease-out hover:bg-secondary p-2 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

// Hero Section
function Hero() {
  const isVisible = true
  const router = useRouter()

  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-20 sm:py-32">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-accent to-accent-alt/20 blur-3xl opacity-40 animate-gradient-shift" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-gradient-to-tr from-accent-alt/30 to-accent/10 blur-3xl animate-float" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div
            className={`mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 transition-all duration-300 ease-out ${
              isVisible ? 'animate-scale-in' : 'opacity-0'
            }`}
          >
            <Sparkles className="h-4 w-4 text-accent animate-float" />
            <span className="text-sm font-medium text-accent">Intelligent Knowledge Management</span>
          </div>

          {/* Headline */}
          <h1
            className={`text-pretty mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl transition-all duration-300 ease-out ${
              isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
            }`}
            style={{ animationDelay: isVisible ? '0.1s' : undefined }}
          >
            Your Digital Memory Hub
          </h1>

          {/* Subheading */}
          <p
            className={`text-pretty mb-8 text-lg text-muted-foreground sm:text-xl transition-all duration-300 ease-out ${
              isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
            }`}
            style={{ animationDelay: isVisible ? '0.2s' : undefined }}
          >
            Capture what you&apos;re learning, building, and doing. Organize with links, todos, and insights. Your second brain,
            always with you.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-300 ease-out ${
              isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
            }`}
            style={{ animationDelay: isVisible ? '0.3s' : undefined }}
          >
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-accent to-accent-alt text-accent-foreground transition-all duration-300 ease-out hover:shadow-lg hover:shadow-accent/30 hover:scale-105 active:scale-95"
            onClick={() => router.push("/dashboard")}
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground transition-all duration-300 ease-out hover:bg-secondary hover:shadow-md bg-transparent active:scale-95"
            >
              Watch Demo
            </Button>
          </div>

          {/* Subtext */}
          <p
            className={`mt-8 text-sm text-muted-foreground transition-all duration-300 ease-out ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: isVisible ? '0.4s' : undefined }}
          >
            No credit card required • 7-day free trial • Full access to all features
          </p>
        </div>

        {/* Product Image */}
        <div
          className={`mt-16 rounded-2xl border border-border/50 bg-gradient-to-b from-card/50 to-secondary/50 p-1 transition-all duration-300 ease-out hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}
          style={{ animationDelay: isVisible ? '0.5s' : undefined }}
        >
          <div className="rounded-xl bg-gradient-to-br from-card to-secondary/50 p-8 sm:p-12">
            <div className="space-y-4">
              <div className="h-48 rounded-lg bg-gradient-to-br from-muted/50 to-muted/20 animate-shimmer" />
              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-24 rounded-lg bg-gradient-to-br from-muted/40 to-muted/10 transition-all duration-300 ease-out hover:from-muted/60 hover:to-muted/30"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Section
function Features() {
  const { ref, isVisible } = useScrollAnimation()

  const features = [
    {
      icon: Link2,
      title: 'Smart Link Saving',
      description: 'Instantly save and organize articles, docs, and resources. Auto-extract titles, summaries, and metadata.',
    },
    {
      icon: ListTodo,
      title: 'Integrated Todos',
      description: 'Build mini-tasks alongside your learning. Connect todos to the links and resources you save.',
    },
    {
      icon: Search,
      title: 'Powerful Search',
      description: 'Find anything instantly with semantic search. Search by concept, not just keywords.',
    },
    {
      icon: Zap,
      title: 'Real-Time Sync',
      description: 'Everything syncs instantly across your devices. Always up-to-date, everywhere you work.',
    },
    {
      icon: BookmarkedIcon,
      title: 'Smart Collections',
      description: 'Auto-organize your content with AI-powered collections. Learn faster with connected insights.',
    },
    {
      icon: CheckCircle2,
      title: 'Progress Tracking',
      description: 'See what you\'ve learned and built. Track your growth with detailed analytics and insights.',
    },
  ]

  return (
    <section id="features" className="border-b border-border bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={ref}
          className={`mx-auto mb-16 max-w-3xl text-center transition-all duration-300 ease-out ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-pretty mb-4 text-4xl font-bold text-foreground sm:text-5xl">
            Everything You Need to Learn Better
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed for knowledge workers who want to capture and retain what matters.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`group rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8 transition-all duration-300 ease-out hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 hover:scale-105 active:scale-100 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: isVisible ? `${index * 0.1}s` : undefined }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-alt/10 group-hover:from-accent/30 group-hover:to-accent-alt/20 transition-all duration-300 ease-out">
                  <Icon className="h-6 w-6 text-accent group-hover:scale-110 transition-all duration-300 ease-out" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Benefits Section
function Benefits() {
  const { ref, isVisible } = useScrollAnimation()

  const benefits = [
    {
      metric: '3x faster',
      description: 'Find information compared to traditional note-taking',
    },
    {
      metric: '82% better',
      description: 'Information retention with organized learning paths',
    },
    {
      metric: '15 hours/week',
      description: 'Time saved on research and organization',
    },
    {
      metric: '100% private',
      description: 'Your knowledge stays yours. Enterprise-grade encryption.',
    },
  ]

  return (
    <section id="benefits" className="border-b border-border bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={`mb-16 grid gap-8 md:grid-cols-2 transition-all duration-300 ease-out ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <h2 className="text-pretty mb-4 text-4xl font-bold text-foreground">
              Real Results for Real Teams
            </h2>
            <p className="text-lg text-muted-foreground">
              Companies that use Second Brain report massive improvements in learning velocity and knowledge retention.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              From individual developers to large enterprises, teams trust Second Brain to be their knowledge infrastructure.
            </p>
            <p className="text-sm text-muted-foreground">
              Used by product teams, engineers, researchers, and knowledge workers across industries.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Card
              key={benefit.metric}
              className={`border-border bg-gradient-to-br from-card to-card/50 p-8 transition-all duration-300 ease-out hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 hover:scale-105 cursor-pointer active:scale-100 ${
                isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: isVisible ? `${index * 0.1}s` : undefined }}
            >
              <div className="mb-2 text-3xl font-bold bg-gradient-to-r from-accent to-accent-alt bg-clip-text text-transparent">
                {benefit.metric}
              </div>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Use Cases Section
function UseCases() {
  const { ref, isVisible } = useScrollAnimation()

  const useCases = [
    {
      icon: Code2,
      title: 'Engineering Teams',
      description: 'Save documentation, tutorials, and best practices. Build faster by having knowledge at your fingertips.',
      features: ['Docs & tutorials', 'Code snippets', 'Learning paths'],
    },
    {
      icon: Lightbulb,
      title: 'Product Managers',
      description: 'Capture market insights, competitor research, and user feedback. Stay informed every day.',
      features: ['Market research', 'User feedback', 'Competitive analysis'],
    },
    {
      icon: GraduationCap,
      title: 'Students & Researchers',
      description: 'Organize academic sources, papers, and course materials. Never lose important information.',
      features: ['Papers & articles', 'Course materials', 'Research notes'],
    },
    {
      icon: Zap,
      title: 'Content Creators',
      description: 'Collect inspiration, ideas, and references. Build content faster with organized research.',
      features: ['Inspiration board', 'References', 'Idea collection'],
    },
  ]

  return (
    <section id="use-cases" className="border-b border-border bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={ref}
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-300 ease-out ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-pretty mb-4 text-4xl font-bold text-foreground sm:text-5xl">
            Built for Every Role
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you&apos;re building products, learning new skills, or creating content, Second Brain adapts to your workflow.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <Card
                key={useCase.title}
                className={`border-border bg-gradient-to-br from-card to-card/50 p-8 transition-all duration-300 ease-out hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 hover:scale-105 cursor-pointer group active:scale-100 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: isVisible ? `${index * 0.1}s` : undefined }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-alt/10 group-hover:from-accent/30 group-hover:to-accent-alt/20 transition-all duration-300 ease-out">
                  <Icon className="h-6 w-6 text-accent group-hover:scale-110 transition-all duration-300 ease-out" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{useCase.title}</h3>
                <p className="mb-6 text-muted-foreground">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 ease-out group-hover:text-accent">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent transition-all duration-300 ease-out" />
                      {feature}
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTA() {
  const { ref, isVisible } = useScrollAnimation()

  const ctaFeatures = ['30-day money back guarantee', 'Cancel anytime', 'No setup fees', 'Lifetime early adopter pricing']

  return (
    <section className="relative border-b border-border bg-background py-20 sm:py-32">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-accent/20 to-accent-alt/10 blur-3xl opacity-40 animate-gradient-shift" />
        <div className="absolute -bottom-32 right-1/3 h-96 w-96 rounded-full bg-gradient-to-tr from-accent-alt/15 to-accent/5 blur-3xl animate-float" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent-alt/5 p-8 text-center sm:p-12 transition-all duration-300 ease-out hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-pretty mb-4 text-4xl font-bold text-foreground sm:text-5xl">
            Ready to Build Your Second Brain?
          </h2>
          <p className="text-pretty mb-8 text-lg text-muted-foreground">
            Join thousands of knowledge workers who are learning smarter, not harder. Start your free trial today.
          </p>

          {/* CTA Button */}
          <div className="mb-8">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-accent to-accent-alt text-accent-foreground transition-all duration-300 ease-out hover:shadow-lg hover:shadow-accent/40 hover:scale-105 active:scale-95"
            >
              Start Your Free Trial
              <ArrowRight className="h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Features List */}
          <div className="mx-auto max-w-2xl space-y-3">
            {ctaFeatures.map((feature, index) => (
              <div
                key={feature}
                className={`flex items-center justify-center gap-3 transition-all duration-300 ease-out ${
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{ animationDelay: isVisible ? `${0.1 + index * 0.05}s` : undefined }}
              >
                <CheckCircle2 className="h-5 w-5 text-accent group-hover:scale-110 transition-all duration-300 ease-out" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  const { ref, isVisible } = useScrollAnimation()

  const footerLinks = {
    Product: ['Features', 'Pricing', 'Security', 'Integrations'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Resources: ['Docs', 'API', 'Community', 'Status'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'License'],
  }

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div
          ref={ref}
          className={`grid gap-8 md:grid-cols-2 lg:grid-cols-5 transition-all duration-300 ease-out ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 transition-all duration-300 ease-out hover:scale-105">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-alt shadow-md transition-all duration-300 ease-out hover:shadow-lg">
                <Brain className="h-6 w-6 text-accent-foreground transition-all duration-300 ease-out hover:scale-110" />
              </div>
              <span className="text-lg font-semibold text-foreground">Second Brain</span>
            </div>
            <p className="text-sm text-muted-foreground">Your digital memory hub for learning and building.</p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 font-semibold text-foreground">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-all duration-300 ease-out hover:text-accent font-medium relative group"
                    >
                      {link}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-alt group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border/50" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 Second Brain. All rights reserved.</p>
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-muted-foreground transition-all duration-300 ease-out hover:text-accent font-medium relative group"
              >
                {social}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-alt group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen bg-background font-saas text-sm">
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <UseCases />
      <CTA />
      <Footer />
    </main>
  )
}
