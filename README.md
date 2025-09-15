# LunaFlow - Your Personal Cycle Companion

A Base MiniApp for girls to track their menstrual cycles, correlate symptoms, and engage in anonymous discussions with community support.

## Features

### 🗓️ Predictive Cycle Calendar
- Track period start and end dates
- Predict upcoming cycles and fertile windows
- Visual calendar with cycle phases and symptoms

### 💜 Symptom Correlation Log
- Log daily mood, energy levels, and physical symptoms
- Visualize correlations with cycle phases
- Track patterns over time

### 💬 Anonymous Q&A Forum
- Ask questions and share experiences anonymously
- Supportive community discussions
- Moderated environment for safety

### 📚 Expert-Vetted Content
- Curated articles from health professionals
- Content delivered based on current cycle phase
- Premium content available through micro-transactions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via MiniKit)
- **Wallet**: OnchainKit integration
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## Getting Started

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd lunaflow
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKit and OnchainKit providers
│   ├── globals.css        # Global styles and Tailwind
│   ├── loading.tsx        # Loading UI
│   └── error.tsx          # Error boundary
├── components/            # React components
│   ├── AppShell.tsx       # Main app layout with navigation
│   ├── CalendarView.tsx   # Cycle calendar component
│   ├── CycleInputForm.tsx # Period logging form
│   ├── SymptomLogger.tsx  # Daily symptom tracking
│   ├── ForumFeed.tsx      # Anonymous community forum
│   ├── ContentCard.tsx    # Expert content display
│   └── PrimaryButton.tsx  # Reusable button component
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Helper functions and calculations
└── public/                # Static assets
```

## Key Features Implementation

### Cycle Prediction Algorithm
The app uses a simple but effective prediction algorithm:
- Calculates average cycle length from last 3 cycles
- Predicts next period start date
- Identifies fertile windows (ovulation ± 6 days)

### Anonymous Forum System
- Posts are completely anonymous
- No personal identifiers stored with posts
- Community moderation features

### Micro-transaction Support
- Premium content unlocked with small Base payments
- OnchainKit integration for seamless transactions
- Low-fee transactions on Base network

### Mobile-First Design
- Responsive design optimized for mobile
- Touch-friendly interface
- Progressive Web App capabilities

## Design System

The app uses a custom design system with:
- **Colors**: Soft pinks and purples for a feminine, calming aesthetic
- **Typography**: Clear hierarchy with display, heading, body, and caption styles
- **Spacing**: Consistent spacing scale (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)
- **Components**: Reusable UI components with consistent styling

## Privacy & Security

- All forum posts are anonymous
- Cycle data is stored locally and encrypted
- No personal health information is shared
- Users have full control over their data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please visit our community forum within the app or contact our support team.

---

Built with ❤️ for the Base ecosystem
