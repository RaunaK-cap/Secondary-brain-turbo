'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Brain,
  Plus,
  Moon,
  Sun,
  Trash2,
  ExternalLink,
  X,
  Tag,
  FileText,
} from 'lucide-react'
import { redirect } from "next/navigation"

interface Link {
  id: string
  url: string
  title: string
  notes: string
  category: string
  createdAt: string
}

interface Category {
  id: string
  name: string
  color: string
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'YouTube Links', color: 'from-red-500 to-red-600' },
  { id: '2', name: 'Article/Blog', color: 'from-blue-500 to-blue-600' },
  { id: '3', name: 'Twitter/X', color: 'from-sky-500 to-sky-600' },
  { id: '4', name: 'Documentation', color: 'from-purple-500 to-purple-600' },
  { id: '5', name: 'GitHub', color: 'from-gray-700 to-gray-800' },
  { id: '6', name: 'Other', color: 'from-emerald-500 to-emerald-600' },
]

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    if (root.classList.contains('dark')) {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="transition-all duration-300 ease-out relative h-10 w-10"
      aria-label="Toggle theme"
    >
      <div className="relative h-5 w-5">
        <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      </div>
    </Button>
  )
}

function AddLinkModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (link: Omit<Link, 'id' | 'createdAt'>) => void }) {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    notes: '',
    category: '1',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.url && formData.title) {
      onAdd({
        ...formData,
      })
      setFormData({ url: '', title: '', notes: '', category: '1' })
      onClose()
    }
  }

  console.log(formData) //all data 

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-md border-border bg-card p-6 animate-scale-in">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Add New Link</h2>
          <button onClick={onClose} className="transition-all duration-300 hover:scale-110">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Link URL *</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="What is this about?"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {DEFAULT_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add your notes about this link..."
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button 
            type="submit" className="flex-1 bg-gradient-to-r from-accent to-accent-alt text-accent-foreground hover:shadow-lg hover:shadow-accent/30">
              Add Link
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

function LinkCard({ link, onDelete }: { link: Link; onDelete: (id: string) => void }) {
  const category = DEFAULT_CATEGORIES.find((c) => c.id === link.category)

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return 'link'
    }
  }

  return (
    <Card className="group overflow-hidden border-border bg-gradient-to-br from-card to-card/50 p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 hover:scale-105 active:scale-100">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className={`mb-2 inline-block bg-gradient-to-r ${category?.color} rounded-full px-3 py-1`}>
            <span className="text-xs font-medium text-white">{category?.name}</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">{link.title}</h3>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm text-accent transition-all duration-300 hover:text-accent-alt"
          >
            {getDomain(link.url)}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <button
          onClick={() => onDelete(link.id)}
          className="transition-all duration-300 hover:scale-110 hover:text-destructive text-muted-foreground"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      {/* Notes */}
      {link.notes && (
        <div className="mb-4 flex gap-3">
          <FileText className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
          <p className="text-sm text-muted-foreground line-clamp-3">{link.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{new Date(link.createdAt).toLocaleDateString()}</span>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:text-accent"
        >
          Open →
        </a>
      </div>
    </Card>
  )
}

function Sidebar({ categories, selectedCategory, onSelectCategory }: { categories: Category[]; selectedCategory: string | null; onSelectCategory: (id: string | null) => void }) {
  return (
    <aside className="h-screen w-64 border-r border-border bg-card/50 p-6 overflow-y-auto hidden lg:block">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 transition-all duration-300 hover:scale-105">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-alt">
          <Brain className="h-6 w-6 text-accent-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground" 
        onClick={()=> redirect("/")}
        >Second Brain</span>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-4">Categories</p>
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
            selectedCategory === null
              ? 'bg-accent text-accent-foreground'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          All Links
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === category.id
                ? 'bg-accent text-accent-foreground'
                : 'text-foreground hover:bg-secondary'
            }`}
          >
            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${category.color}`} />
            {category.name}
          </button>
        ))}
      </div>
    </aside>
  )
}

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('secondBrainLinks')
    if (saved) {
      try {
        setLinks(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load links:', e)
      }
    }
  }, [])

  // Save to localStorage whenever links change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('secondBrainLinks', JSON.stringify(links))
    }
  }, [links, mounted])

  const handleAddLink = (newLink: Omit<Link, 'id' | 'createdAt'>) => {
    const link: Link = {
      ...newLink,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setLinks([link, ...links])
  }

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  const filteredLinks = selectedCategory ? links.filter((link) => link.category === selectedCategory) : links

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar categories={DEFAULT_CATEGORIES} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40">
          <div className="h-20 px-6 sm:px-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {selectedCategory
                  ? DEFAULT_CATEGORIES.find((c) => c.id === selectedCategory)?.name
                  : 'All Links'}
              </h1>
              <p className="text-sm text-muted-foreground">{filteredLinks.length} links saved</p>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button
                onClick={() => setIsModalOpen(true)}
                className="gap-2 bg-gradient-to-r from-accent to-accent-alt text-accent-foreground hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Plus className="h-5 w-5" />
                <span className="hidden sm:inline">Add Link</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 sm:p-8">
            {filteredLinks.length === 0 ? (
              <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                  <Brain className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No links yet</h3>
                  <p className="text-muted-foreground mb-6">Start adding links to build your second brain</p>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="gap-2 bg-gradient-to-r from-accent to-accent-alt text-accent-foreground"
                  >
                    <Plus className="h-4 w-4" />
                    Add Your First Link
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLinks.map((link, index) => (
                  <div
                    key={link.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <LinkCard link={link} onDelete={handleDeleteLink} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Link Modal */}
      <AddLinkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddLink} />
    </div>
  )
}
