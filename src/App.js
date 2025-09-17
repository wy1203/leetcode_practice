import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import questionsData from './data/questions.json';

function App() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState({
    pattern: '',
    difficulty: '',
    company: '',
    completed: false,
    solutionSource: ''
  });
  const [sortBy, setSortBy] = useState('none');
  const [darkMode, setDarkMode] = useState(false);
  const [completedProblems, setCompletedProblems] = useState({});
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  useEffect(() => {
    setQuestions(questionsData.data);
    
    // Load completed problems from localStorage
    try {
      const savedCompleted = localStorage.getItem('completedProblems');
      if (savedCompleted) {
        const parsedCompleted = JSON.parse(savedCompleted);
        // Handle both old Set format and new object format
        if (Array.isArray(parsedCompleted)) {
          // Convert old format to new format
          const newFormat = {};
          parsedCompleted.forEach(id => {
            newFormat[id] = {
              dateCompleted: new Date().toISOString().split('T')[0],
              solutionSource: 'help' // default to help for old data
            };
          });
          setCompletedProblems(newFormat);
          console.log('Migrated', parsedCompleted.length, 'old format items');
        } else {
          setCompletedProblems(parsedCompleted);
          console.log('Loaded completed problems:', Object.keys(parsedCompleted).length, 'items');
        }
      }
    } catch (error) {
      console.error('Error loading completed problems:', error);
      localStorage.removeItem('completedProblems');
    }
    
    // Load theme preference from localStorage
    try {
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme) {
        setDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
      localStorage.removeItem('darkMode');
    }
    
    // Mark that we've loaded from storage
    setHasLoadedFromStorage(true);
  }, []);

  useEffect(() => {
    // Only save to localStorage after we've loaded from storage initially
    if (hasLoadedFromStorage) {
      try {
        localStorage.setItem('completedProblems', JSON.stringify(completedProblems));
        console.log('Saved', Object.keys(completedProblems).length, 'completed problems to localStorage');
      } catch (error) {
        console.error('Error saving completed problems:', error);
      }
    }
  }, [completedProblems, hasLoadedFromStorage]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const patterns = useMemo(() => {
    const patternSet = new Set();
    questions.forEach(q => q.pattern.forEach(p => patternSet.add(p)));
    return Array.from(patternSet).sort();
  }, [questions]);

  const companies = useMemo(() => {
    const companySet = new Set();
    questions.forEach(q => q.companies.forEach(c => companySet.add(c.name)));
    return Array.from(companySet).sort();
  }, [questions]);

  const filteredAndSortedQuestions = useMemo(() => {
    let filtered = questions.filter(q => {
      if (filter.pattern && !q.pattern.includes(filter.pattern)) return false;
      if (filter.difficulty && q.difficulty !== filter.difficulty) return false;
      if (filter.company && !q.companies.some(c => c.name === filter.company)) return false;
      if (filter.completed && !completedProblems[q.id]) return false;
      if (filter.solutionSource) {
        if (!completedProblems[q.id]) return false;
        if (completedProblems[q.id].solutionSource !== filter.solutionSource) return false;
      }
      return true;
    });

    // Apply sorting
    if (sortBy === 'dateAsc') {
      filtered = filtered.sort((a, b) => {
        const dateA = completedProblems[a.id]?.dateCompleted || '';
        const dateB = completedProblems[b.id]?.dateCompleted || '';
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateA.localeCompare(dateB);
      });
    } else if (sortBy === 'dateDesc') {
      filtered = filtered.sort((a, b) => {
        const dateA = completedProblems[a.id]?.dateCompleted || '';
        const dateB = completedProblems[b.id]?.dateCompleted || '';
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateB.localeCompare(dateA);
      });
    }

    return filtered;
  }, [questions, filter, completedProblems, sortBy]);

  const toggleCompleted = (id) => {
    const newCompleted = { ...completedProblems };
    if (newCompleted[id]) {
      delete newCompleted[id];
    } else {
      // Default to "help" when first checking a problem
      newCompleted[id] = {
        dateCompleted: new Date().toISOString().split('T')[0],
        solutionSource: 'help'
      };
    }
    setCompletedProblems(newCompleted);
  };

  const toggleSolutionSource = (id) => {
    if (completedProblems[id]) {
      const newCompleted = { ...completedProblems };
      newCompleted[id] = {
        ...newCompleted[id],
        solutionSource: newCompleted[id].solutionSource === 'own' ? 'help' : 'own'
      };
      setCompletedProblems(newCompleted);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilter({
      pattern: '',
      difficulty: '',
      company: '',
      completed: false,
      solutionSource: ''
    });
    setSortBy('none');
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all completed problems? This cannot be undone.')) {
      setCompletedProblems({});
      localStorage.removeItem('completedProblems');
      console.log('Cleared all completed problems');
    }
  };


  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="header-content">
          <h1>LeetCode Patterns</h1>
          <div className="header-controls">
            <button 
              className="theme-toggle" 
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="content">
          {Object.keys(completedProblems).length > 0 && (
            <section className="intro">
              <div className="progress-info">
                <div className="progress-text">
                  <strong>Progress:</strong> {Object.keys(completedProblems).length} of {questions.length} completed 
                  ({Math.round((Object.keys(completedProblems).length / questions.length) * 100)}%)
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(Object.keys(completedProblems).length / questions.length) * 100}%` }}
                  ></div>
                </div>
                <button onClick={clearAllData} className="clear-data-btn">
                  Clear All Completed
                </button>
              </div>
            </section>
          )}


          <section className="filters">
            <h2>🔍 Filters & Sort</h2>
            <div className="filter-controls">
              <select 
                value={filter.pattern} 
                onChange={(e) => handleFilterChange('pattern', e.target.value)}
              >
                <option value="">All Patterns</option>
                {patterns.map(pattern => (
                  <option key={pattern} value={pattern}>{pattern}</option>
                ))}
              </select>

              <select 
                value={filter.difficulty} 
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              >
                <option value="">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <select 
                value={filter.company} 
                onChange={(e) => handleFilterChange('company', e.target.value)}
              >
                <option value="">All Companies</option>
                {companies.slice(0, 50).map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>

              <select 
                value={filter.solutionSource} 
                onChange={(e) => handleFilterChange('solutionSource', e.target.value)}
              >
                <option value="">All Solution Sources</option>
                <option value="own">✅ Own Solutions</option>
                <option value="help">💡 Used Help</option>
              </select>

              <label className="checkbox-filter">
                <input 
                  type="checkbox" 
                  checked={filter.completed}
                  onChange={(e) => handleFilterChange('completed', e.target.checked)}
                />
                Show only completed
              </label>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="none">No Sorting</option>
                <option value="dateDesc">📅 Newest First</option>
                <option value="dateAsc">📅 Oldest First</option>
              </select>

              <button onClick={clearFilters} className="clear-btn">
                Clear All
              </button>
            </div>
            
            <div className="results-count">
              Showing {filteredAndSortedQuestions.length} of {questions.length} problems
            </div>
          </section>

          <section className="questions-table">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>✅</th>
                    <th>Problem</th>
                    <th>Pattern</th>
                    <th>Difficulty</th>
                    <th>Companies</th>
                    <th>Date Completed</th>
                    <th>Solution Source</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedQuestions.map(question => (
                    <tr key={question.id} className={completedProblems[question.id] ? 'completed' : ''}>
                      <td>
                        <input
                          type="checkbox"
                          checked={!!completedProblems[question.id]}
                          onChange={() => toggleCompleted(question.id)}
                        />
                      </td>
                      <td>
                        <a 
                          href={`https://leetcode.com/problems/${question.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="problem-link"
                        >
                          {question.title}
                        </a>
                        {question.premium && <span className="premium">💎</span>}
                      </td>
                      <td>
                        <div className="patterns">
                          {question.pattern.map(p => (
                            <span key={p} className="pattern-tag">{p}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
                          {question.difficulty}
                        </span>
                      </td>
                      <td>
                        <div className="companies">
                          {question.companies.slice(0, 3).map(company => (
                            <span key={company.slug} className="company-tag">
                              {company.name} ({company.frequency})
                            </span>
                          ))}
                          {question.companies.length > 3 && (
                            <span className="more-companies">
                              +{question.companies.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        {completedProblems[question.id] ? (
                          <span className="date-completed">
                            {completedProblems[question.id].dateCompleted}
                          </span>
                        ) : (
                          <span className="not-completed">-</span>
                        )}
                      </td>
                      <td>
                        {completedProblems[question.id] ? (
                          <button 
                            className={`solution-source-btn ${completedProblems[question.id].solutionSource}`}
                            onClick={() => toggleSolutionSource(question.id)}
                            title="Click to toggle between Own solution and Used help"
                          >
                            {completedProblems[question.id].solutionSource === 'own' ? '✅ Own' : '💡 Help'}
                          </button>
                        ) : (
                          <span className="not-completed">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="footer">
            <p>
              📚 Inspired by <a href="https://github.com/seanprashad/leetcode-patterns" target="_blank" rel="noopener noreferrer">
                Sean Prashad's LeetCode Patterns
              </a>
            </p>
            <p>Last updated: {new Date(questionsData.updated).toLocaleDateString()}</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
