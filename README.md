#RUSE Real-time Updates on Seattle Events

RUSE is an intelligent, AI-powered platform that discovers, curates, and matches Seattle-area youth programs and activities with appropriate age groups while reducing manual maintenance overhead.

## 🎯 Key Features

### AI-Powered Matching
- **Smart Recommendations**: AI algorithm matches programs based on age appropriateness, interests, and safety ratings
- **Tinder-like Interface**: Intuitive swipe mechanism for program discovery with gesture controls
- **Match Scoring**: Real-time percentage-based matching system
- **Interest-based Filtering**: Programs filtered by user-selected interests

### Safety First
- **Safety Verification**: All programs verified with safety shield indicators
- **Age Appropriateness**: Automatic filtering based on user's age (13-24)
- **Organization Verification**: Programs from verified Seattle organizations
- **Safety Mode**: Visual safety indicators throughout the interface

### User Experience
- **Onboarding Flow**: Interactive age and interest selection process
- **Multiple Views**: Discover, All Events, Trending, and Liked programs
- **Real-time Updates**: Live program matching and recommendations
- **Mobile-First Design**: Optimized for mobile and desktop viewing
## 🏗️ Architecture

### Core Components
- **RUSEYouthPlatform**: Main React component with state management
- **OnboardingFlow**: Interactive user setup with age and interest selection
- **ProgramCard**: Individual program display with safety information and actions
- **DiscoverView**: Tinder-like swipe interface for program discovery
- **LikedView**: Collection of user's liked programs
- **SparkView**: Trending programs showcase
- **AllEventsView**: Complete program listing with search and filters

### Data Sources
- **Seattle Youth Employment Program**: City of Seattle official programs
- **Seattle Fire Department**: Fire Cadet Program
- **Reach Out Seattle**: Mental Health First Aid programs
- **Seattle Public Library**: Teen Leadership programs
- **Seattle Parks and Recreation**: Lifeguard training and aquatics
- **Seattle Department of Transportation**: Youth Transportation Ambassadors
## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone <repository-url>
   cd RUSE
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### First Time Setup
1. **Age Selection**: Use the slider to select your age (13-24)
2. **Interest Selection**: Choose from 12 different interest categories
3. **Start Discovering**: Begin swiping through personalized program recommendations
4. **Explore Views**: Use the bottom navigation to access different program views
## 🔧 Technical Stack

- **Frontend**: React 18 with Create React App
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React (32+ icons)
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Build Tool**: Webpack via react-scripts
- **Package Manager**: npm
## 🛡️ Safety Features

### Automated Safety Checks
- **Age Appropriateness**: Automatic filtering based on program age ranges
- **Organization Verification**: All programs from verified Seattle organizations
- **Safety Indicators**: Visual shield icons for verified programs
- **Content Safety**: Curated program descriptions and information

### User Safety
- **Age-based Access**: Programs filtered by user's selected age
- **Safety Mode**: Visual safety indicators throughout the interface
- **Verified Programs**: All programs come from official Seattle sources
- **Contact Information**: Direct access to program contact details
## 📊 Current Features

### Program Data
- **6 Real Seattle Programs**: Curated from official Seattle sources
- **Multiple Categories**: Career, Mental Health, Community Service, Civic Engagement
- **Age Ranges**: 13-24 years with specific program targeting
- **Contact Information**: Direct phone, email, and website access

### User Interface
- **4 Main Views**: Discover, All Events, Trending, Liked
- **Interactive Onboarding**: Age slider and interest selection
- **Swipe Interface**: Tinder-like program discovery
- **Match Scoring**: Real-time percentage-based matching
- **Responsive Design**: Mobile-first with desktop optimization
## 🎨 Design System

### Colors
- **Primary**: Purple to blue gradient (#purple-500 to #blue-500)
- **Secondary**: Green accent (#green-500)
- **Accent**: Orange for trending (#orange-500)
- **Background**: Purple to indigo gradient (#purple-100 to #indigo-100)

### Typography
- **Font**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI')
- **Weights**: 300, 400, 500, 600, 700
- **Sizes**: Responsive text sizing with Tailwind classes

### Components
- **Cards**: Rounded corners (rounded-3xl) with shadow-2xl
- **Buttons**: Gradient backgrounds with hover states and scale transforms
- **Forms**: Clean inputs with validation states
- **Icons**: Lucide React icons with consistent sizing
## 🔮 Future Enhancements

### Phase 1 (Immediate)
- [ ] Add more Seattle programs and organizations
- [ ] Implement user authentication and profiles
- [ ] Add program search and filtering
- [ ] Create program detail pages

### Phase 2 (Short-term)
- [ ] Add parental controls for users under 18
- [ ] Implement program application tracking
- [ ] Add user reviews and ratings
- [ ] Create notification system

### Phase 3 (Long-term)
- [ ] Multi-city expansion capability
- [ ] Advanced AI matching algorithms
- [ ] Social features and community building
- [ ] Mobile app development
## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@ruse-youth.org or join our Discord community.

---

**RUSE** - Connecting Seattle's youth with amazing opportunities, safely and intelligently. 🚀
