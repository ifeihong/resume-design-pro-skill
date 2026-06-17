/**
 * Resume Design Pro - Resume Data Persistence
 * Save resume data to local JSON file for future reuse
 */

const fs = require('fs');
const path = require('path');

/**
 * Save resume data to JSON file
 * @param {Object} resumeData - The resume data object
 * @param {string} outputDir - Directory to save the file (default: current directory)
 * @returns {string} Path to the saved JSON file
 */
function saveResumeData(resumeData, outputDir = '.') {
  // Generate filename based on name and timestamp
  const name = resumeData.name || 'resume';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `${name}-resume-data-${timestamp}.json`;
  const outputPath = path.resolve(outputDir, filename);

  // Add metadata
  const dataWithMeta = {
    ...resumeData,
    _meta: {
      version: '1.0',
      generatedAt: new Date().toISOString(),
      tool: 'Resume Design Pro',
      schema: 'resume-v1'
    }
  };

  // Save to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(dataWithMeta, null, 2), 'utf-8');
  
  console.log(`✅ Resume data saved: ${outputPath}`);
  return outputPath;
}

/**
 * Load resume data from JSON file
 * @param {string} filePath - Path to the JSON file
 * @returns {Object} The resume data object
 */
function loadResumeData(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  // Remove metadata before returning
  const { _meta, ...resumeData } = data;
  
  console.log(`✅ Resume data loaded: ${filePath}`);
  console.log(`   Version: ${_meta.version}, Generated: ${_meta.generatedAt}`);
  
  return resumeData;
}

/**
 * Find the most recent resume data file for a given name
 * @param {string} name - The person's name
 * @param {string} searchDir - Directory to search (default: current directory)
 * @returns {string|null} Path to the most recent file, or null if not found
 */
function findLatestResumeData(name, searchDir = '.') {
  const files = fs.readdirSync(searchDir)
    .filter(f => f.startsWith(`${name}-resume-data-`) && f.endsWith('.json'))
    .map(f => ({
      name: f,
      path: path.resolve(searchDir, f),
      mtime: fs.statSync(path.resolve(searchDir, f)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime);

  return files.length > 0 ? files[0].path : null;
}

// Export functions
module.exports = {
  saveResumeData,
  loadResumeData,
  findLatestResumeData
};

// Example usage
if (require.main === module) {
  // Example: Save resume data
  const exampleData = {
    name: '李明',
    phone: '138-0000-1234',
    email: 'liming@example.com',
    city: '上海',
    targetRole: '全栈工程师',
    summary: '5年全栈开发经验...',
    experience: [
      {
        company: 'ABC科技',
        title: '高级全栈工程师',
        period: '2022.03 - 2025.05',
        city: '上海',
        highlights: ['主导核心产品架构', '用户增长200%']
      }
    ],
    education: {
      school: '上海交通大学',
      major: '计算机科学与技术',
      degree: '本科',
      period: '2017.09 - 2021.06'
    },
    skills: ['React', 'Vue.js', 'Node.js', 'Python'],
    languages: ['中文（母语）', '英语（流利）']
  };

  const savedPath = saveResumeData(exampleData, 'd:/trae');
  console.log(`Saved to: ${savedPath}`);

  // Example: Load resume data
  const loadedData = loadResumeData(savedPath);
  console.log(`Loaded name: ${loadedData.name}`);

  // Example: Find latest resume data
  const latestPath = findLatestResumeData('李明', 'd:/trae');
  console.log(`Latest file: ${latestPath}`);
}
