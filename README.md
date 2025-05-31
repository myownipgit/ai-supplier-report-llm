# AI Supplier Report - LLM Powered Platform

## 🚀 Next-Generation Procurement Analytics with Natural Language Processing

This project represents the evolution from regex pattern matching to **Large Language Model (LLM) powered** procurement analytics, providing a more scalable and intelligent approach to supplier risk management, spend analytics, and consolidation opportunities.

## 🔄 Evolution from POC

### Previous Approach (POC)
The initial POC used **4 regex text matching patterns** for procurement manager functionality:
- Direct role requests (`.*Procurement Manager.*consolidation.*`)
- General consolidation default (`.*consolidation.*opportunit.*`)
- Supplier risk focus (`.*supplier.*risk.*`)
- Spend analytics (`.*spend.*analytics.*`)

### Current LLM Approach
This new architecture leverages **Large Language Models** to understand natural language queries with:
- **Intent Recognition**: Understands context and meaning beyond keyword matching
- **Entity Extraction**: Identifies suppliers, categories, time periods automatically
- **Dynamic Responses**: Generates contextual insights and recommendations
- **Scalable Architecture**: Easily extensible to new use cases and languages

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   LLM Service   │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (OpenAI API)  │
│                 │    │                 │    │                 │
│ • Chat Interface│    │ • API Gateway   │    │ • Intent Recog  │
│ • Visualizations│    │ • Data Models   │    │ • Entity Extract│
│ • Voice UI*     │    │ • SQLite DB     │    │ • Response Gen  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Core Features

### 🗣️ **Current: Chat UX**
- Natural language query processing
- Real-time procurement insights
- Interactive data visualizations
- Context-aware responses

### 🎤 **Future: Voice UX** *(Under Development)*
Voice integration offers significant advantages:

#### **Benefits of Voice UX:**
- **Hands-free Operation**: Perfect for busy procurement managers reviewing reports while multitasking
- **Faster Queries**: Speak naturally instead of typing complex queries
- **Accessibility**: Better for users with typing difficulties or visual impairments
- **Mobile-first**: Ideal for on-the-go procurement decisions
- **Natural Interaction**: More intuitive than traditional BI dashboards

#### **Development Status:**
- 🔄 **In Progress**: Voice recognition integration
- 🔄 **Planned**: Multi-language voice support
- 🔄 **Research**: Procurement-specific voice commands
- 🔄 **Testing**: Voice response generation

## 📊 Procurement Manager Capabilities

### 1. **Intelligent Consolidation Analysis**
- Natural language: *"Show me consolidation opportunities in office supplies"*
- LLM processes intent and generates comprehensive analysis
- Identifies supplier overlap, spend patterns, and cost-saving potential

### 2. **Dynamic Supplier Risk Assessment**
- Natural language: *"What are the risks with our top 5 suppliers in APAC?"*
- Real-time risk scoring based on multiple data sources
- Contextual recommendations for risk mitigation

### 3. **Advanced Spend Analytics**
- Natural language: *"Compare Q1 vs Q2 spending in IT categories"*
- Automated insights generation
- Trend analysis and forecasting

### 4. **Intelligent Reporting**
- Natural language: *"Create an executive summary of procurement performance"*
- Dynamic report generation
- Customized for different stakeholder audiences

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key (or alternative LLM provider)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/myownipgit/ai-supplier-report-llm.git
cd ai-supplier-report-llm
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Add your LLM API keys to .env
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

4. **Initialize Database**
```bash
cd backend
npm run init-db
npm run seed-data
```

## 🔧 Configuration

### Environment Variables
```env
# LLM Configuration
OPENAI_API_KEY=your-openai-api-key
LLM_MODEL=gpt-4
LLM_TEMPERATURE=0.3

# Database
DATABASE_URL=sqlite:./data/procurement.db

# API Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## 📁 Project Structure

```
ai-supplier-report-llm/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Chat interface, visualizations
│   │   ├── services/        # API clients, LLM integration
│   │   └── utils/           # Helper functions
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # LLM service, data processing
│   │   ├── models/         # Database models
│   │   └── utils/          # Helper functions
├── data/                   # Database and sample data
├── docs/                   # Documentation
└── README.md
```

## 🤖 LLM Integration Details

### Intent Classification
The system uses LLM to classify user intents into:
- **Consolidation Analysis**: Identifying cost-saving opportunities
- **Risk Assessment**: Supplier risk evaluation
- **Spend Analytics**: Financial analysis and reporting
- **General Query**: Open-ended procurement questions

### Entity Extraction
Automatically extracts:
- **Suppliers**: Company names and IDs
- **Categories**: Procurement categories and subcategories
- **Time Periods**: Dates, quarters, years
- **Metrics**: KPIs and financial figures
- **Locations**: Geographic regions and sites

### Response Generation
Generates contextual responses including:
- **Data Insights**: Key findings and trends
- **Recommendations**: Actionable next steps
- **Visualizations**: Chart and table specifications
- **Follow-up Questions**: Suggested deeper analysis

## 🔊 Voice UX Development Roadmap

### Phase 1: Foundation *(Q3 2025)*
- [ ] Basic voice recognition integration
- [ ] Simple command processing
- [ ] Text-to-speech responses

### Phase 2: Enhancement *(Q4 2025)*
- [ ] Advanced NLP for voice commands
- [ ] Multi-language support
- [ ] Voice response customization

### Phase 3: Advanced Features *(Q1 2026)*
- [ ] Conversational voice AI
- [ ] Procurement-specific voice shortcuts
- [ ] Voice-activated report generation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions and support:
- 📧 Email: support@ai-supplier-report.com
- 📖 Documentation: [./docs/](./docs/)
- 🐛 Issues: [GitHub Issues](https://github.com/myownipgit/ai-supplier-report-llm/issues)

---

**Note**: This is the LLM-powered evolution of the procurement analytics platform. The original POC with regex patterns remains in the `ai-supplier-report-poc` repository for reference.
