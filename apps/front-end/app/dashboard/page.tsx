'use client'

import React, { useEffect, useMemo, useState } from "react"
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
  Pencil,
  LogOut,
} from 'lucide-react'
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import axios from "axios"

interface Link {
  id: number
  url: string
  title: string
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
      <Sun className="h-5 w-5 block dark:hidden" />
      <Moon className="h-5 w-5 hidden dark:block" />
    </Button>
  )
}

function UpsertLinkModal({
  onClose,
  initial,
  onSubmit,
  submitting,
}: {
  onClose: () => void
  initial?: Link | null
  onSubmit: (values: { url: string; title: string; category: string }) => void
  submitting: boolean
}) {
  const [formData, setFormData] = useState(() => ({
    url: initial?.url ?? "",
    title: initial?.title ?? "",
    category: initial?.category ?? "1",
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.url && formData.title) {
      onSubmit(formData)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-md border-border bg-card p-6 animate-scale-in">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">{initial ? "Edit Link" : "Add New Link"}</h2>
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

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent" disabled={submitting}>
              Cancel
            </Button>
            <Button 
            type="submit" className="flex-1 bg-linear-to-r from-accent to-accent-alt text-accent-foreground hover:shadow-lg hover:shadow-accent/30" disabled={submitting}>
              {initial ? "Save" : "Add Link"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

function LinkCard({
  link,
  onDelete,
  onEdit,
}: {
  link: Link
  onDelete: (id: number) => void
  onEdit: (link: Link) => void
}) {
  const category = DEFAULT_CATEGORIES.find((c) => c.id === link.category)

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return 'link'
    }
  }

  return (
    <Card className="group overflow-hidden border-border bg-linear-to-br from-card to-card/50 p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 hover:scale-105 active:scale-100">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className={`mb-2 inline-block bg-linear-to-r ${category?.color} rounded-full px-3 py-1`}>
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
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(link)}
            className="transition-all duration-300 hover:scale-110 hover:text-accent text-muted-foreground"
            aria-label="Edit link"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(link.id)}
            className="transition-all duration-300 hover:scale-110 hover:text-destructive text-muted-foreground"
            aria-label="Delete link"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

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
  const router = useRouter()
  return (
    <aside className="h-screen w-64 border-r border-border bg-card/50 p-6 overflow-y-auto hidden lg:block">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 transition-all duration-300 hover:scale-105">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-accent to-accent-alt">
          <Brain className="h-6 w-6 text-accent-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground" 
        onClick={() => router.push("/")}
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
            <div className={`h-2 w-2 rounded-full bg-linear-to-r ${category.color}`} />
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
  const [editingLink, setEditingLink] = useState<Link | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()
  const { token, logout, isReady } = useAuth()

  const filteredLinks = useMemo(
    () => (selectedCategory ? links.filter((link) => link.category === selectedCategory) : links),
    [links, selectedCategory]
  )

  async function loadLinks() {
    setLoading(true)
    try {
      const res = await api.get("/content/v2/getdata")
      const result = (res.data?.result ?? []) as Array<{
        id: number
        Link: string
        title: string
        type: string
        dataandtime: string
      }>

      setLinks(
        result.map((r) => ({
          id: r.id,
          url: r.Link,
          title: r.title,
          category: r.type,
          createdAt: r.dataandtime,
        }))
      )
    } catch (error: unknown) {
      console.error(error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout()
        router.replace("/login")
        return
      }

      if (axios.isAxiosError(error)) {
        const data = error.response?.data as unknown
        const message =
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof (data as { message?: unknown }).message === "string"
            ? (data as { message: string }).message
            : "Failed to load links"
        alert(message)
        return
      }

      alert("Network error or server not reachable")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isReady) return
    if (!token) {
      router.replace("/login")
      return
    }
    loadLinks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, token])

  async function handleUpsert(values: { url: string; title: string; category: string }) {
    setSubmitting(true)
    try {
      if (editingLink) {
        await api.put(`/content/v2/update/${editingLink.id}`, {
          title: values.title,
          link: values.url,
          type: values.category,
        })
      } else {
        await api.post("/content/v2/adddata", {
          title: values.title,
          link: values.url,
          type: values.category,
        })
      }

      setIsModalOpen(false)
      setEditingLink(null)
      await loadLinks()
    } catch (error: unknown) {
      console.error(error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout()
        router.replace("/login")
        return
      }

      if (axios.isAxiosError(error)) {
        const data = error.response?.data as unknown
        const message =
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof (data as { message?: unknown }).message === "string"
            ? (data as { message: string }).message
            : "Request failed"
        alert(message)
        return
      }

      alert("Network error or server not reachable")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeleteLink(id: number) {
    setSubmitting(true)
    try {
      await api.delete(`/content/v2/deletedata/${id}`)
      setLinks((prev) => prev.filter((l) => l.id !== id))
    } catch (error: unknown) {
      console.error(error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout()
        router.replace("/login")
        return
      }

      if (axios.isAxiosError(error)) {
        const data = error.response?.data as unknown
        const message =
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof (data as { message?: unknown }).message === "string"
            ? (data as { message: string }).message
            : "Delete failed"
        alert(message)
        return
      }

      alert("Network error or server not reachable")
    } finally {
      setSubmitting(false)
    }
  }

  function handleEdit(link: Link) {
    setEditingLink(link)
    setIsModalOpen(true)
  }

  function handleAddClick() {
    setEditingLink(null)
    setIsModalOpen(true)
  }

  if (!isReady) return null

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
                variant="outline"
                onClick={() => {
                  logout()
                  router.replace("/login")
                }}
                className="gap-2 bg-transparent"
                disabled={submitting}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
              <Button
                onClick={handleAddClick}
                className="gap-2 bg-linear-to-r from-accent to-accent-alt text-accent-foreground hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:scale-105 active:scale-95"
                disabled={submitting}
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
            {loading ? (
              <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              </div>
            ) : filteredLinks.length === 0 ? (
              <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                  <Brain className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No links yet</h3>
                  <p className="text-muted-foreground mb-6">Start adding links to build your second brain</p>
                  <Button
                    onClick={handleAddClick}
                    className="gap-2 bg-linear-to-r from-accent to-accent-alt text-accent-foreground"
                    disabled={submitting}
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
                    <LinkCard link={link} onDelete={handleDeleteLink} onEdit={handleEdit} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Link Modal */}
      {isModalOpen && (
        <UpsertLinkModal
          onClose={() => {
            if (submitting) return
            setIsModalOpen(false)
            setEditingLink(null)
          }}
          initial={editingLink}
          onSubmit={handleUpsert}
          submitting={submitting}
        />
      )}
    </div>
  )
}
