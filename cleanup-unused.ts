/**
 * Cleanup script for unused variables
 * 
 * This script helps to:
 * 1. Mark unused variables with underscore prefix 
 * 2. Remove unused imports
 * 
 * To use:
 * 1. Install ts-node globally: npm install -g ts-node
 * 2. Run: npx ts-node cleanup-unused.ts
 */

import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

interface TsError {
  file: string;
  line: number;
  column: number;
  message: string;
  code: string;
  variableName?: string;
}

// Parse TypeScript errors from compiler output
function parseErrors(output: string): TsError[] {
  const errors: TsError[] = [];
  const lines = output.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match both formats: with and without parentheses
    const errorMatch = line.match(/(.+):(\d+):(\d+) - error (TS\d+): (.+)/) ||
                      line.match(/(.+)\((\d+),(\d+)\): error (TS\d+): (.+)/);
    
    if (errorMatch) {
      const [_, file, lineNum, column, code, message] = errorMatch;
      
      // Only focus on unused variable errors
      if (code === 'TS6133') {
        // Extract variable name from the message (common format for TS6133)
        const varMatch = message.match(/'([^']+)'/);
        const variableName = varMatch ? varMatch[1] : undefined;
        
        errors.push({
          file,
          line: parseInt(lineNum),
          column: parseInt(column),
          message,
          code,
          variableName
        });
      }
    }
  }
  
  return errors;
}

// Group errors by file
function groupErrorsByFile(errors: TsError[]): Record<string, TsError[]> {
  const grouped: Record<string, TsError[]> = {};
  
  for (const error of errors) {
    if (!grouped[error.file]) {
      grouped[error.file] = [];
    }
    grouped[error.file].push(error);
  }
  
  return grouped;
}

// Fix the file by modifying unused variables
function fixFile(filePath: string, errors: TsError[]): void {
  console.log(`\nFixing ${filePath}`);
  
  // Read the file content
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Sort errors by line number in descending order to avoid offset issues
  errors.sort((a, b) => b.line - a.line);
  
  for (const error of errors) {
    // Only handle unused variable errors
    if (error.code !== 'TS6133' || !error.variableName) {
      continue;
    }
    
    const lineIndex = error.line - 1;
    const line = lines[lineIndex];
    
    if (line.includes('import ')) {
      // For import statements, we need special handling
      console.log(`  - Import: ${error.variableName}`);
      
      // For imports, we have different strategies:
      if (line.includes(`{ ${error.variableName}`)) {
        // Remove from destructured import
        lines[lineIndex] = line.replace(
          new RegExp(`\\b${error.variableName}\\b,?\\s*`), 
          ''
        ).replace(/,\s*}/g, ' }').replace(/{\s*}/g, '{}');
      } else if (line.includes(`${error.variableName},`)) {
        // Multi-import with commas
        lines[lineIndex] = line.replace(
          new RegExp(`\\b${error.variableName}\\b,\\s*`), 
          ''
        );
      } else {
        // Just comment out for now - these need manual inspection
        console.log(`    ⚠️ Cannot safely remove, please check manually`);
      }
    } else {
      // For variable declarations, prefix with underscore
      console.log(`  - Variable: ${error.variableName}`);
      
      // Check if it's a function parameter or variable declaration
      if (line.includes(`(${error.variableName}`) || line.includes(`, ${error.variableName}`)) {
        // Function parameter
        lines[lineIndex] = line.replace(
          new RegExp(`\\b${error.variableName}\\b`), 
          `_${error.variableName}`
        );
      } else if (line.includes(`${error.variableName}:`)) {
        // Destructured property
        lines[lineIndex] = line.replace(
          new RegExp(`\\b${error.variableName}\\b:`), 
          `_${error.variableName}:`
        );
      } else if (line.includes(`const ${error.variableName}`) || line.includes(`let ${error.variableName}`)) {
        // Variable declaration
        lines[lineIndex] = line.replace(
          new RegExp(`\\b${error.variableName}\\b`), 
          `_${error.variableName}`
        );
      } else {
        // Just comment out for now - these need manual inspection
        console.log(`    ⚠️ Cannot safely modify, please check manually: ${line}`);
      }
    }
  }
  
  // Write back the modified content
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`✅ Fixed ${errors.length} issues in ${filePath}`);
}

// Main function
async function main() {
  console.log('Reading TypeScript errors from errors.txt...');
  
  try {
    const errorOutput = fs.readFileSync('errors.txt', 'utf8');
    const errors = parseErrors(errorOutput);
    
    if (errors.length === 0) {
      console.log('No unused variable errors found!');
      return;
    }
    
    console.log(`Found ${errors.length} unused variable errors.`);
    
    const groupedErrors = groupErrorsByFile(errors);
    const files = Object.keys(groupedErrors);
    
    // Create readline interface for user interaction
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    console.log('\nFiles with unused variables:');
    files.forEach((file, index) => {
      console.log(`${index + 1}. ${file} (${groupedErrors[file].length} issues)`);
    });
    
    rl.question('\nFix all files? (y/n/specific number): ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        // Fix all files
        files.forEach(file => {
          fixFile(file, groupedErrors[file]);
        });
      } else if (!isNaN(parseInt(answer))) {
        // Fix specific file
        const fileIndex = parseInt(answer) - 1;
        if (files[fileIndex]) {
          fixFile(files[fileIndex], groupedErrors[files[fileIndex]]);
        } else {
          console.log('Invalid file number.');
        }
      } else {
        console.log('No files fixed. Exiting.');
      }
      
      rl.close();
    });
  } catch (error) {
    console.error('Error reading errors.txt:', error);
  }
}

main().catch(console.error); 