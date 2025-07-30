"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  Shield,
  Zap,
  Trophy,
  Search,
  Filter,
  ShoppingCart,
  Eye,
  Crown,
  Target,
  Gamepad2,
  Users,
  Award,
  TrendingUp,
} from "lucide-react"

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const featuredAccounts = [
    {
      id: 1,
      title: "Conqueror Account - Season 24",
      level: 85,
      tier: "Conqueror",
      kd: 4.2,
      price: 299,
      image: "/placeholder.svg?height=200&width=300",
      badges: ["Verified", "Premium"],
      stats: { matches: 1250, wins: 320, survival: "15.2 min" },
    },
    {
      id: 2,
      title: "Ace Master - Rare Skins",
      level: 72,
      tier: "Ace Master",
      kd: 3.8,
      price: 199,
      image: "/placeholder.svg?height=200&width=300",
      badges: ["Hot Deal", "Rare Skins"],
      stats: { matches: 980, wins: 245, survival: "12.8 min" },
    },
    {
      id: 3,
      title: "Crown V - Full Collection",
      level: 68,
      tier: "Crown V",
      kd: 3.2,
      price: 149,
      image: "/placeholder.svg?height=200&width=300",
      badges: ["Best Value", "Complete"],
      stats: { matches: 750, wins: 180, survival: "11.5 min" },
    },
  ]

  const allAccounts = [
    ...featuredAccounts,
    {
      id: 4,
      title: "Diamond III - Starter Pack",
      level: 45,
      tier: "Diamond III",
      kd: 2.8,
      price: 89,
      image: "/placeholder.svg?height=200&width=300",
      badges: ["Beginner Friendly"],
      stats: { matches: 420, wins: 95, survival: "9.2 min" },
    },
    {
      id: 5,
      title: "Platinum I - Good Stats",
      level: 38,
      tier: "Platinum I",
      kd: 2.4,
      price: 59,
      image: "/placeholder.svg?height=200&width=300",
      badges: ["Quick Sale"],
      stats: { matches: 320, wins: 68, survival: "8.1 min" },
    },
    {
      id: 6,
      title: "Ace - Mythic Outfits",
      level: 78,
      tier: "Ace",
      kd: 3.9,
      price: 249,
      image: "/placeholder.svg?height=200&width=300",
      badges: ["Mythic Items", "Limited"],
      stats: { matches: 1100, wins: 285, survival: "14.1 min" },
    },
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Conqueror":
        return "from-yellow-400 to-orange-500"
      case "Ace Master":
        return "from-purple-400 to-pink-500"
      case "Ace":
        return "from-purple-500 to-blue-500"
      case "Crown V":
        return "from-blue-400 to-cyan-500"
      case "Diamond III":
        return "from-cyan-400 to-blue-400"
      case "Platinum I":
        return "from-gray-400 to-gray-500"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Verified":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Premium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Hot Deal":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "Best Value":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Rare Skins":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Mythic Items":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  MAKI ACCOUNTS
                </h1>
                <p className="text-xs text-gray-400">Premium PUBG Accounts</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                Accounts
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                Sell
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                Support
              </a>
            </nav>
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart (0)
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent">
                Elite PUBG
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Accounts
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Premium verified accounts with rare skins, high ranks, and exceptional stats.
              <br />
              Trusted by thousands of players worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-lg px-8"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Browse Accounts
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 bg-transparent"
              >
                <Target className="w-5 h-5 mr-2" />
                Sell Your Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">15K+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-400">Secure Trades</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400">Premium Accounts</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Accounts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Featured Accounts</h3>
            <p className="text-gray-400 text-lg">Hand-picked premium accounts with exceptional value</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredAccounts.map((account) => (
              <Card
                key={account.id}
                className="bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-all duration-300 group overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={account.image || "/placeholder.svg"}
                    alt={account.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getTierColor(account.tier)} text-white`}
                  >
                    {account.tier}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full p-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {account.badges.map((badge) => (
                      <Badge key={badge} className={`${getBadgeVariant(badge)} border`}>
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-white text-lg">{account.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    Level {account.level} • K/D {account.kd}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="text-center">
                      <div className="text-white font-semibold">{account.stats.matches}</div>
                      <div className="text-gray-400">Matches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-semibold">{account.stats.wins}</div>
                      <div className="text-gray-400">Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-semibold">{account.stats.survival}</div>
                      <div className="text-gray-400">Avg Survival</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-white">${account.price}</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Accounts Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4 md:mb-0">All Accounts</h3>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search accounts..."
                  className="pl-10 bg-gray-800 border-gray-700 text-white w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="conqueror">Conqueror</SelectItem>
                  <SelectItem value="ace">Ace</SelectItem>
                  <SelectItem value="crown">Crown</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAccounts.map((account) => (
              <Card
                key={account.id}
                className="bg-gray-900/30 border-gray-800 hover:border-red-500/30 transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={account.image || "/placeholder.svg"}
                    alt={account.title}
                    className="w-full h-40 object-cover"
                  />
                  <div
                    className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold bg-gradient-to-r ${getTierColor(account.tier)} text-white`}
                  >
                    {account.tier}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {account.badges.map((badge) => (
                      <Badge key={badge} className={`${getBadgeVariant(badge)} border text-xs`}>
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-white text-base">{account.title}</CardTitle>
                  <CardDescription className="text-gray-400 text-sm">
                    Level {account.level} • K/D {account.kd}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-white">${account.price}</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                      >
                        Buy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  MAKI ACCOUNTS
                </h4>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted marketplace for premium PUBG accounts. Safe, secure, and reliable.
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Browse Accounts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Sell Account
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Live Chat
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Security</h5>
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-400">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">Instant Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-400">Verified Accounts</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 MAKI ACCOUNTS. All rights reserved. PUBG is a trademark of KRAFTON, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
