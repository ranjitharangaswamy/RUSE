# RUSE Real-time Updates on Seattle Events

RUSE is an intelligent, AI-powered platform that discovers, curates, and matches Seattle-area youth programs and activities with appropriate age groups while reducing manual maintenance overhead.

## 🎯 Key Features

### AI-Powered Matching
- **Smart Recommendations**: AI algorithm matches programs based on age appropriateness, interests, location, schedule, and safety ratings
- **Tinder-like Interface**: Intuitive swipe mechanism for program discovery
- **Real-time Filtering**: Advanced filters for categories, cost, distance, and safety

### Safety First
- **Comprehensive Safety Checks**: Automated validation of age appropriateness, verified organizations, and content safety
- **Parental Controls**: Full parental oversight for users under 18 with approval workflows
- **Safety Ratings**: 5-star safety rating system with detailed safety reports

### Age-Appropriate Design
- **0-5 years**: Parents/Guardians with full parental control
- **6-12 years**: Supervised selection with educational focus
- **13-17 years**: Independence with safety guardrails and parental oversight
- **18-24 years**: Self-directed with full feature access

## 🏗️ Architecture

### Core Components
- **SwipeInterface**: Main program discovery interface with gesture controls
- **ProgramCard**: Individual program display with safety information
- **SafetyGuard**: Real-time safety validation and warnings
- **ParentalControls**: Parent/guardian approval system
- **MatchingEngine**: AI-powered recommendation algorithm

### Data Sources
- Seattle.gov official youth programs
- Partner organizations (community centers, libraries, non-profits)
- Social media channels (Instagram, Facebook, Twitter)
- Existing Seattle Youth Programs database

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RUSE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### First Time Setup

1. **Create Account**: Enter your age, name, email, and interests
2. **Parental Information** (if under 18): Provide parent/guardian contact details
3. **Safety Settings**: Configure parental approval requirements
4. **Start Swiping**: Discover programs that match your profile

## 🔧 Technical Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Data Validation**: Zod schemas

## 🛡️ Safety Features

### Automated Safety Checks
- Age appropriateness validation
- Organization verification
- Background check requirements
- Safe location verification
- Appropriate supervision levels
- Content moderation

### Parental Controls
- Program approval workflows
- Real-time notifications
- Emergency contact integration
- Safety setting management
- Activity monitoring

## 📊 Success Metrics

- **Data Freshness**: 90% of events updated within 24 hours
- **Match Accuracy**: 75%+ user satisfaction with recommendations
- **Safety Compliance**: Zero inappropriate content reaching users
- **Engagement**: 60%+ weekly active user retention

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 to #22c55e)
- **Secondary**: Green accent (#22c55e)
- **Accent**: Red for warnings (#ef4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover states
- **Forms**: Clean inputs with validation states
- **Modals**: Overlay dialogs with smooth animations

## 🔮 Future Enhancements

### Phase 1 (Months 1-3)
- [ ] Deploy basic scraping agents for Seattle.gov
- [ ] Build core matching algorithm
- [ ] Implement safety filtering system

### Phase 2 (Months 4-6)
- [ ] Expand to social media sources
- [ ] Add parental control features
- [ ] Implement advanced AI matching

### Phase 3 (Months 7-12)
- [ ] Multi-city expansion capability
- [ ] Advanced analytics and insights
- [ ] Community feedback integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@ruse-youth.org or join our Discord community.

---

**RUSE** - Connecting Seattle's youth with amazing opportunities, safely and intelligently. 🚀
