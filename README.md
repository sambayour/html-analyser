# 🌐 HTML Analyzer

## 📝 Project Overview

The HTML Analyzer is a powerful web application designed to help developers and content creators identify and address issues in HTML documents. With an intuitive interface and comprehensive analysis, this tool provides instant insights into potential barriers.

## ✨ Features

- **File Upload**: file selection
- **Instant Analysis**: Real-time scoring
- **Detailed Reporting**:
  - Identifies missing alt text
  - Checks heading hierarchy
  - Detects non-semantic HTML structures
- **Scoring System**: Provides a comprehensive score
- **User-Friendly Interface**: Clean and intuitive design

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v8+)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/sambayour/html-analyser.git
   cd html-analyser
   ```

2. Install Backend Dependencies

   ```bash
   cd BE
   npm install
   ```

3. Install Frontend Dependencies
   ```bash
   cd ../FE
   npm install
   ```

### Configuration

#### Backend Configuration

Create a `.env` file in the `BE` directory:

```
PORT=3200
```

#### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```
VITE_API_URL=http://localhost:3200
```

## 🖥️ Running the Application

### Development Mode

1. Start Backend Server

   ```bash
   cd BE
   npm run dev
   ```

2. Start Frontend Development Server
   ```bash
   cd frontend
   npm run dev
   ```

### Production Build

1. Build Backend

   ```bash
   cd BE
   npm run build
   ```

2. Build Frontend
   ```bash
   cd FE
   npm run build
   ```

## File Descriptions

### 1. `accessible.html`

- **Characteristics**:
  - Proper semantic structure
  - Meaningful alt text
  - Correct heading hierarchy
  - Accessible navigation

### 2. `inaccessible.html`

- **Characteristics**:
  - No semantic HTML
  - Missing alt text
  - Non-descriptive elements
  - Improper document structure

### 3. `mixed-accessibility.html`

- **Characteristics**:
  - Mixed accessibility features
  - Skipped heading levels
  - Some images with alt, some without
  - Combination of semantic and non-semantic elements

## How to Use

1. Upload these files to the Accessibility Analyzer
2. Compare the generated accessibility scores
3. Review detailed issue reports

## Testing Scenarios

- Validate different levels of accessibility
- Test score calculation logic
- Check issue detection capabilities

## 📊 Scoring

The analyzer uses a comprehensive scoring mechanism:

- **90-100**: 🟢 Excellent Accessibility
- **70-89**: 🟡 Needs Improvement
- **0-69**: 🔴 Significant Accessibility Barriers

### Scoring Criteria

1. **Missing Alt Text**

   - Checks for descriptive alternative text on images
   - High-impact issue

2. **Heading Hierarchy**

   - Validates proper heading structure
   - Ensures logical document outline

3. **Semantic HTML**
   - Identifies non-semantic element usage
   - Encourages meaningful HTML structure

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Project Structure

```
accessibility-analyzer/
│
├── BE/
│   ├── src/
│   │   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── FE/
│   ├── src/
│   │   ├── App.vue
│   │   └── components/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## 🛠️ Technologies Used

- **Backend**:
  - Node.js
  - Express
  - TypeScript
- **Frontend**:
  - Vue.js
  - Vite
  - Tailwind CSS
- **Testing**:
  - Jest
  - Vue Test Utils

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Name - [samuelolubayo@gmail.com](mailto:samuelolubayo@gmail.com)

Project Link: [https://github.com/sambayour/html-analyser](https://github.com/sambayour/html-analyser)

---

**Disclaimer**: This tool provides guidance and should not be considered a complete accessibility audit. Always conduct comprehensive accessibility testing.
