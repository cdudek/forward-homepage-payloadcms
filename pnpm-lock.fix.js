// Script to ensure consistent React versions in the pnpm lock file
import fs from 'fs'

try {
  // Read the lock file
  const lockFile = fs.readFileSync('./pnpm-lock.yaml', 'utf8')

  // Check if the lock file contains any reference to react-dom@19.0.0
  if (lockFile.includes('react-dom@19.0.0')) {
    // Replace any references to react-dom@19.0.0 with react-dom@19.1.0
    const updatedLockFile = lockFile.replace(/react-dom@19\.0\.0/g, 'react-dom@19.1.0')
    fs.writeFileSync('./pnpm-lock.yaml', updatedLockFile)
    console.log('Updated react-dom version in lock file')
  } else {
    console.log('No incompatible react-dom version found in lock file')
  }

  // Create a .npmrc file to force exact versions
  fs.appendFileSync('./.npmrc', '\nexact=true\n')
  console.log('Added exact=true to .npmrc')
} catch (err) {
  console.error('Error updating lock file:', err)
  process.exit(1)
}
