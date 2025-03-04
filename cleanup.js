import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read a file and remove unused imports
const fixUnusedImports = (filePath) => {
  console.log(`Fixing unused imports in ${filePath}`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Regular expressions for unused imports
    const importRegex = /import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/g;
    const standaloneImportRegex = /import\s+([^{}\s]+)\s+from\s+['"]([^'"]+)['"]/g;
    
    // Process each import statement
    let newContent = content;
    
    // Process named imports like: import { X, Y, Z } from 'package'
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const importNames = match[1].split(',').map(name => name.trim());
      
      // Check each import name if it's used in the file
      const usedImports = importNames.filter(name => {
        const baseName = name.includes(' as ') ? name.split(' as ')[1].trim() : name;
        const regex = new RegExp(`\\b${baseName}\\b`, 'g');
        
        // Count occurrences, subtract the import statement itself
        const count = (content.match(regex) || []).length;
        return count > 1; // More than 1 means it's used elsewhere
      });
      
      if (usedImports.length === 0) {
        // Remove the entire import
        newContent = newContent.replace(match[0], '');
      } else if (usedImports.length < importNames.length) {
        // Replace with only used imports
        const replacementImport = `import { ${usedImports.join(', ')} } from '${match[2]}'`;
        newContent = newContent.replace(match[0], replacementImport);
      }
    }
    
    // Process standalone imports like: import React from 'react'
    importRegex.lastIndex = 0;
    while ((match = standaloneImportRegex.exec(content)) !== null) {
      const importName = match[1].trim();
      const regex = new RegExp(`\\b${importName}\\b`, 'g');
      
      // Count occurrences, subtract the import statement itself
      const count = (content.match(regex) || []).length;
      
      if (count <= 1) {
        // Remove the entire import
        newContent = newContent.replace(match[0], '');
      }
    }
    
    // Remove unused variables
    // Note: This is a simple approach and might not catch all cases
    const variableRegex = /const\s+([a-zA-Z0-9_]+)\s+=.*?;/g;
    while ((match = variableRegex.exec(content)) !== null) {
      const varName = match[1].trim();
      const regex = new RegExp(`\\b${varName}\\b`, 'g');
      
      // Count occurrences, subtract the declaration itself
      const count = (content.match(regex) || []).length;
      
      if (count <= 1) {
        // Variable is only used in its declaration
        newContent = newContent.replace(match[0], '');
      }
    }
    
    // Write changes back
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent);
      console.log(`Fixed unused elements in ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
};

// Function to walk a directory and process TypeScript files
const processDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  
  let fixedFiles = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixedFiles += processDirectory(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      if (fixUnusedImports(filePath)) {
        fixedFiles++;
      }
    }
  }
  
  return fixedFiles;
};

// Main execution
try {
  console.log("Starting cleanup of unused TypeScript imports and variables...");
  
  // Start from the source directory
  const srcDir = path.join(__dirname, 'src');
  const fixedCount = processDirectory(srcDir);
  
  console.log(`Finished cleanup. Fixed ${fixedCount} files.`);
  
  // Run TypeScript compiler to check if errors remain
  console.log("Running TypeScript compiler to check remaining errors...");
  try {
    execSync('yarn tsc --noEmit', { stdio: 'inherit' });
    console.log("TypeScript compilation successful!");
  } catch (error) {
    console.log("Some TypeScript errors remain. Please check the output.");
  }
  
} catch (error) {
  console.error("Error during cleanup:", error);
} 