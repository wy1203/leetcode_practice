# 🧠 LeetCode Patterns

A comprehensive local web application that helps you track and organize your LeetCode problem-solving progress. This application is inspired by Sean Prashad's LeetCode Patterns website but includes enhanced tracking features and additional problem sets.

## ✨ Features

### 📊 **Problem Organization**
- **203 curated problems** organized by algorithmic patterns
- **Pattern-based filtering** (Arrays, Two Pointers, Bit Manipulation, etc.)
- **Difficulty levels** (Easy, Medium, Hard)
- **Company frequency data** showing which companies ask each problem

### 📈 **Progress Tracking**
- **Completion tracking** with persistent local storage
- **Date completed** automatic recording
- **Solution source tracking**: 
  - ✅ **Own** - Solved entirely on your own
  - 💡 **Help** - Used solutions or got help
- **Visual progress bar** with completion percentage

### 🔍 **Advanced Filtering & Sorting**
- **Multiple filters**: Pattern, Difficulty, Company, Completion Status, Solution Source
- **Date sorting**: Sort by completion date (newest/oldest first)
- **Combined filtering** for precise problem selection
- **Real-time results count**

### 🎨 **Modern UI**
- **Dark/Light mode** toggle
- **Responsive design** for all screen sizes
- **Interactive elements** with hover effects
- **Color-coded indicators** for different problem states

### 📚 **Problem Sets**
- **175 original problems** from Sean Prashad's collection
- **16 custom bitwise problems** for bit manipulation practice
- **12 custom two-pointer problems** for advanced technique training
- All custom problems tagged with "Custom" for easy identification

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Installation & Setup

1. **Navigate to the project directory**
   ```bash
   cd leetcode-patterns
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - The application will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, navigate to `http://localhost:3000` in your browser

### Build for Production

To create a production build:
```bash
npm run build
```

The build files will be created in the `build/` directory.

## 📖 How to Use

### 1. **Track Your Progress**
- ✅ **Check problems** as you complete them
- 🔄 **Toggle solution source** by clicking the solution badge
- 📅 **View completion dates** in the table
- 📊 **Monitor progress** with the visual progress bar

### 2. **Filter Problems**
- **Pattern**: Focus on specific algorithmic patterns
- **Difficulty**: Filter by Easy, Medium, or Hard problems
- **Company**: See problems asked by specific companies
- **Solution Source**: View only your own solutions or helped solutions
- **Completed**: Show only completed or all problems

### 3. **Sort Problems**
- **Newest First**: See your most recent completions
- **Oldest First**: Track your learning journey chronologically
- **No Sorting**: Default order by problem ID

### 4. **Manage Data**
- **Clear All**: Reset all filters and sorting
- **Clear All Completed**: Remove all completion data (with confirmation)
- **Data Persistence**: Your progress is automatically saved locally

## 🛠️ Technical Details

### Built With
- **React 19** - Modern React with hooks
- **Create React App** - Development and build tooling
- **Local Storage** - Client-side data persistence
- **CSS3** - Modern styling with animations

### Data Structure
```javascript
{
  "problemId": {
    "dateCompleted": "2025-01-15",
    "solutionSource": "own" | "help"
  }
}
```

### Browser Compatibility
- **Chrome** (recommended)
- **Firefox**
- **Safari**
- **Edge**

## 📁 Project Structure

```
leetcode-patterns/
├── public/                 # Static files
├── src/
│   ├── data/
│   │   └── questions.json  # Problem database
│   ├── App.js             # Main application component
│   ├── App.css            # Application styles
│   └── index.js           # Entry point
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🎯 Features in Detail

### **Problem Categories**
- **Arrays** - Array manipulation and traversal
- **Two Pointers** - Efficient array/string processing
- **Bit Manipulation** - Bitwise operations and optimization
- **Dynamic Programming** - Optimization problems
- **Backtracking** - Recursive exploration
- **Graph** - Graph traversal and algorithms
- **And many more...**

### **Company Insights**
Track problems by companies including:
- **FAANG** (Meta, Amazon, Apple, Netflix, Google)
- **Microsoft, Bloomberg, Goldman Sachs**
- **Startup companies** and **consulting firms**

### **Progress Analytics**
- **Completion percentage** with visual progress bar
- **Solution source analysis** (own vs. helped solutions)
- **Date-based tracking** for learning pattern analysis
- **Pattern-specific progress** tracking

## 🔧 Available Scripts

- `npm start` - Runs the development server
- `npm run build` - Creates production build
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📝 Data Management

### **Local Storage**
- All progress data is stored locally in your browser
- Data persists between sessions
- No external servers or accounts required

### **Data Migration**
- Automatic migration from older data formats
- Backward compatibility maintained
- Safe data handling with error recovery

## 🤝 Contributing

This is a personal project, but contributions are welcome! Feel free to:
- Report bugs or issues
- Suggest new features
- Submit pull requests
- Share improvement ideas

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Sean Prashad** for the original LeetCode Patterns concept
- **LeetCode** for providing the platform and problems
- **React team** for the excellent framework
- **Open source community** for inspiration and tools

## 📞 Support

If you encounter any issues:
1. Check that Node.js and npm are properly installed
2. Ensure you're running the latest version
3. Clear browser cache and localStorage if needed
4. Restart the development server

---

**Happy Coding! 🎉**

Track your progress, identify patterns, and master technical interviews with this comprehensive LeetCode companion tool.
