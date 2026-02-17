# Translify - AI-Powered Bangla-English Translator

![Translify Banner](https://placehold.co/1200x400/2563eb/ffffff?text=Translify+AI+Translator)

**Translify** is a modern, high-performance translation application built with Next.js 16, designed to provide seamless and accurate translations between Bangla and English. Leveraging the power of advanced AI models via OpenRouter and Gemini, Translify understands context, nuances, and even "Banglish" (phonetic Bangla) to deliver superior translation results compared to traditional tools.

## 🚀 Features

- **Bi-Directional Translation**: Instantly translate English to Bangla and Bangla to English.
- **Banglish Support**: Understands phonetic typing (e.g., "Ami bhalo achi" -> "I am fine").
- **Multi-Model Intelligence**: Switch between top-tier AI models like **DeepSeek R1**, **Qwen 2.5**, **GPT OSS**, and **Gemini** to find the best translation.
- **Clean & Modern UI**: Built with **Tailwind CSS 4** for a sleek, responsive, and dark-mode ready interface.
- **Smart Validation**: Input character limits and validation to ensure optimal performance.
- **Copy to Clipboard**: One-click copy functionality for translated text.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI Integration**:
  - [OpenRouter](https://openrouter.ai/) API
  - [Google Gemini](https://ai.google.dev/) API
- **Icons**: Heroicons / SVG

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ installed
- npm, pnpm, or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/soyeba3/next-translate.git
   cd next-translate
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your API keys:

   ```env
   # Required for OpenRouter models (DeepSeek, Qwen, etc.)
   OPENROUTER_API_KEY=your_openrouter_api_key_here

   # Required for Gemini models
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 🤖 Supported Models

Translify currently supports the following AI models for translation:

- **DeepSeek R1**: Excellent for reasoning and nuance.
- **Qwen 2.5 72B**: High-performance open model.
- **GPT OSS 20B**: Balanced and fast.
- **GLM 4.5 Air**: Efficient lightweight model.
- **Gemini 2.0 Flash / 1.5 Flash**: Google's latest reliable models.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
